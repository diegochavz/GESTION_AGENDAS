import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {AuthenticationServiceImpl} from "../../../../core/http/implement/authentication.service.impl";
import {EstudianteServiceImpl} from "../../../../core/http/implement/estudiante.service.impl";
import {ToasterService} from "../../../../core/services/toaster.service";
import {DocenteServiceImpl} from "../../../../core/http/implement/docente.service.impl";

@Component({
  selector: 'app-load-data-docente',
  templateUrl: './load-data-docente.component.html',
  styleUrls: ['./load-data-docente.component.scss']
})
export class LoadDataDocenteComponent implements OnInit {

  loading: boolean;

  loadMassive: boolean;

  file: File;

  constructor(public dialogRef: MatDialogRef<LoadDataDocenteComponent>,
              private authenticationService: AuthenticationServiceImpl,
              private docenteService: DocenteServiceImpl,
              private toasterService: ToasterService,) {
    this.loadMassive = false;
    this.file = null;
  }

  ngOnInit(): void {
    this.loading = true;
  }

  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length == 1) {
      this.loadMassive = true;
      this.file = target.files[0]
    } else {
      this.loadMassive = false;
    }
  }

  salir(): void {
    this.dialogRef.close();
  }

  loadData(): void {
    this.loading = false;
    let formData = new FormData();
    formData.append('archivo', this.file)
    console.log(this.authenticationService.currentUserValue.programas[0].id);
    formData.append('id_programa ',this.authenticationService.currentUserValue.programas[0].id+"")
    this.docenteService.loadDataDocente(formData).subscribe(
      () => {
        this.toasterService.openSnackBarCumtom(
          'Importación realizada satisfactoriamente',
          'success')
        this.dialogRef.close();
      },
      (error) => {
        this.toasterService.openSnackBarCumtom(
          error,
          'error')
        this.dialogRef.close();
      },
      () => {
        this.loading = true;
      });
  }

}
