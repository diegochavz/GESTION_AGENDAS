import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DirectorServiceImpl} from "../../../../core/http/implement/director.service.impl";
import DirectorResponse from "../../../../core/models/director_response.model";

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
    this.director = data.directorResponse;
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
    } else {
      this.formEditDirector = this._formBuilder.group({
        codigo_director: '',
        nombre: '',
        correo: '',
      });
    }
  }

  salir(): void {
    this.dialogRef.close(0);
  }

  editarDirector(): void {
    this.loading = false;
    this.director.usuario.nombre = this.formEditDirector.value.nombre;
    this.director.usuario.correo = this.formEditDirector.value.correo;
    this.director.codigo_director = this.formEditDirector.value.codigo_director;
    this.director.nombre = this.formEditDirector.value.nombre;;
    this.director.correo = this.formEditDirector.value.correo;;
    console.log(this.director)
    this.directorService.update(this.director.usuario.id,this.director).subscribe(
      () => {
        this.dialogRef.close(1);
      },
      (error) => {
        this.dialogRef.close(2);
      },
      () => {
        this.loading = true;
      });
  }
}
