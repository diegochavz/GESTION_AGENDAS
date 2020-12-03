import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DirectorServiceImpl} from "../../../../core/http/implement/director.service.impl";
import DirectorResponse from "../../../../core/models/director_response.model";
import Programa from "../../../../core/models/programa.model";
import {ProgramaServiceImpl} from "../../../../core/http/implement/programa.service.impl";
import {DocenteServiceImpl} from "../../../../core/http/implement/docente.service.impl";
import {ToasterService} from "../../../../core/services/toaster.service";
import Director from "../../../../core/models/director.model";

@Component({
  selector: 'app-directores-edit',
  templateUrl: './directores-edit.component.html',
  styleUrls: ['./directores-edit.component.scss']
})
export class DirectoresEditComponent implements OnInit {

  loading: boolean;

  formEditDirector: FormGroup;

  director: DirectorResponse;
  idDirector: number;

  listProgramas: Array<Programa>;

  constructor(private directorService: DirectorServiceImpl,
              public dialogRef: MatDialogRef<DirectoresEditComponent>,
              private _formBuilder: FormBuilder,
              private toasterService: ToasterService,
              private docenteService: DocenteServiceImpl,
              private programaService: ProgramaServiceImpl,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.loading = true;
    this.idDirector = data.idDirector;
    this.listProgramas = [];
  }

  ngOnInit(): void {
    this.getDirector();
    this.formEditDirector = this._formBuilder.group({
      codigo_director: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      programa: [{value: '', disabled: true}, [Validators.required]],
    });
    this.getProgramas();
  }

  getProgramas(){
    this.programaService.getAll().subscribe((res: Array<Programa>) => {
      this.listProgramas = res;
    });
  }

  getDirector() {
    this.loading = false;
    this.directorService.get(this.idDirector).subscribe((dir: DirectorResponse) => {
      this.director = dir;
    }, error => {
      this.toasterService.openSnackBarCumtom(error, 'error')
      this.loading = true;
    }, () => {
      this.loading = true;
      this.cargaDatosDirector();
    })
  }

  cargaDatosDirector() {
    this.formEditDirector.get('codigo_director').setValue(this.director.codigo_director);
    this.formEditDirector.get('nombre').setValue(this.director.usuario.nombre);
    this.formEditDirector.get('correo').setValue(this.director.usuario.correo);
    this.formEditDirector.get('programa').setValue(this.director.programas_data[0].id)
  }


  salir(): void {
    this.dialogRef.close();
  }

  editarDirector(): void {
    this.loading = false;
    let directorAux = new Director();
    directorAux.nombre = this.formEditDirector.value.nombre
    directorAux.codigo_director = this.formEditDirector.value.codigo_director
    directorAux.correo = this.formEditDirector.value.correo
    directorAux.programa = this.formEditDirector.getRawValue().programa
    this.directorService.update(this.director.usuario.id, directorAux).subscribe(
      () => {
        this.toasterService.openSnackBarCumtom(
          'Director actualizado satisfactoriamente',
          'success'
        )
      },
      (error) => {
        this.toasterService.openSnackBarCumtom(error, 'error')
        this.dialogRef.close();
        this.loading = true;
      },
      () => {
        this.dialogRef.close();
        this.loading = true;
      });
  }
}
