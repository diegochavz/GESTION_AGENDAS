import {Injectable} from "@angular/core";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormulariosDeleteComponent} from "../../modulos/docente/formularios/formularios-delete/formularios-delete.component";
import {ProgramasDeleteComponent} from "../../modulos/super_usuario/programas/programas-delete/programas-delete.component";
import Programa from "../models/programa.model";
import {ProgramasEditComponent} from "../../modulos/super_usuario/programas/programas-edit/programas-edit.component";
import {ProgramasAddComponent} from "../../modulos/super_usuario/programas/programas-add/programas-add.component";
import {DocentesDeleteComponent} from "../../modulos/director/docentes/docentes-delete/docentes-delete.component";
import {DocentesEditComponent} from "../../modulos/director/docentes/docentes-edit/docentes-edit.component";
import {DocentesAddComponent} from "../../modulos/director/docentes/docentes-add/docentes-add.component";
import Estudiante from "../models/estudiante.model";
import {EstudiantesDeleteComponent} from "../../modulos/docente/estudiantes/estudiantes-delete/estudiantes-delete.component";
import {EstudiantesEditComponent} from "../../modulos/docente/estudiantes/estudiantes-edit/estudiantes-edit.component";
import {EstudiantesAddComponent} from "../../modulos/docente/estudiantes/estudiantes-add/estudiantes-add.component";
import {DirectoresAddComponent} from "../../modulos/super_usuario/directores/directores-add/directores-add.component";
import {DirectoresDeleteComponent} from "../../modulos/super_usuario/directores/directores-delete/directores-delete.component";
import {DirectoresEditComponent} from "../../modulos/super_usuario/directores/directores-edit/directores-edit.component";
import DirectorResponse from "../models/director_response.model";
import DocenteResponse from "../models/docente_response.model";
import SolicitudResponse from "../models/solicitud_response.model";
import {SolicitudesShowComponent} from "../../modulos/docente/solicitudes/solicitudes-show/solicitudes-show.component";
import {SolicitudesDeleteComponent} from "../../modulos/docente/solicitudes/solicitudes-delete/solicitudes-delete.component";
import EstudianteRequest from "../models/estudiante_request.model";
import {AutorizacionesApproveComponent} from "../../modulos/docente/autorizaciones/autorizaciones-approve/autorizaciones-approve.component";
import {AutorizacionesDeleteComponent} from "../../modulos/docente/autorizaciones/autorizaciones-delete/autorizaciones-delete.component";
import {AutorizacionesShowComponent} from "../../modulos/docente/autorizaciones/autorizaciones-show/autorizaciones-show.component";
import {LoadDataEstudianteComponent} from "../../modulos/docente/estudiantes/load-data-estudiante/load-data-estudiante.component";

@Injectable()
export class DialogService {

  constructor(
    private matDialog: MatDialog
  ) {
  }


  deleteFormularioDialog(idFormulario: number) {
    let dialogRef: MatDialogRef<FormulariosDeleteComponent>;
    dialogRef = this.matDialog.open(FormulariosDeleteComponent, {
      data: {idFormulario}
    });
    return dialogRef.afterClosed();
  }

  deleteProgramaDialog(idPrograma: number) {
    let dialogRef: MatDialogRef<ProgramasDeleteComponent>;
    dialogRef = this.matDialog.open(ProgramasDeleteComponent, {
      data: {idPrograma}
    });
    return dialogRef.afterClosed();
  }

  editProgramaDialog(programa: Programa) {
    let dialogRef: MatDialogRef<ProgramasEditComponent>;
    dialogRef = this.matDialog.open(ProgramasEditComponent, {
      data: {programa}
    });
    return dialogRef.afterClosed();
  }

  addProgramaDialog() {
    let dialogRef: MatDialogRef<ProgramasAddComponent>;
    dialogRef = this.matDialog.open(ProgramasAddComponent);
    return dialogRef.afterClosed();
  }

