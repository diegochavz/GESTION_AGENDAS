import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {AuthenticationServiceImpl} from "../../../../core/http/implement/authentication.service.impl";
import {ToasterService} from "../../../../core/services/toaster.service";
import {ProgramaServiceImpl} from "../../../../core/http/implement/programa.service.impl";

@Component({
  selector: 'app-load-data-programa',
  templateUrl: './load-data-programa.component.html',
  styleUrls: ['./load-data-programa.component.scss']
})
export class LoadDataProgramaComponent implements OnInit {

  loading: boolean;

  loadMassive: boolean;

  file: File;


  constructor(public dialogRef: MatDialogRef<LoadDataProgramaComponent>,
              private authenticationService: AuthenticationServiceImpl,
              private programaService: ProgramaServiceImpl,
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

    this.programaService.loadDataProgramas(formData).subscribe(
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
