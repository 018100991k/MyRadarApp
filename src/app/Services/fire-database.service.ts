import { ChangeDetectorRef, Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { Usuario } from '../Interfaces/usuario';
import { Observable, from, of } from 'rxjs';
import { AuthService } from './auth-service.service';
import { map, switchMap, take } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class FireDatabase {
  private dbPathUsers = '/users';
  private dbPathDocs = '/docs';
  usersRef!: AngularFirestoreCollection<Usuario>;
  docsRef!: AngularFirestoreCollection<any>;

  // public listaUsuarios: Usuario[] = [];
  public listaUsuarios$: Observable<Usuario[]>; // Cambiando a un observable

  constructor(
    private db: AngularFirestore,
    private authServ: AuthService,
    private localStorage: LocalStorageService
  ) {
    /* this.usersRef = db.collection(this.dbPathUsers);
    this.usersRef.get().subscribe((u) => {
      let docs = u.docs;
      this.listaUsuarios = docs.map((d) => {
        return { id: d, ...d.data() };
      });
    }); */
    this.usersRef = db.collection(this.dbPathUsers);
    this.listaUsuarios$ = this.usersRef.valueChanges();
    this.docsRef = db.collection(this.dbPathDocs);
  }

  // docs
  getAllDocs(): Observable<any[]> {
    return this.docsRef.valueChanges();
  }

  getDocById(docId: string): Observable<any | undefined> {
    return this.docsRef.doc(docId).valueChanges();
  }

  async addDoc(newDoc: any) {
    try {
      let dRef: DocumentReference<any> = await this.docsRef.add(newDoc);
      console.log('Documento agregado con éxito');
    } catch (error) {
      console.error('Error al agregar documento:', error);
    }
  }

  async updateDoc(docId: string, newData: any): Promise<void> {
    try {
      await this.docsRef.doc(docId).update(newData);
      console.log('Documento actualizado con éxito');
    } catch (error) {
      console.error('Error al actualizar documento:', error);
    }
  }

  async deleteDoc(docId: string): Promise<void> {
    try {
      await this.docsRef.doc(docId).delete();
      console.log('Documento eliminado con éxito');
    } catch (error) {
      console.error('Error al eliminar documento:', error);
    }
  }

  //usuarios

  getDatosUser(uid: string): Observable<Usuario | undefined> {
    return this.usersRef.doc(uid).valueChanges({ idField: 'usuarioID' });
  }

  // Si necesitas obtener todos los usuarios
  getAllUsers(): Observable<Usuario[]> {
    //   return this.db.collection<Usuario>(this.dbPathUsers).valueChanges();
    return this.listaUsuarios$;
  }

  getUserByID(usuarioID: string): Observable<any> {
    return this.usersRef.doc(usuarioID).snapshotChanges();
  }

  async addUser(newUsuario: Usuario) {
    try {
      const usuarioID = await this.authServ.ObtenerUid();

      if (usuarioID) {
        // Si usuarioID tiene un valor, lo utilizamos para establecer el documento
        this.usersRef.doc(String(usuarioID)).set({
          ...newUsuario,
          usuarioID: usuarioID, // Aseguramos que el usuarioID esté presente en los datos guardados
        });
      } else {
        // Si usuarioID es undefined, utilizamos add para generar uno nuevo
        let dRef: DocumentReference<any> = await this.usersRef.add({
          ...newUsuario,
        });
        newUsuario.usuarioID = dRef.id;
      }

      console.log('Usuario agregado con éxito');
    } catch (error) {
      console.error('Error al agregar usuario:', error);
    }
  }

  async updateUser(userId: string, newData: Partial<Usuario>): Promise<void> {
    try {
      await this.usersRef.doc(userId).update(newData);
      console.log('Usuario actualizado con éxito');
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
    }
  }

  async deleteUser(userId: string): Promise<void> {
    try {
      await this.usersRef.doc(userId).delete();
      console.log('Usuario eliminado con éxito');
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  }

  // initializeUserData(): void {
  //   this.authServ
  //     .stateUser()
  //     .pipe(
  //       take(1),
  //       switchMap((user) => (user ? this.getDatosUser(user.uid) : of(null))),
  //       map((userData) => userData)
  //     )
  //     .subscribe((userData) => {
  //       if (userData) {
  //         this.localStorage.saveDataToLocalStorage('dataUser', userData);
  //       }
  //       this.localStorage.loadDataFromLocalStorage('dataUser');
  //     });
  // }

  // getDatosUser(email: string) {
  //   // Utilizando un snapshotChanges para obtener los cambios en tiempo real
  //   return this.db
  //     .collection<Usuario>(this.dbPathUsers, (ref) =>
  //       ref.where('email', '==', email)
  //     )
  //     .valueChanges({ idField: 'usuarioID' });
  // }

  // getUserByID(usuarioID: string): Observable<Usuario | undefined> {
  //   return this.usersRef
  //     .doc<Usuario>(usuarioID)
  //     .valueChanges({ idField: 'usuarioID' });
  // }

  // async addUser(newUsuario: Usuario) {
  //   try {
  //     let { usuarioID, ...newUserWithId } = newUsuario;

  //     if (usuarioID !== undefined) {
  //       // Si usuarioID tiene un valor, lo utilizamos para establecer el documento
  //       this.usersRef.doc(String(usuarioID)).set({
  //         ...newUserWithId,
  //         usuarioID: usuarioID, // Aseguramos que el usuarioID esté presente en los datos guardados
  //       });
  //     } else {
  //       // Si usuarioID es undefined, utilizamos add para generar uno nuevo
  //       let dRef: DocumentReference<any> = await this.usersRef.add({
  //         ...newUserWithId,
  //       });
  //       newUsuario.usuarioID = dRef.id;
  //     }

  //     // this.listaUsuarios.push(newUsuario);
  //     console.log('Usuario agregado con éxito');
  //   } catch (error) {
  //     console.error('Error al agregar usuario:', error);
  //   }
  // }
}
