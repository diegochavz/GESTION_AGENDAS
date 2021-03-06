import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {DirectorServiceImpl} from "../../../../core/http/implement/director.service.impl";
import Director from "../../../../core/models/director.model";
import Programa from "../../../../core/models/programa.model";
import {ProgramaServiceImpl} from "../../../../core/http/implement/programa.service.impl";
import {ToasterService} from "../../../../core/services/toaster.service";

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
              private programaService: ProgramaServiceImpl,
              private toasterService: ToasterService) {
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
    this.dialogRef.close();
  }

  registrarDirector(): void {
    this.loading = false;
    let newDirector = <Director>Object.assign({}, this.formAddDirector.value);
    this.directorService.save(newDirector).subscribe(
      () => {
        this.toasterService.openSnackBarCumtom(
          'Director creado satisfactoriamente',
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
