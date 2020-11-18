import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import Director from "../../../../core/models/director.model";
import {DirectorServiceImpl} from "../../../../core/http/implement/director.service.impl";
import DirectorResponse from "../../../../core/models/director_response.model";
import {Direct} from "protractor/built/driverProviders";

@Component({
  selector: 'app-directores-edit',
  templateUrl: './directores-edit.component.html',
  styleUrls: ['./directores-edit.component.scss']
})
export class DirectoresEditComponent implements OnInit {

  loading: boolean;

  formEditDirector: FormGroup;

  director: DirectorResponse;

  constructor(private directorService: DirectorServiceImpl,
              public dialogRef: MatDialogRef<DirectoresEditComponent>,
              private _formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.loading = true;
    this.director = data.DirectorResponse;
  }

  ngOnInit(): void {
    this.cargaDatosDirector();
  }

  cargaDatosDirector() {
    if (this.director != null && this.director != undefined) {
      this.formEditDirector = this._formBuilder.group({
        codigo_director: [this.director.codigo_director, [Validators.required]],
        nombre: [this.director.usuario.nombre, [Validators.required]],
        correo: [this.director.usuario.correo,[Validators.required]],
      });
    }
  }

  salir(): void {
    this.dialogRef.close(false);
  }

  editarDirector(): void {
    this.loading = false;
    let editDirector = new DirectorResponse();
    editDirector.usuario.id = this.director.usuario.id;
    editDirector.usuario.nombre = this.director.usuario.nombre;
    editDirector.usuario.correo = this.director.usuario.correo;
    editDirector.codigo_director = this.director.codigo_director;
    console.log(editDirector)
    this.directorService.update(editDirector.usuario.id,editDirector).subscribe(
      () => {
        this.dialogRef.close(true);
      },
      (error) => {
      },
      () => {
        this.loading = true;
      });
  }
}
