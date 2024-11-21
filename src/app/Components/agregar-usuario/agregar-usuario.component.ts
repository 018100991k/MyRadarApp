import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseErrorService } from '../../Services/firebase-error.service';
import { ErrorMessageService } from '@Services/error-message.service';
import { FireDatabase } from '../../Services/fire-database.service';
import { LocalStorageService } from '@Services/local-storage.service';
import { Ocupaciones } from 'src/app/Utils/Ocupaciones';
import { Nacionalidades } from 'src/app/Utils/Nacionalidades';
import { DatosFormularioService } from '@Services/datos-formulario.service';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css'],
})
export class AgregarUsuarioComponent {
  //Variables
  agregarUsuario: FormGroup;
  public mostrarPassword: boolean = false;
  loading: boolean = false;
  dataUser: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private fireError: FirebaseErrorService,
    private errorMessageService: ErrorMessageService,
    private datosForm: DatosFormularioService,
    private userService: FireDatabase,
    private localStorage: LocalStorageService
  ) {
    // this.agregarUsuario = new FormGroup({
    //   usuarioID: new FormControl(),
    // });

    this.dataUser = this.localStorage.loadDataFromLocalStorage('dataUser');

    this.agregarUsuario = this.fb.group({
      usuarioID: [this.generarUsuarioID()],
      nombre: [null, Validators.required],
      apellido: [null, Validators.required],
      fechaNacimiento: [null, [Validators.required, this.validarEdad]],
      tipoDocumentoIdentidad: [null, Validators.required],
      documentoIdentidad: [null, Validators.required],
      nacionalidad: [null, Validators.required],
      telefono: [null, Validators.required],
      ocupacion: [null, Validators.required],
      estadoSocio: ['Pendiente', Validators.required],
      genero: [null, Validators.required],
      direccion: [null, Validators.required],
      // correoElectronico: [null, [Validators.required, Validators.email]],
      // contrasena: [null, [Validators.required, Validators.minLength(6)]],
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
      fechaRegistro: [this.obtenerFechaActual()],
      fechaModificacion: [this.obtenerFechaActual()],
    });
  }

  // Funciones
  listaOcupaciones: string[] = Ocupaciones;
  nacionalidades: string[] = Nacionalidades;
  estadosSocio: string[] = ['Activo', 'Inactivo', 'Pendiente'];
  nivelesEducacion: string[] = [
    'Primaria',
    'Secundaria',
    'Universitaria',
    'Postgrado',
  ];

  obtenerFechaActual(): string {
    const fecha = new Date();
    // return fecha.toISOString(); // Devuelve la fecha y hora actual en formato ISO
    const formatoFecha = new Intl.DateTimeFormat('es', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'America/Lima',
    });

    return formatoFecha.format(fecha);
  }

  generarUsuarioID(): string {
    const fechaActual = new Date();
    const dia = fechaActual.getDate().toString().padStart(2, '0');
    const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
    const anio = fechaActual.getFullYear().toString();
    const hora = fechaActual.getHours().toString().padStart(2, '0');
    const minutos = fechaActual.getMinutes().toString().padStart(2, '0');
    const segundos = fechaActual.getSeconds().toString().padStart(2, '0');

    const usuarioID = `SOC\\${dia}\\${mes}\\${anio}-${hora}:${minutos}:${segundos}`;
    return usuarioID;
  }

  TogglePasswordVisibility(passwordInput: HTMLInputElement) {
    this.datosForm.TogglePasswordVisibility(passwordInput);
  }

  // Obtener mensajes de error específicos para cada campo
  getErrorMessage(controlName: string) {
    return this.errorMessageService.getErrorMessage(
      controlName,
      this.agregarUsuario
    );
  }

  // Validador personalizado para la edad
  validarEdad(control: any) {
    const fechaNacimiento = new Date(control.value);
    const fechaActual = new Date();
    const edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();

    if (edad < 18 || edad > 100) {
      return { edadInvalida: true };
    }

    return null;
  }

  calcularFechaMinima(): string {
    const fechaMinima = new Date();
    fechaMinima.setFullYear(fechaMinima.getFullYear() - 100);
    return fechaMinima.toISOString().split('T')[0];
  }

  calcularFechaMaxima(): string {
    const fechaMaxima = new Date();
    fechaMaxima.setFullYear(fechaMaxima.getFullYear() - 18);
    return fechaMaxima.toISOString().split('T')[0];
  }

  async AgregarUsuario() {
    this.dataUser = this.agregarUsuario.value;
    const response = await this.userService.addUser(this.agregarUsuario.value);

    // Almacena los nuevos datos en el localStorage
    this.localStorage.saveDataToLocalStorage(
      'dataUser',
      JSON.stringify(this.dataUser)
    ); // Guarda en Local Storage

    alert('Usuario agregado correctamente.');
    this.router.navigate(['/login']);
  }
}