  deleteDocenteDialog(idDocente: number) {
    let dialogRef: MatDialogRef<DocentesDeleteComponent>;
    dialogRef = this.matDialog.open(DocentesDeleteComponent, {
      data: {idDocente}
    });
    return dialogRef.afterClosed();
  }

  editDocenteDialog(docenteResponse: DocenteResponse) {
    let dialogRef: MatDialogRef<DocentesEditComponent>;
    dialogRef = this.matDialog.open(DocentesEditComponent, {
      data: {docenteResponse}
    });
    return dialogRef.afterClosed();
  }

  addDocenteDialog() {
    let dialogRef: MatDialogRef<DocentesAddComponent>;
    dialogRef = this.matDialog.open(DocentesAddComponent);
    return dialogRef.afterClosed();
  }

  deleteEstudianteDialog(idEstudiante: number) {
    let dialogRef: MatDialogRef<EstudiantesDeleteComponent>;
    dialogRef = this.matDialog.open(EstudiantesDeleteComponent, {
      data: {idEstudiante}
    });
    return dialogRef.afterClosed();
  }

  editEstudianteDialog(estudiante: EstudianteRequest) {
    let dialogRef: MatDialogRef<EstudiantesEditComponent>;
    dialogRef = this.matDialog.open(EstudiantesEditComponent, {
      data: {estudiante}
    });
    return dialogRef.afterClosed();
  }

  addEstudianteDialog() {
    let dialogRef: MatDialogRef<EstudiantesAddComponent>;
    dialogRef = this.matDialog.open(EstudiantesAddComponent);
    return dialogRef.afterClosed();
  }

  loadDataEstudianteDialog() {
    let dialogRef: MatDialogRef<LoadDataEstudianteComponent>;
    dialogRef = this.matDialog.open(LoadDataEstudianteComponent);
    return dialogRef.afterClosed();
  }


  deleteDirectorDialog(idDirector: number) {
    let dialogRef: MatDialogRef<DirectoresDeleteComponent>;
    dialogRef = this.matDialog.open(DirectoresDeleteComponent, {
      data: {idDirector}
    });
    return dialogRef.afterClosed();
  }

  editDirectorDialog(directorResponse: DirectorResponse) {
    let dialogRef: MatDialogRef<DirectoresEditComponent>;
    dialogRef = this.matDialog.open(DirectoresEditComponent, {
      data: {directorResponse}
    });
    return dialogRef.afterClosed();
  }

  addDirectorDialog() {
    let dialogRef: MatDialogRef<DirectoresAddComponent>;
    dialogRef = this.matDialog.open(DirectoresAddComponent);
    return dialogRef.afterClosed();
  }

  showSolicitudDialog(idSolicitud: number) {
    let dialogRef: MatDialogRef<SolicitudesShowComponent>;
    dialogRef = this.matDialog.open(SolicitudesShowComponent, {
      data: {idSolicitud}
    });
    return dialogRef.afterClosed();
  }

  deleteSolicitudDialog(idSolicitud: number) {
    let dialogRef: MatDialogRef<SolicitudesDeleteComponent>;
    dialogRef = this.matDialog.open(SolicitudesDeleteComponent, {
      data: {idSolicitud}
    });
    return dialogRef.afterClosed();
  }


  approveAutorizacionDialog(idAutorizacion: number) {
    let dialogRef: MatDialogRef<AutorizacionesApproveComponent>;
    dialogRef = this.matDialog.open(AutorizacionesApproveComponent, {
      data: {idAutorizacion}
    });
    return dialogRef.afterClosed();
  }


  showAutorizacionDialog(idAutorizacion: any) {
    let dialogRef: MatDialogRef<AutorizacionesShowComponent>;
    dialogRef = this.matDialog.open(AutorizacionesShowComponent, {
      data: {idAutorizacion}
    });
    return dialogRef.afterClosed();
  }

  deleteAutorizacionDialog(idAutorizacion: number) {
    let dialogRef: MatDialogRef<AutorizacionesDeleteComponent>;
    dialogRef = this.matDialog.open(AutorizacionesDeleteComponent, {
      data: {idAutorizacion}
    });
    return dialogRef.afterClosed();
  }

}
