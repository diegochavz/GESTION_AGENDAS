import {Component, OnInit} from '@angular/core';
import {ProgramaServiceImpl} from "../../../../core/http/implement/programa.service.impl";
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Programa from "../../../../core/models/programa.model";
import Docente from "../../../../core/models/docente.model";
import {DocenteServiceImpl} from "../../../../core/http/implement/docente.service.impl";

@Component({
  selector: 'app-programas-add',
  templateUrl: './programas-add.component.html',
  styleUrls: ['./programas-add.component.scss']
})
export class ProgramasAddComponent implements OnInit {

  loading: boolean;

  formAddPrograma: FormGroup;

  listDocentes: Array<Docente>;

  constructor(private programaService: ProgramaServiceImpl,
              private docenteService: DocenteServiceImpl,
              public dialogRef: MatDialogRef<ProgramasAddComponent>,
              private _formBuilder: FormBuilder,) {
    this.listDocentes = [];
    this.loading = false;
  }

  ngOnInit(): void {
    this.formAddPrograma = this._formBuilder.group({
      codigo_programa: ['', [Validators.required]],
      nombre_programa: ['', [Validators.required]],
      director: [null, [Validators.required]],
    });
    this.listarDocentes();
  }

  listarDocentes() {
    this.listDocentes = [];
    this.docenteService.getAll().subscribe((res: Array<Docente>)=>{
      this.listDocentes = res;
      console.log(JSON.stringify(res))
    })
  }

  salir(): void {
    this.dialogRef.close(false);
  }

  registrarPrograma(): void {
    this.loading = false;
    let newPrograma = <Programa>Object.assign({}, this.formAddPrograma.value);
    console.log(newPrograma)
    this.programaService.save(newPrograma).subscribe(
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
