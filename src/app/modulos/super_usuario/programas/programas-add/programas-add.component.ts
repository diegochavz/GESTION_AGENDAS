import {Component, OnInit} from '@angular/core';
import {ProgramaServiceImpl} from "../../../../core/http/implement/programa.service.impl";
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Programa from "../../../../core/models/programa.model";
import {DirectorServiceImpl} from "../../../../core/http/implement/director.service.impl";
import DirectorResponse from "../../../../core/models/director_response.model";

@Component({
  selector: 'app-programas-add',
  templateUrl: './programas-add.component.html',
  styleUrls: ['./programas-add.component.scss']
})
export class ProgramasAddComponent implements OnInit {

  loading: boolean;

  formAddPrograma: FormGroup;

  constructor(private programaService: ProgramaServiceImpl,
              public dialogRef: MatDialogRef<ProgramasAddComponent>,
              private _formBuilder: FormBuilder,) {
    this.loading = true;
  }

  ngOnInit(): void {
    this.formAddPrograma = this._formBuilder.group({
      codigo_programa: ['', [Validators.required]],
      nombre_programa: ['', [Validators.required]],
    });
  }

  salir(): void {
    this.dialogRef.close(0);
  }

  registrarPrograma(): void {
    this.loading = false;
    let newPrograma = <Programa>Object.assign({}, this.formAddPrograma.value);
    newPrograma.director = null;
    console.log(JSON.stringify(newPrograma))
    this.programaService.save(newPrograma).subscribe(
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
