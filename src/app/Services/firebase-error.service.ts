import { Injectable } from '@angular/core';
import { AuthErrorCodeEnum } from '../Utils/firebase-code-errors';

@Injectable({
  providedIn: 'root',
})
export class FirebaseErrorService {
  constructor() {}
  firebaseError(code: AuthErrorCodeEnum): string {
    switch (code) {
      case AuthErrorCodeEnum.EmailAlreadyInUse:
        return 'La dirección de correo electrónico ya está en uso.';

      case AuthErrorCodeEnum.InvalidEmail:
        return 'La dirección de correo electrónico no es válida.';

      case AuthErrorCodeEnum.OperationNotAllowed:
        return 'Esta operación no está permitida.';

      case AuthErrorCodeEnum.WeakPassword:
        return 'La contraseña es débil. Debe tener al menos 6 caracteres.';

      case AuthErrorCodeEnum.UserDisabled:
        return 'La cuenta de usuario ha sido deshabilitada por un administrador.';

      case AuthErrorCodeEnum.UserNotFound:
        return 'No se encontró ningún usuario con la dirección de correo electrónico proporcionada.';

      case AuthErrorCodeEnum.WrongPassword:
        return 'La contraseña proporcionada es incorrecta.';

      case AuthErrorCodeEnum.PopupClosedByUser:
        return 'El usuario cerró la ventana emergente de autenticación.';

      case AuthErrorCodeEnum.ProviderAlreadyLinked:
        return 'Esta cuenta ya está vinculada a otro proveedor de autenticación.';

      case AuthErrorCodeEnum.RequiresRecentLogin:
        return 'Esta operación requiere que el usuario vuelva a autenticarse.';

      case AuthErrorCodeEnum.CredentialAlreadyInUse:
        return 'Las credenciales ya están en uso por otro usuario.';

      case AuthErrorCodeEnum.MissingEmail:
        return 'Falta el campo de correo electrónico.';

      case AuthErrorCodeEnum.MissingPassword:
        return 'Falta el campo de contraseña.';

      default:
        return `Se produjo un error durante la autenticación: ${code}`;
    }
  }
}
