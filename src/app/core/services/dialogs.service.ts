import {Injectable} from "@angular/core";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AsesoriaShowComponent} from "../../modulos/docente/asesorias/asesorias-show/asesorias-show.component";
import Formulario from "../models/formulario.model";
import {FormulariosDeleteComponent} from "../../modulos/docente/formularios/formularios-delete/formularios-delete.component";

@Injectable()
export class DialogService {

  constructor(
    private matDialog: MatDialog
  ) {
  }


  showAsesoriaDialog(idAsesoria) {
    let dialogRef: MatDialogRef<AsesoriaShowComponent>;
    dialogRef = this.matDialog.open(AsesoriaShowComponent, {
      data: { idAsesoria }
    });
    return dialogRef.afterClosed();
  }

  deleteFormularioDialog(idFormulario: number) {
    let dialogRef: MatDialogRef<FormulariosDeleteComponent>;
    dialogRef = this.matDialog.open(FormulariosDeleteComponent, {
      data: { idFormulario }
    });
    return dialogRef.afterClosed();
  }

}
