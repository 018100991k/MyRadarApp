import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  saveDataToLocalStorage(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  removeDataFromLocalStorage(key: string): void {
    localStorage.removeItem(key);
  }

  // Método para cargar los datos del usuario y actualizar el estado
  // loadDataFromLocalStorage(key: string): any {
  //   const storedDataUserString = localStorage.getItem(key);
  //   if (storedDataUserString) {
  //     const storedDataUser = JSON.parse(storedDataUserString);
  //     console.log('Datos del usuario almacenados:', storedDataUser);
  //     return storedDataUser;
  //   } else {
  //     console.log('No se encontraron datos del usuario en el Local Storage.');
  //     return null;
  //   }
  // }

  loadDataFromLocalStorage(key: string): any {
    const dataString = localStorage.getItem(key);
    return dataString ? JSON.parse(dataString) : null;
  }
}
