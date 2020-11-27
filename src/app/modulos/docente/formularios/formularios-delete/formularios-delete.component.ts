import {Component, Inject, OnInit} from '@angular/core';
import Asesoria from "../../../../core/models/solicitud.model";
import Formulario from "../../../../core/models/formulario.model";
import {SolicitudServiceImpl} from "../../../../core/http/implement/solicitud.service.impl";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormularioServiceImpl} from "../../../../core/http/implement/formulario.service.impl";

@Component({
  selector: 'app-formularios-delete',
  templateUrl: './formularios-delete.component.html',
  styleUrls: ['./formularios-delete.component.scss']
})
export class FormulariosDeleteComponent implements OnInit {

  loading: boolean;

  idFormulario: number;

  constructor(private formularioService: FormularioServiceImpl,
              public dialogRef: MatDialogRef<FormulariosDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(JSON.stringify(data))
    this.idFormulario = data.idFormulario;
    this.loading = true;
  }

  ngOnInit(): void {
  }

  salir(): void {
    this.dialogRef.close(false);
  }

  borrar():void{
    this.loading = false;
    console.log("id FORMULRIO -> " + this.idFormulario)
    this.formularioService.delete(this.idFormulario).subscribe(
      (res) => {
        console.log("uno",res)
        this.dialogRef.close(true);
      },
      (error) => {
        console.log("dos", JSON.stringify(error))
      },
      ()=>{
        this.loading = true;
      });
  }

}
