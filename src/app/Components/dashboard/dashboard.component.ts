import { LocalStorageService } from '@Services/local-storage.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServiceService } from '@Services/shared-service.service';
import { AuthService } from '@Services/auth-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
//
// implements OnInit
export class DashboardComponent {
  loading: boolean = false;
  dataUser: any;
  contentGridColumns = '20vw 0fr 1fr';
  showNavbar = true; // Nueva propiedad para controlar la visibilidad del navbar
  nav: any;

  constructor(
    // private router: Router,
    private sharedService: SharedServiceService
  ) {
    this.sharedService.sidebarWidth$.subscribe((width) => {
      this.contentGridColumns = width === 'auto' ? '4.5vw  1fr' : '20vw 1fr';
      if (this.nav == false) {
        this.showNavbar = !this.showNavbar;
      } else {
        this.showNavbar = true;
      }
    });

    this.sharedService.isNavbarBlocked$.subscribe((status) => {
      if (status == false) {
        this.nav = false;
      } else {
        this.nav = true;
      }
    });
  }
}
