import {Component, Inject, OnInit} from '@angular/core';
import {AsesoriaServiceImpl} from "../../../../core/http/implement/asesoria.service.impl";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import Asesoria from "../../../../core/models/asesoria.model";
import Formulario from "../../../../core/models/formulario.model";
import {FormularioServiceImpl} from "../../../../core/http/implement/formulario.service.impl";

@Component({
  selector: 'app-asesorias-show',
  templateUrl: './asesorias-show.component.html',
  styleUrls: ['./asesorias-show.component.scss']
})
export class AsesoriaShowComponent implements OnInit {

  idAsesoria: number;

  loading: boolean;

  asesoria: Asesoria;

  formulario: Formulario;

  constructor(private asesoriaService: AsesoriaServiceImpl,
              public dialogRef: MatDialogRef<AsesoriaShowComponent>,
              private formularioService: FormularioServiceImpl,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.idAsesoria = data.idAsesoria;
    this.loading = false;
    this.asesoria = new Asesoria();
  }

  ngOnInit(): void {
  /**  this.loading = true;
    this.asesoriaService.get(this.idAsesoria+"").subscribe(
      (asesoria) => {
      this. asesoria = asesoria;
        this.formularioService.get(this.asesoria.id_formulario+"").subscribe( (formulario) =>{
          this.formulario = formulario;
          }
        )
      },
      (error) => {
      },
      ()=>{
        this.loading = false;
      });**/
  }

}
