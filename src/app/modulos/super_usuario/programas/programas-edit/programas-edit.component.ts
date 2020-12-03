import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Programa from "../../../../core/models/programa.model";
import {ProgramaServiceImpl} from "../../../../core/http/implement/programa.service.impl";
import {DocenteServiceImpl} from "../../../../core/http/implement/docente.service.impl";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import DirectorResponse from "../../../../core/models/director_response.model";
import {DirectorServiceImpl} from "../../../../core/http/implement/director.service.impl";
import {ToasterService} from "../../../../core/services/toaster.service";

@Component({
  selector: 'app-programas-edit',
  templateUrl: './programas-edit.component.html',
  styleUrls: ['./programas-edit.component.scss']
})
export class ProgramasEditComponent implements OnInit {

  loading: boolean;

  formEditPrograma: FormGroup;

  programa: Programa;

  idPrograma:number;

  constructor(private programaService: ProgramaServiceImpl,
              public dialogRef: MatDialogRef<ProgramasEditComponent>,
              private _formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private toasterService: ToasterService) {
    this.loading = true;
    this.idPrograma = data.idPrograma;
  }

  ngOnInit(): void {
    this.formEditPrograma = this._formBuilder.group({
      codigo_programa: ['', [Validators.required]],
      nombre_programa: ['', [Validators.required]],
    });
    this.getPrograma();
  }

  getPrograma(){
    this.loading = false;
    this.programaService.get(this.idPrograma).subscribe((res:Programa)=>{
      this.programa = res;
    }, error =>{
      this.toasterService.openSnackBarCumtom(error,'error')
      this.loading = true;
    },()=>{
      this.cargaDatosPrograma();
      this.loading = true;
    })
  }

  cargaDatosPrograma() {
   this.formEditPrograma.get('codigo_programa').setValue(this.programa.codigo_programa)
   this.formEditPrograma.get('nombre_programa').setValue(this.programa.nombre_programa)
  }


  salir(): void {
    this.dialogRef.close();
  }

  editarPrograma(): void {
    this.loading = false;
    let editPrograma = <Programa>Object.assign({}, this.formEditPrograma.value);
    editPrograma.id = this.programa.id;
    this.programaService.update(editPrograma.id, editPrograma).subscribe(
      () => {
        this.toasterService.openSnackBarCumtom(
          'Programa actualizado satisfactoriamente',
          'success'
        )

      },
      (error) => {
        this.toasterService.openSnackBarCumtom(
          error,
          'error'
        )
        this.dialogRef.close();
        this.loading = true;
      },
      () => {
        this.dialogRef.close();
        this.loading = true;
      });
  }

}
