import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationsComponent } from './notify-component/notifications/notifications.component';


@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private snackBar: MatSnackBar) { }

  showNotification(displayMessage:string, action:string){
    this.snackBar.openFromComponent(NotificationsComponent, {
      data:{
        message: displayMessage,
        buttonText:action
      },
      horizontalPosition: 'center',
      verticalPosition:'top',
      panelClass:'cif-notifications'
    });
  }
}
