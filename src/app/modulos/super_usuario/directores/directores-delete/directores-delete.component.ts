import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DirectorServiceImpl} from "../../../../core/http/implement/director.service.impl";
import {ToasterService} from "../../../../core/services/toaster.service";

@Component({
  selector: 'app-directores-delete',
  templateUrl: './directores-delete.component.html',
  styleUrls: ['./directores-delete.component.scss']
})
export class DirectoresDeleteComponent implements OnInit {

  loading: boolean;

  idDirector: number;

  constructor(private directorService: DirectorServiceImpl,
              public dialogRef: MatDialogRef<DirectoresDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private toasterService: ToasterService) {
    this.idDirector = data.idDirector;
    this.loading = true;
  }


  ngOnInit(): void {
  }

  salir(): void {
    this.dialogRef.close();
  }

  borrar():void{
    this.loading = false;
    this.directorService.delete(this.idDirector).subscribe(
      () => {
        this.toasterService.openSnackBarCumtom(
          'Director eliminado satisfactoriamente',
          'success'
        )
      },
      (error) => {
        this.toasterService.openSnackBarCumtom(
          error,
          'error'
        )
        this.dialogRef.close()
      },
      ()=>{
        this.dialogRef.close();
        this.loading = true;
      });
  }

}
