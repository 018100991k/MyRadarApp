import { Injectable } from '@angular/core';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/storage';

// import { enviroments } from '../../Enviroments/enviroments';

// firebase.initializeApp(enviroments.firebaseConfig);

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  // storageRef = firebase.app().storage().ref();
  constructor() {}

  // async SubirImg(nombre: string, imgBase64: any) {
  //   try {
  //     const respuesta = await this.storageRef
  //       .child(`docs/${nombre}`)
  //       .putString(imgBase64, 'data_url');
  //     return respuesta.ref.getDownloadURL();
  //   } catch (e) {
  //     return e;
  //   }
  // }
}
