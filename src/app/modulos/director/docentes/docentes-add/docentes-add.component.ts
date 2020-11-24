import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Docente from "../../../../core/models/docente.model";
import Programa from "../../../../core/models/programa.model";
import {ProgramaServiceImpl} from "../../../../core/http/implement/programa.service.impl";
import {DocenteServiceImpl} from "../../../../core/http/implement/docente.service.impl";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-docentes-add',
  templateUrl: './docentes-add.component.html',
  styleUrls: ['./docentes-add.component.scss']
})
export class DocentesAddComponent implements OnInit {

  loading: boolean;

  formAddDocente: FormGroup;

  listProgramas: Array<Programa>;

  constructor(private programaService: ProgramaServiceImpl,
              private docenteService: DocenteServiceImpl,
              public dialogRef: MatDialogRef<DocentesAddComponent>,
              private _formBuilder: FormBuilder,) {
    this.listProgramas = [];
    this.loading = true;
  }


  ngOnInit(): void {
    this.formAddDocente = this._formBuilder.group({
      codigo_docente: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      programas: [null, [Validators.required]],
      correo: ['',[Validators.required]],
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

  registrarDocente(): void {
    this.loading = false;
    let newDocente = <Docente>Object.assign({}, this.formAddDocente.value);
    console.log(newDocente)
    this.docenteService.save(newDocente).subscribe(
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
