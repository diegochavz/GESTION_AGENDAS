import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {AuthenticationServiceImpl} from "../../../../core/http/implement/authentication.service.impl";
import {EstudianteServiceImpl} from "../../../../core/http/implement/estudiante.service.impl";

@Component({
  selector: 'app-load-data-estudiante',
  templateUrl: './load-data-estudiante.component.html',
  styleUrls: ['./load-data-estudiante.component.scss']
})
export class LoadDataEstudianteComponent implements OnInit {


  loading: boolean;

  loadMassive: boolean;

  file: File;

  constructor(public dialogRef: MatDialogRef<LoadDataEstudianteComponent>,
              private authenticationService: AuthenticationServiceImpl,
              private estudianteService: EstudianteServiceImpl) {
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
    this.dialogRef.close(0);
  }

  loadData(): void {
    this.loading = false;
    console.log(this.authenticationService.currentUserValue.user_id+"")
    console.log(this.authenticationService.currentUserValue.programas[0].id+""+"")
    let formData = new FormData();
    formData.append('archivo', this.file)
    formData.append('id_docente ', this.authenticationService.currentUserValue.user_id+"")
    formData.append('id_programa ',this.authenticationService.currentUserValue.programas[0].id+"")
    this.estudianteService.loadDataEstudiante(formData).subscribe(
      () => {
        this.dialogRef.close(1);
      },
      (error) => {
        this.dialogRef.close(2);
      },
      () => {
        this.loading = true;
      });
  }

}
