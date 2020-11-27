import {MatSnackBar} from "@angular/material/snack-bar";
import {Injectable} from "@angular/core";

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
}
