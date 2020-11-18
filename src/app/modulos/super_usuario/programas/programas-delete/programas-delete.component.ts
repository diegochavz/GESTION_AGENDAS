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
    this.dialogRef.close(false);
  }

  borrar():void{
    this.loading = false;
    this.programaService.delete(this.idPrograma).subscribe(
      () => {
        this.dialogRef.close(true);
      },
      (error) => {},
      ()=>{
        this.loading = true;
      });
  }
}
