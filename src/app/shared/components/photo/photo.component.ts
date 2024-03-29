import { Component, ElementRef, Input, ViewChild, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { WebcamImage } from 'ngx-webcam';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhotoComponent),
      multi: true,
    },
  ],
})
export class PhotoComponent {
  @ViewChild('photo') photo!: ElementRef;
  @ViewChild('file') file!: ElementRef;

  @Input() photoByDefault = '';

  statusHover = false;
  isUsingWebCam = false;
  triggerSnapshot = new Subject<void>();
  value!: File;

  onChange: any;
  onTouched: any;

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: File): void {
    if (value) {
      this.value = value;
    }
  }

  initFileDropped(file: File) {
    //if ((!file.type.startsWith('image/') || file.size > 3000000)) { // Limito la imagen a un peso de 3 megabytes
    if (!file.type.startsWith('image/')) {
      return;
    }

    this.onTouched();
    this.onChange(file);

    const reader = new FileReader();
    reader.onloadend = (response: any) => {
      const base64 = response.target.result;
      this.loadPhotoFromUrlOrDataUrl(base64);
      console.log(response);
    };

    reader.readAsDataURL(file);
  }


  loadPhotoFromUrlOrDataUrl(urlOrPath: string) {
    this.photo.nativeElement.style.backgroundImage = `url(${urlOrPath})`;
  }

  loadImage() {
    this.file.nativeElement.click();
    //return false;
  }

  selectImage(event: any) {
    const file = event.target.files[0];
    this.initFileDropped(file);
  }

  changeOriginPhoto() {
    this.isUsingWebCam = !this.isUsingWebCam;
  }

  takePhoto() {
    this.triggerSnapshot.next();
  }

  triggerAsObservable() {
    return this.triggerSnapshot.asObservable();
  }

  initImageCapture(webcamImage: WebcamImage) {
    fetch(webcamImage.imageAsDataUrl)
      .then(response => response.arrayBuffer())
      .then(buffer => new File([buffer], 'image.jpg', { type: 'image/jpeg' }))
      .then(file => {
        this.initFileDropped(file);
        this.isUsingWebCam = false;
      });
  }

  ngAfterViewInit() {
    if (this.photoByDefault) {

      // Si la foto por defecto está en base 64, la carga
      this.loadPhotoFromUrlOrDataUrl(this.photoByDefault);

      // Si la foto por defecto es una url, la carga directamente
      /* const path = `${environment.apiPath}/photos/${this.photoByDefault}`;
      this.loadPhotoFromUrlOrDataUrl(path); */
    }
  }
}
