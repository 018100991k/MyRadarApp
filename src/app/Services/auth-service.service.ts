import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FirebaseErrorService } from './firebase-error.service';
import { LocalStorageService } from './local-storage.service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  dataUser: any;
  loading: boolean = false;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private fireError: FirebaseErrorService,
    private localStorage: LocalStorageService
  ) {}

  getRoles(): string[] {
    // Lógica para obtener los roles del usuario
    // Puedes devolver un array de roles

    this.dataUser = this.localStorage.loadDataFromLocalStorage('dataUser');
    if (this.dataUser.email == 'matayus54@gmail.com') {
      return ['admin'];
    }
    // if (this.dataUser.rol) {
    // }
    else {
      return ['soc'];
    }

    // return ['admin', 'soc'];
  }

  stateUser() {
    return this.afAuth.authState; // Devuelve un observable con el estado del usuario actual  (conectado, desconectado, etc)
  }
  async ObtenerUid(): Promise<string | null> {
    const user = await this.afAuth.currentUser;
    return user ? user.uid : null;
  }

  Logout() {
    // Realizar el logout utilizando AngularFireAuth
    this.afAuth.signOut().then(() => {
      // Redirigir al usuario a la página de inicio de sesión
      this.router.navigate(['/login']);
    });
  }

  LoginUsuario(loginUsuario: FormGroup) {
    const username = loginUsuario.value.username;
    const password = loginUsuario.value.password;
    this.dataUser = { email: username, password };
    this.loading = true;
    return this.afAuth
      .signInWithEmailAndPassword(username, password)
      .then((u) => {
        this.loading = false;
        if (u.user?.emailVerified) {
          this.localStorage.saveDataToLocalStorage('dataUser', this.dataUser);
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/verificar-correo']);
        }
      })
      .catch((error) => {
        this.loading = false;
        alert(this.fireError.firebaseError(error.code));
      });
  }

  VerificarUsuarioYRedirigir(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.afAuth.currentUser
        .then((user) => {
          if (!user) {
            this.router.navigate(['/login']);
            resolve(false);
          } else if (user && user.emailVerified) {
            this.dataUser = user;
            resolve(this.dataUser);
          } else {
            this.router.navigate(['/inicio']);
            // Si no se cumple ninguna de las condiciones anteriores, podría ser útil devolver un valor predeterminado
            resolve(false);
          }
        })
        .catch((error) => {
          alert(this.fireError.firebaseError(error.code));
          reject(error);
        });
    });
  }

  RegistrarUsuario(email: string, password: string) {
    this.loading = true;

    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.loading = false;

        this.localStorage.saveDataToLocalStorage(
          'dataUser',
          JSON.stringify({ email, password })
        ); // Guarda en Local Storage

        // Enviar correo de verificación
        this.VerificarCorreo(userCredential.user);
      })
      .catch((error) => {
        this.loading = false;
        console.log(error);
        alert(this.fireError.firebaseError(error.code));
      });
  }

  VerificarCorreo(user: any) {
    if (user) {
      user
        .sendEmailVerification()
        .then(() => {
          //si todo esta bien

          alert(
            'Usuario registrado con éxito, Correo de verificación enviado correctamente.'
          );

          this.router.navigate(['/verificar-correo']);
        })
        .catch((error: any) => {
          alert('Error al enviar el correo de verificación:' + error);
        });
    } else {
      alert(
        'No hay usuario autenticado para enviar el correo de verificación.'
      );
    }
  }
}
