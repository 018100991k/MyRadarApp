import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {
  constructor() {}

  // Obtener mensajes de error específicos para cada campo
  getErrorMessage(controlName: string, form: FormGroup) {
    const control = form.get(controlName);

    if (control?.hasError('required')) {
      return 'Este campo es obligatorio';
    } else if (control?.hasError('email')) {
      return 'Ingrese un correo electrónico válido';
    } else if (control?.hasError('minlength')) {
      return `La contraseña debe tener al menos ${
        control.getError('minlength')?.requiredLength
      } caracteres`;
    } else if (control?.hasError('passwordMismatch')) {
      return 'Las contraseñas no coinciden';
    }

    return '';
  }
}