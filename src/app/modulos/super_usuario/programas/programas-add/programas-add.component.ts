import {Component, OnInit} from '@angular/core';
import {ProgramaServiceImpl} from "../../../../core/http/implement/programa.service.impl";
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Programa from "../../../../core/models/programa.model";
import {ToasterService} from "../../../../core/services/toaster.service";

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
              private toasterService: ToasterService,
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
    this.dialogRef.close();
  }

  registrarPrograma(): void {
    this.loading = false;
    let newPrograma = <Programa>Object.assign({}, this.formAddPrograma.value);
    newPrograma.director = null;
    this.programaService.save(newPrograma).subscribe(
      () => {
        this.toasterService.openSnackBarCumtom(
          'Programa creado satisfactoriament',
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
