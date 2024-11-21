import { Component } from '@angular/core';
import {
  Storage,
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
} from '@angular/fire/storage';
import { StorageService } from '../../Services/storage.service';

@Component({
  selector: 'app-administrar-archivos',
  templateUrl: './administrar-archivos.component.html',
  styleUrls: ['./administrar-archivos.component.css'],
})
export class AdministrarArchivosComponent {
  imagenes: string[];

  constructor(private storage: Storage) {
    // this.GetImages();
    this.imagenes = [];
  }
  // constructor(private storage: StorageService) {}

  // CargarArchivos(event: any) {
  //   // Lógica para cargar archivos
  //   // console.log(event.target.files);
  //   let archivos = event.target.files;

  //   for (let i = 0; i < archivos.length; i++) {
  //     let nombre = archivos[i].name + '_' + Date.now();
  //     let reader = new FileReader();
  //     reader.readAsDataURL(archivos[i]); // valor 0 para leer el archivo como una URL (base64) y poder mostrarlo en el navegador o subirlo a la base de datos (firestore) o storage (firebase) o enviarlo a un servidor (backend) o enviarlo a un servicio de terceros (API) o enviarlo a un dispositivo (IoT) o enviarlo a un cliente (frontend) o enviarlo a un usuario (persona) enviarlo a un sistema (computadora)
  //     reader.onloadend = () => {
  //       // console.log(reader.result);
  //       this.imagenes.push(reader.result);
  //       this.storage.SubirImg(nombre, reader.result).then((urlImg) => {
  //         console.log(urlImg);
  //       });
  //     };
  //   }
  //   /*
  //   para subir 1 solo
  //   reader.readAsDataURL(archivos[0]);
  //   reader.onloadend = () => {
  //     console.log(reader.result);
  //     this.imagenes.push(reader.result);
  //     this.storage.SubirImg(nombre, reader.result).then((urlImg) => {
  //       console.log(urlImg);
  //     });
  //   }; */
  // }

  CargarArchivos(event: any) {
    // para subir un solo archivo
    // let archivos = event.target.files[0];
    // const imgRef = ref(this.storage, `docs/${archivos.name}`);
    // uploadBytes(imgRef, archivos)
    //   .then((snapshot) => {
    //     console.log('Imagen subida');
    //   })
    //   .catch((error) => {
    //     console.log('Error al subir la imagen');
    //   });

    // para subir multiples archivos
    const archivos = event.target.files;

    for (let i = 0; i < archivos.length; i++) {
      const nombre = archivos[i].name + '_' + Date.now();
      const imgRef = ref(this.storage, `docs/${nombre}`);

      uploadBytes(imgRef, archivos[i])
        .then((snapshot) => {
          console.log('Imagen subida');
          // Obtener la URL de la imagen recién subida
          getDownloadURL(imgRef).then((url) => {
            console.log(`URL de la imagen: ${url}`);
            // Guardar la URL en el arreglo de imágenes
            this.imagenes.push(url);
            // Actualizar la lista de imágenes después de cada carga
            // this.GetImages();
          });
        })
        .catch((error) => {
          console.log('Error al subir la imagen');
        });
    }
    console.log(`estas son las imagenes ${this.imagenes}`);
  }

  GetImages() {
    const imgRef = ref(this.storage, 'docs/');
    listAll(imgRef)
      .then(async (response) => {
        this.imagenes = [];
        for (let items of response.items) {
          const url = await getDownloadURL(items);
          this.imagenes.push(url);
          console.log(`aquí las ${url}`);
        }
      })
      .catch((error) => {});
  }
}
