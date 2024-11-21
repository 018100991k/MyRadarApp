import { LocalStorageService } from '@Services/local-storage.service';
import { Component } from '@angular/core';
import { AuthService } from '@Services/auth-service.service';
import { FireDatabase } from '../../Services/fire-database.service';
import { map, of, switchMap, take } from 'rxjs';
import { SharedServiceService } from '@Services/shared-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  dataUser: any;
  isBottomVisible = true;
  bloked = false;

  constructor(
    private localStorage: LocalStorageService,
    private uS: FireDatabase,
    private authServ: AuthService,
    private sharedService: SharedServiceService
  ) {
    this.initializeUserData();
  }

  initializeUserData() {
    this.authServ.stateUser().subscribe((res) => {
      if (res) {
        console.log('loggeado', res);
        this.uS.getDatosUser(res.uid).subscribe((userData) => {
          console.log('Datos del usuario:', userData);
          this.localStorage.saveDataToLocalStorage('dataUser', userData);
          return (this.dataUser =
            this.localStorage.loadDataFromLocalStorage('dataUser'));
        });
      } else {
        console.log('no loggeado');
      }
    });
  }

  toggleBottomVisibility() {
    this.isBottomVisible = !this.isBottomVisible;
  }

  blockBottomVisibility() {
    this.bloked = !this.bloked;
    this.sharedService.toggleNavbarBlockedStatus(this.bloked);
  }

  logout() {
    // Eliminar dataUser del Local Storage
    this.localStorage.removeDataFromLocalStorage('dataUser');

    // Realizar el logout utilizando AngularFireAuth de authService
    this.authServ.Logout();
  }
}
