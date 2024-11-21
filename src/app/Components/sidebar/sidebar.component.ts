import { SharedServiceService } from '@Services/shared-service.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  showText = true;
  sidebarWidth = '20vw';

  constructor(private sharedService: SharedServiceService) {}

  toggleTextVisibility() {
    this.showText = !this.showText;
    // Cambia el ancho del sidebar dinámicamente
    this.sidebarWidth = this.showText ? '20vw' : 'auto';
    this.sharedService.updateSidebarWidth(this.sidebarWidth);
  }

  showContent(image: string, button: string) {
    // Asigna valores a image y button según el botón seleccionado
    switch (button) {
      case 'btn1':
        image = 'img1';
        break;
      case 'btn2':
        image = 'img2';
        break;
      case 'btn3':
        image = 'img3';
        break;
      case 'btn4':
        image = 'img4';
        break;
      case 'btn5':
        image = 'img5';
        break;
      default:
        // En caso de que el botón no coincida con ninguno de los casos anteriores
        image = 'imagen_predeterminada';
        break;
    }

    // Ejemplo de navegación a una ruta específica con parámetros
    // this.router.navigate(['/contenido', button], { queryParams: { image } });
  }
}
