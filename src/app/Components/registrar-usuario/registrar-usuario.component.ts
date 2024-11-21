import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FirebaseErrorService } from '../../Services/firebase-error.service';
import { ErrorMessageService } from '@Services/error-message.service';
import { LocalStorageService } from '@Services/local-storage.service';
import { DatosFormularioService } from '@Services/datos-formulario.service';
import { AuthService } from '@Services/auth-service.service';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css'],
})
export class RegistrarUsuarioComponent implements OnInit {
  registrarUsuario: FormGroup;
  // isBotonHabilitado: boolean = false;
  public mostrarPassword: boolean = false;
  loading: boolean = false;
  dataUser: any;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router,
    private fireError: FirebaseErrorService,
    private errorMessageService: ErrorMessageService,
    private localStorage: LocalStorageService,
    private datosForm: DatosFormularioService,
    private authServ: AuthService
  ) {
    this.registrarUsuario = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        repeatPassword: ['', [Validators.required]],
      },
      {
        validators: this.passwordMatchValidator.bind(this),
      }
    );

    // Suscribirse a cambios en el formulario para actualizar el estado del botón
    // this.registrarUsuario.valueChanges.subscribe(() => {
    //   this.isBotonHabilitado = this.registrarUsuario.valid;
    // });
  }

  ngOnInit(): void {}

  RegistrarUsuario() {
    const email = this.registrarUsuario.value.email;
    const password = this.registrarUsuario.value.password;

    this.authServ.RegistrarUsuario(email, password);
  }

  TogglePasswordVisibility(passwordInput: HTMLInputElement) {
    this.datosForm.TogglePasswordVisibility(passwordInput);
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const repeatPassword = control.get('repeatPassword')?.value;

    if (password !== repeatPassword) {
      control.get('repeatPassword')?.setErrors({ passwordMismatch: true });
    } else {
      control.get('repeatPassword')?.setErrors(null);
    }

    return password === repeatPassword ? null : { passwordMismatch: true };
  }

  // Obtener mensajes de error específicos para cada campo
  getErrorMessage(controlName: string) {
    return this.errorMessageService.getErrorMessage(
      controlName,
      this.registrarUsuario
    );
  }
}
