import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationsComponent } from './notify-component/notifications/notifications.component';


@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private snackBar: MatSnackBar) { }

  showNotification(notifyType:string, displayMessage:string, action:string){

   
    this.snackBar.openFromComponent(NotificationsComponent, {
      data:{
        messageType:notifyType,
        message: displayMessage,
        buttonText:action
      },
      horizontalPosition: 'center',
      verticalPosition:'top',
      panelClass: notifyType
    });
  }
}
