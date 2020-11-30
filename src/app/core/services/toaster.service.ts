import {MatSnackBar} from "@angular/material/snack-bar";
import {Injectable} from "@angular/core";
import {NotificationsComponent} from "../util/notifications/notifications.component";

@Injectable()
export class ToasterService {

  public static CERRAR_ACTION = 'CERRAR';

  constructor(private snackBar: MatSnackBar) {
  }

  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  openSnackBarCumtom(message: string, messageType: 'error' | 'success') {
    this.snackBar.openFromComponent(NotificationsComponent, {
      data: {
        message: message,
        buttonText: 'CERRAR',
        type: messageType,
      },
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "bottom",
      panelClass: messageType,
    });
  }

}
