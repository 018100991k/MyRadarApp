import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseErrorService } from '../../Services/firebase-error.service';
import { ErrorMessageService } from '@Services/error-message.service';
import { FireDatabase } from '../../Services/fire-database.service';
import { LocalStorageService } from '@Services/local-storage.service';
import { Ocupaciones } from 'src/app/Utils/Ocupaciones';
import { Nacionalidades } from 'src/app/Utils/Nacionalidades';
import { DatosFormularioService } from '@Services/datos-formulario.service';
import { Roles } from 'src/app/Utils/Roles';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css'],
})
export class EditarUsuarioComponent {
  //Variables
  editarUsuario: FormGroup = new FormGroup({}); // Inicialización aquí
  public mostrarPassword: boolean = false;
  loading: boolean = false;
  dataUser: any;

  listaOcupaciones: string[] = Ocupaciones;
  nacionalidades: string[] = Nacionalidades;
  roles: string[] = Roles;
  estadosSocio: string[] = ['Activo', 'Inactivo', 'Pendiente'];
  nivelesEducacion: string[] = [
    'Primaria',
    'Secundaria',
    'Universitaria',
    'Postgrado',
  ];
  defaultEducacion: string = 'Universitaria'; // Valor por defecto
  titulo: string = 'registro de datos';
  enviarFormulario: string = 'registrar datos';
  submitted: boolean = false;
  id: string = '';
  usuarioAuthID: any;
  activoRol: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private fireError: FirebaseErrorService,
    private errorMessageService: ErrorMessageService,
    private userService: FireDatabase,
    private localStorage: LocalStorageService,
    private datosForm: DatosFormularioService
  ) {
    // Obtener el usuarioID de los parámetros de la URL
    // const usuarioID = this.route.snapshot.params['usuarioID'];
    this.id = this.route.snapshot.paramMap.get('usuarioID') || '';

    // if (this.EsEditable(usuarioID)) {
    //   this.EditarCampos(usuarioID);
    // } else {
    this.InicializarFormulario();
    // }
    if (this.EsEditable(this.id)) {
      this.EditarCampos(this.id);
    }
  }

  toggleRoles() {
    this.activoRol = !this.activoRol;
    // console.log(this.activoRol);
  }

  EnviarFormulario() {
    if (this.EsEditable(this.id)) {
      this.EditarUsuario();
    } else {
      this.AgregarUsuario();
    }
  }

  EsEditable(u: any) {
    // if (u !== null && u !== undefined && u !== '') {
    //   // console.log('si');
    //   return true;
    // } else {
    //   // console.log('no');
    //   return false;
    // }
    return !!u; // Verificar si u no es null, undefined o una cadena vacía
  }

  EditarCampos(u: any) {
    // Obtener los datos del usuario existente utilizando el servicio
    this.titulo = 'Editar Usuario';
    this.enviarFormulario = 'actualizar datos';
    this.userService.getUserByID(u).subscribe((usuario) => {
      // Inicializar el formulario con los datos del usuario existente
      this.editarUsuario.setValue({
        rol: usuario.payload.data()['rol'],
        nombre: usuario.payload.data()['nombre'],
        apellido: usuario.payload.data()['apellido'],
        fechaNacimiento: usuario.payload.data()['fechaNacimiento'],
        tipoDocumentoIdentidad:
          usuario.payload.data()['tipoDocumentoIdentidad'],
        documentoIdentidad: usuario.payload.data()['documentoIdentidad'],
        nacionalidad: usuario.payload.data()['nacionalidad'],
        telefono: usuario.payload.data()['telefono'],
        ocupacion: usuario.payload.data()['ocupacion'],
        estadoSocio: usuario.payload.data()['estadoSocio'],
        genero: usuario.payload.data()['genero'],
        direccion: usuario.payload.data()['direccion'],
        email: usuario.payload.data()['email'],
        password: usuario.payload.data()['password'],
        estadoCivil: usuario.payload.data()['estadoCivil'],
        educacion: usuario.payload.data()['educacion'],
        numeroDependientes: usuario.payload.data()['numeroDependientes'],
        numeroHijos: usuario.payload.data()['numeroHijos'],
        discapacidad: usuario.payload.data()['discapacidad'],
        nombreContactoEmergencia:
          usuario.payload.data()['nombreContactoEmergencia'],
        telefonoContactoEmergencia: usuario.payload.data()['telefono'],
        fechaRegistro: usuario.payload.data()['fechaRegistro'],
        fechaModificacion: this.datosForm.ObtenerFechaActual(),
      });
    });
  }

  // Funciones
  AgregarUsuario() {
    this.submitted = true;

    if (this.editarUsuario.invalid) {
      return;
    }

    // const usuario: any = {
    //   usuarioID: this.generarUsuarioID(),
    //   nombre: this.editarUsuario.value.nombre,
    //   apellido: this.editarUsuario.value.apellido,
    //   fechaNacimiento: this.editarUsuario.value.fechaNacimiento,
    //   tipoDocumentoIdentidad: this.editarUsuario.value.tipoDocumentoIdentidad,
    //   documentoIdentidad: this.editarUsuario.value.documentoIdentidad,
    //   nacionalidad: this.editarUsuario.value.nacionalidad,
    //   telefono: this.editarUsuario.value.telefono,
    //   ocupacion: this.editarUsuario.value.ocupacion,
    //   estadoSocio: 'Pendiente',
    //   genero: this.editarUsuario.value.genero,
    //   direccion: this.editarUsuario.value.direccion,
    //   email: this.dataUser.email,
    //   password: this.dataUser.password,
    //   estadoCivil: this.editarUsuario.value.estadoCivil,
    //   educacion: this.editarUsuario.value.educacion,
    //   numeroDependientes: this.editarUsuario.value.numeroDependientes,
    //   numeroHijos: this.editarUsuario.value.numeroHijos,
    //   discapacidad: this.editarUsuario.value.discapacidad,
    //   nombreContactoEmergencia:
    //     this.editarUsuario.value.nombreContactoEmergencia,
    //   telefonoContactoEmergencia:
    //     this.editarUsuario.value.telefonoContactoEmergencia,
    //   fechaRegistro: this.obtenerFechaActual(),
    //   fechaModificacion: this.obtenerFechaActual(),
    // };
    this.loading = true;

    this.dataUser = this.editarUsuario.value;
    console.log(this.dataUser);
    this.userService
      .addUser(this.dataUser)
      .then((res) => {
        console.log('registro exitoso', res);
        this.loading = false;
        this.router.navigate(['/admin']);
      })
      .catch((error) => {
        console.log(error);
        this.loading = false;
      });
  }

  EditarUsuario() {
    this.dataUser = this.editarUsuario.value;
    this.userService.updateUser(this.id, this.dataUser);

    alert('Usuario editado correctamente.');
    this.router.navigate(['/admin']);
  }

  InicializarFormulario() {
    this.dataUser = this.localStorage.loadDataFromLocalStorage('dataUser');
    this.editarUsuario = this.fb.group({
      // usuarioID: [this.usuarioAuthID],
      rol: ['soc', Validators.required],
      nombre: [null, Validators.required],
      apellido: [null, Validators.required],
      fechaNacimiento: [
        null,
        [Validators.required, this.datosForm.ValidarEdad],
      ],
      tipoDocumentoIdentidad: [null, Validators.required],
      documentoIdentidad: [null, Validators.required],
      nacionalidad: [null, Validators.required],
      telefono: [null, Validators.required],
      ocupacion: [null, Validators.required],
      estadoSocio: ['Pendiente', Validators.required],
      genero: [null, Validators.required],
      direccion: [null, Validators.required],
      email: [this.dataUser.email, [Validators.required, Validators.email]],
      password: [
        this.dataUser.password,
        [Validators.required, Validators.minLength(6)],
      ],
      estadoCivil: [null, Validators.required],
      educacion: [null, Validators.required],
      numeroDependientes: [0, [Validators.required, Validators.min(0)]],
      numeroHijos: [0, [Validators.required, Validators.min(0)]],
      discapacidad: [null, Validators.required],
      nombreContactoEmergencia: [null, Validators.required],
      telefonoContactoEmergencia: [null, Validators.required],
      fechaRegistro: [this.datosForm.ObtenerFechaActual()],
      fechaModificacion: [this.datosForm.ObtenerFechaActual()],
    });
  }

  TogglePasswordVisibility(passwordInput: HTMLInputElement) {
    this.datosForm.TogglePasswordVisibility(passwordInput);
  }
  calcularFechaMinima() {
    return this.datosForm.CalcularFechaMinima();
  }
  calcularFechaMaxima() {
    return this.datosForm.CalcularFechaMaxima();
  }

  // Obtener mensajes de error específicos para cada campo
  getErrorMessage(controlName: string) {
    return this.errorMessageService.getErrorMessage(
      controlName,
      this.editarUsuario
    );
  }
}
