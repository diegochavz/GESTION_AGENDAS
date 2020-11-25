import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProgramaServiceImpl} from "../../../../core/http/implement/programa.service.impl";

@Component({
  selector: 'app-programas-delete',
  templateUrl: './programas-delete.component.html',
  styleUrls: ['./programas-delete.component.scss']
})
export class ProgramasDeleteComponent implements OnInit {

  loading: boolean;

  idPrograma: number;

  constructor(private programaService: ProgramaServiceImpl,
              public dialogRef: MatDialogRef<ProgramasDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.idPrograma = data.idPrograma;
    this.loading = true;
  }

  ngOnInit(): void {
  }

  salir(): void {
    this.dialogRef.close(0);
  }

  borrar():void{
    this.loading = false;
    console.log(this.idPrograma)
    this.programaService.delete(this.idPrograma).subscribe(
      () => {
        this.dialogRef.close(1);
      },
      (error) => {
        console.log(JSON.stringify(error))
        this.dialogRef.close(2);
      },
      ()=>{
        this.loading = true;
      });
  }
}
