import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {DirectorServiceImpl} from "../../../../core/http/implement/director.service.impl";
import Director from "../../../../core/models/director.model";
import Programa from "../../../../core/models/programa.model";
import {ProgramaServiceImpl} from "../../../../core/http/implement/programa.service.impl";

@Component({
  selector: 'app-directores-add',
  templateUrl: './directores-add.component.html',
  styleUrls: ['./directores-add.component.scss']
})
export class DirectoresAddComponent implements OnInit {

  loading: boolean;

  formAddDirector: FormGroup;

  listProgramas: Array<Programa>;

  constructor(private directorService: DirectorServiceImpl,
              public dialogRef: MatDialogRef<DirectoresAddComponent>,
              private _formBuilder: FormBuilder,
              private programaService: ProgramaServiceImpl) {
    this.loading = true;
    this.listProgramas = [];
  }

  ngOnInit(): void {
    this.formAddDirector = this._formBuilder.group({
      codigo_director: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      correo: ['',[Validators.required]],
      programa: [null, [Validators.required]],
    });
    this.listarProgramas();
  }

  listarProgramas(){
    this.listProgramas = [];
    this.programaService.getAll().subscribe((res:Array<Programa>)=>{
      this.listProgramas = res;
    })
  }

  salir(): void {
    this.dialogRef.close(0);
  }

  registrarDirector(): void {
    this.loading = false;
    let newDirector = <Director>Object.assign({}, this.formAddDirector.value);
    let aux = new Array<number>();
    aux.push(this.formAddDirector.value.programa)
    newDirector.programas = aux;
    console.log(newDirector)
    this.directorService.save(newDirector).subscribe(
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
