import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

import { Router } from '@angular/router';
import { FirebaseErrorService } from '../../Services/firebase-error.service';
import { ErrorMessageService } from '@Services/error-message.service';

// import {} from 'firebase/firestore';
import { FireDatabase } from '../../Services/fire-database.service';
import { Usuario } from 'src/app/Interfaces/usuario';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-administrar-usuarios',
  templateUrl: './administrar-usuarios.component.html',
  styleUrls: ['./administrar-usuarios.component.css'],
})
export class AdministrarUsuariosComponent {
  // listaUsuarios: Usuario[] = [];
  loading: boolean = false;

  // constructor(private userService: FireDatabase) {}

  // ngOnInit(): void {
  //   this.userService.getAllUsers().subscribe(
  //     (usuarios) => {
  //       this.listaUsuarios = usuarios;
  //       console.log(this.listaUsuarios);
  //     },
  //     (error) => {
  //       console.error('Error al obtener la lista de usuarios:', error);
  //     }
  //   );
  // }

  listaUsuarios$: Observable<Usuario[]> = new Observable<Usuario[]>(); // Inicialización aquí

  constructor(private usersService: FireDatabase, private router: Router) {
    this.listaUsuarios$ = this.usersService.getAllUsers();
  }

  AgregarUsuario() {
    this.router.navigate(['/editUser']);
  }

  editarUsuario(u: any) {
    if (u) {
      console.log('Editar usuario con ID:', u);
      // Agrega aquí la lógica para editar el usuario
      // Navegar a la página de edición con el usuarioID
      this.router.navigate(['/editUser', u]);
    } else {
      console.error('ID de usuario indefinido');
    }
  }

  eliminarUsuario(u: any) {
    if (u) {
      console.log('Eliminar usuario con ID:', u);
      // Agrega aquí la lógica para eliminar el usuario
      this.usersService.deleteUser(u);
    } else {
      console.error('ID de usuario indefinido');
    }
  }
}
