import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  convertBase64ToFile(base64Data: string): File | null {
    const base64String = base64Data.split(',')[1];
    const byteCharacters = atob(base64String);
    const byteArray = new Uint8Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteArray[i] = byteCharacters.charCodeAt(i);
    }

    const blob = new Blob([byteArray], { type: 'image/png' });

    // Genera un nombre de archivo único basado en la fecha y hora actual
    const now = new Date();
    const filename = `image_${now.getTime()}.png`;

    // Crea un archivo tipo File a partir del Blob
    try {
      return new File([blob], filename, { type: 'image/png' });
    } catch (error) {
      console.error('Error al crear el archivo:', error);
      return null;
    }
  }

}
