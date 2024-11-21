import { AuthService } from '@Services/auth-service.service';
import { LocalStorageService } from '@Services/local-storage.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FireDatabase } from '../../Services/fire-database.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css'],
})
export class DashboardAdminComponent {
  constructor(
    private router: Router,
    private localStorage: LocalStorageService,
    private authServ: AuthService,
    private uS: FireDatabase
  ) {}
  logout() {
    // Eliminar dataUser del Local Storage
    this.localStorage.removeDataFromLocalStorage('dataUser');

    // Realizar el logout utilizando AngularFireAuth de authService
    this.authServ.Logout();
  }
}
