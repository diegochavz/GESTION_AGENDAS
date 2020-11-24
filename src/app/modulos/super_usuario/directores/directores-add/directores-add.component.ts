import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {DirectorServiceImpl} from "../../../../core/http/implement/director.service.impl";
import Director from "../../../../core/models/director.model";

@Component({
  selector: 'app-directores-add',
  templateUrl: './directores-add.component.html',
  styleUrls: ['./directores-add.component.scss']
})
export class DirectoresAddComponent implements OnInit {

  loading: boolean;

  formAddDirector: FormGroup;

  constructor(private directorService: DirectorServiceImpl,
              public dialogRef: MatDialogRef<DirectoresAddComponent>,
              private _formBuilder: FormBuilder,) {
    this.loading = true;
  }

  ngOnInit(): void {
    this.formAddDirector = this._formBuilder.group({
      codigo_director: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      correo: ['',[Validators.required]],
    });
  }

  salir(): void {
    this.dialogRef.close(0);
  }

  registrarDirector(): void {
    this.loading = false;
    let newDirector = <Director>Object.assign({}, this.formAddDirector.value);
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
