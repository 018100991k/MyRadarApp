import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DatosFormularioService {
  mostrarPassword = false;

  constructor() {}

  ObtenerFechaActual(): string {
    const fecha = new Date();
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

  GenerarUsuarioID(): string {
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

  ValidarEdad(control: any) {
    const fechaNacimiento = new Date(control.value);
    const fechaActual = new Date();
    const edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();

    if (edad < 18 || edad > 100) {
      return { edadInvalida: true };
    }

    return null;
  }

  CalcularFechaMinima(): string {
    const fechaMinima = new Date();
    fechaMinima.setFullYear(fechaMinima.getFullYear() - 100);
    return fechaMinima.toISOString().split('T')[0];
  }

  CalcularFechaMaxima(): string {
    const fechaMaxima = new Date();
    fechaMaxima.setFullYear(fechaMaxima.getFullYear() - 18);
    return fechaMaxima.toISOString().split('T')[0];
  }

  TogglePasswordVisibility(passwordInput: HTMLInputElement) {
    // Cambia el estado para mostrar/ocultar la contraseña
    this.mostrarPassword = !this.mostrarPassword;

    // Cambia dinámicamente la imagen cargada
    const togglePasswordElement = document.getElementById(
      'togglePassword'
    ) as HTMLImageElement;
    togglePasswordElement.src = this.mostrarPassword
      ? '../../../assets/img/ocultar.png'
      : '../../../assets/img/mostrar.png';

    if (passwordInput) {
      passwordInput.type = this.mostrarPassword ? 'text' : 'password';
      passwordInput.focus();
    }
  }
}
