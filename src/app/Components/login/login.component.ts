import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseErrorService } from 'src/app/Services/firebase-error.service';
import { AuthService } from '@Services/auth-service.service';
import { LocalStorageService } from '@Services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginUsuario: FormGroup;
  loading: boolean = false;
  dataUser: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private localStorage: LocalStorageService,
  ) {
    this.loginUsuario = this.fb.group(
      {
        username: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      },
      {}
    );
  }

  LoguearUsuario() {
    this.authService.LoginUsuario(this.loginUsuario);
    this.dataUser = this.localStorage.loadDataFromLocalStorage('dataUser');
  }
}
