import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-ucarrusel-img',
  templateUrl: './ucarrusel-img.component.html',
  styleUrls: ['./ucarrusel-img.component.css'],
})
export class UCarruselImgComponent implements AfterViewInit {
  @ViewChild('imageCounter', { static: false }) imageCounter!: ElementRef;
  @ViewChild('cImg', { static: false }) cImg!: ElementRef;
  @ViewChild('#imageSelector', { static: false }) imageSelector!: ElementRef;

  imagesData = [
    {
      url: 'https://i.imgur.com/ODHzBFk.png',
      link: 'https://018100991k.github.io/horario/',
    },
    {
      url: 'https://i.imgur.com/F7K5CPh.png',
      link: 'https://018100991k.github.io/horario/',
    },
    {
      url: 'https://i.imgur.com/B56uXg9.png',
      link: 'file:///D:/Trabajos/reac/horario/index.html3',
    },
    {
      url: 'https://i.imgur.com/xz4Gtk1.jpg',
      link: 'file:///D:/Trabajos/reac/horario/index.html4',
    },
    {
      url: 'https://i.imgur.com/0NGwYtS.png',
      link: 'file:///D:/Trabajos/reac/horario/index.html',
    },
    {
      url: 'https://i.imgur.com/JoER25Z.png',
      link: 'file:///D:/Trabajos/reac/horario/index.html',
    },
  ];

  currentIndex = 0;
  autoRotateInterval: any;

  rotarImagen(step: any) {
    this.currentIndex =
      (this.currentIndex + step + this.imagesData.length) %
      this.imagesData.length;
    this.actualizarImagen();
  }

  abrirEnlace() {
    const currentImage = this.imagesData[this.currentIndex];
    window.location.href = currentImage.link;
  }

  actualizarImagen() {
    const [leftImage, selectedImage, rightImage] =
      this.cImg.nativeElement.querySelectorAll('img');

    leftImage.src =
      this.imagesData[
        (this.currentIndex - 1 + this.imagesData.length) %
          this.imagesData.length
      ].url;
    selectedImage.src = this.imagesData[this.currentIndex].url;
    rightImage.src =
      this.imagesData[(this.currentIndex + 1) % this.imagesData.length].url;

    const images = this.cImg.nativeElement.querySelectorAll(
      '.side-images, .selected-image'
    );
    images.forEach((img: any, index: any) => {
      img.style.opacity = index === 1 ? '1' : '0.6';
      img.style.transform = index === 1 ? 'scale(1.5)' : 'scale(1)';
    });

    this.actualizarSelectorImagenes();
    this.actualizarContadorImagenes();
  }

  actualizarSelectorImagenes() {
    const selector = this.imageSelector.nativeElement;
    selector.innerHTML = '';

    this.imagesData.forEach((data, index) => {
      const dot = document.createElement('div');
      dot.classList.add('image-dot');
      dot.addEventListener('click', () => this.seleccionarImagen(index));
      selector.appendChild(dot);
    });

    const selectedDot = selector.children[this.currentIndex];
    if (selectedDot) {
      selectedDot.style.backgroundColor = 'red';
    }
  }

  actualizarContadorImagenes() {
    const contador = this.imageCounter.nativeElement;
    contador.textContent = `${this.currentIndex + 1}/${this.imagesData.length}`;
  }

  seleccionarImagen(index: any) {
    this.currentIndex = index;
    this.actualizarImagen();
  }

  pausarRotacion() {
    clearInterval(this.autoRotateInterval);
  }

  reanudarRotacion() {
    this.autoRotateInterval = setInterval(() => this.rotarImagen(1), 5000);
  }

  escalarImagen() {
    const selectedImage =
      this.cImg.nativeElement.querySelector('.selected-image');
    selectedImage.style.transform = 'scale(2)';
  }

  restaurarEscala() {
    const selectedImage =
      this.cImg.nativeElement.querySelector('.selected-image');
    selectedImage.style.transform = 'scale(1.5)';
  }

  cambiarImagenPorContador(event: any) {
    if (event.key === 'Enter') {
      const inputNumeroImagen =
        this.imageCounter.nativeElement.textContent.trim();
      const numeroImagen = parseInt(inputNumeroImagen, 10);

      if (
        !isNaN(numeroImagen) &&
        numeroImagen >= 1 &&
        numeroImagen <= this.imagesData.length
      ) {
        this.currentIndex = numeroImagen - 1;
        this.actualizarImagen();
      } else {
        alert('Ingrese un número válido de imagen');
      }

      // Evitar que el elemento sea editable después de presionar Enter
      this.imageCounter.nativeElement.blur();
    }
  }

  ngAfterViewInit() {
    this.actualizarImagen(); // Para mostrar la imagen inicial
    this.autoRotateInterval = setInterval(() => this.rotarImagen(1), 5000);
  }
}
