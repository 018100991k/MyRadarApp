import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseErrorService } from 'src/app/Services/firebase-error.service';

@Component({
  selector: 'app-restablecer-password',
  templateUrl: './restablecer-password.component.html',
  styleUrls: ['./restablecer-password.component.css'],
})
export class RestablecerPasswordComponent {
  restablecerUsuario: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router,
    private fireError: FirebaseErrorService
  ) {
    this.restablecerUsuario = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
      },
      {}
    );
  }

  RestablecerUsuario() {
    console.log(this.restablecerUsuario);

    // Verificar si el formulario está completo antes de continuar
    const email = this.restablecerUsuario.value.email;

    this.loading = true;
    this.afAuth
      .sendPasswordResetEmail(email)
      .then(() => {
        this.loading = false;
        this.router.navigate(['/login']);
        alert('Se ha enviado un correo para restablecer la contraseña');
      })
      .catch((error) => {
        this.loading = false;
        console.log(error);
        alert(this.fireError.firebaseError(error.code));
      });
  }
}
