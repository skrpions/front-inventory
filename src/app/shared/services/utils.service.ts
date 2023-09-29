import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private _snackBar = inject(MatSnackBar);
  private _keyCloakSrv = inject(KeycloakService);

  durationInSeconds = 3;

  getRoles(){
    return this._keyCloakSrv.getUserRoles();
  }

  isAdministrator(): boolean{
    let roles = this._keyCloakSrv.getUserRoles().filter(role => role === 'administrator');
    return roles.length > 0;
  }

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

  handleSuccess(action: string) {
    this._snackBar.open(`✔ Ok, ${action}`, '', {
      verticalPosition: 'top',
      horizontalPosition: 'center',
      duration: this.durationInSeconds * 1000,
      panelClass: ['green-snackbar'],
    });

  }

  handleError(action: string) {
    this._snackBar.open(`❌ Error ${action}`, '', {
      verticalPosition: 'top',
      horizontalPosition: 'center',
      duration: this.durationInSeconds * 1000,
      panelClass: ['red-snackbar'],
    });
    console.log(`Error ${action}`);
  }

}
