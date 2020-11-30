import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DirectorServiceImpl} from "../../../../core/http/implement/director.service.impl";
import DirectorResponse from "../../../../core/models/director_response.model";
import Programa from "../../../../core/models/programa.model";
import {ProgramaServiceImpl} from "../../../../core/http/implement/programa.service.impl";
import {DocenteServiceImpl} from "../../../../core/http/implement/docente.service.impl";
import {ToasterService} from "../../../../core/services/toaster.service";

@Component({
  selector: 'app-directores-edit',
  templateUrl: './directores-edit.component.html',
  styleUrls: ['./directores-edit.component.scss']
})
export class DirectoresEditComponent implements OnInit {

  loading: boolean;

  formEditDirector: FormGroup;

  director: DirectorResponse;

  listProgramas: Array<Programa>;

  constructor(private directorService: DirectorServiceImpl,
              public dialogRef: MatDialogRef<DirectoresEditComponent>,
              private _formBuilder: FormBuilder,
              private toasterService: ToasterService,
              private docenteService: DocenteServiceImpl,
              private programaService: ProgramaServiceImpl,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.loading = true;
    this.director = data.directorResponse;
    console.log(this.director)
    this.listProgramas = [];
  }

  ngOnInit(): void {
    this.cargaDatosDirector();
  }

  cargaDatosDirector() {
    if (this.director != null && this.director != undefined) {
      this.formEditDirector = this._formBuilder.group({
        codigo_director: [this.director.codigo_director, [Validators.required]],
        nombre: [this.director.usuario.nombre, [Validators.required]],
        correo: [this.director.usuario.correo, [Validators.required]],
        programa: ['', [Validators.required]],
      });
      this.programaService.getAll().subscribe((res: Array<Programa>) => {
        console.log(res)
        this.listProgramas = res;
      }, () => {
      }, () => {
        console.log(this.director.programas_data[0].id)
        this.formEditDirector.get('programa').setValue(this.director.programas_data[0].id)
      })
    } else {
      this.formEditDirector = this._formBuilder.group({
        codigo_director: '',
        nombre: '',
        correo: '',
      });
    }
  }


  salir(): void {
    this.dialogRef.close();
  }

  editarDirector(): void {
    this.loading = false;
    this.director.usuario.nombre = this.formEditDirector.value.nombre;
    this.director.usuario.correo = this.formEditDirector.value.correo;
    this.director.codigo_director = this.formEditDirector.value.codigo_director;
    this.director.nombre = this.formEditDirector.value.nombre;
    this.director.correo = this.formEditDirector.value.correo;
    this.director.programa = this.formEditDirector.value.programa
    console.log(this.director)
    this.directorService.update(this.director.usuario.id, this.director).subscribe(
      () => {
        this.toasterService.openSnackBarCumtom(
          'Director actualizado satisfactoriamente',
          'success'
        )
      },
      (error) => {
        this.toasterService.openSnackBarCumtom(
          error,
          'error'
        )
        this.dialogRef.close();
      },
      () => {
        this.dialogRef.close();
        this.loading = true;
      });
  }
}
