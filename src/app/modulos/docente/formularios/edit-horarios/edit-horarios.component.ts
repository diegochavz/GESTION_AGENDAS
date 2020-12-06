import {Component, Inject, OnInit} from '@angular/core';
import Horario from "../../../../core/models/horario.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EstudianteServiceImpl} from "../../../../core/http/implement/estudiante.service.impl";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToasterService} from "../../../../core/services/toaster.service";
import * as moment from "moment";

@Component({
  selector: 'app-edit-horarios',
  templateUrl: './edit-horarios.component.html',
  styleUrls: ['./edit-horarios.component.scss']
})
export class EditHorariosComponent implements OnInit {

  horario: Horario;

  formHorario: FormGroup;

  constructor(private estudianteService: EstudianteServiceImpl,
              public dialogRef: MatDialogRef<EditHorariosComponent>,
              private _formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.horario = data.horario;
  }

  ngOnInit(): void {
    this.crearFormHorario();
  }

  crearFormHorario() {
    this.formHorario = this._formBuilder.group({
      fecha_inicio: [moment(this.horario.fecha_inicio), [Validators.required]],
      fecha_fin: [moment(this.horario.fecha_fin), [Validators.required]],
      hora_inicio: [this.horario.hora_inicio, [Validators.required]],
      hora_fin: [this.horario.hora_fin, [Validators.required]],
      repeticion: this.horario.se_repite,
      lunes: false,
      martes: [false],
      miercoles: [false],
      jueves: [false],
      viernes: [false],
      sabado: [false],
      domingo: false,
    })
    this.configuracionControlsDias();
  }

  configuracionControlsDias() {
    if (!this.formHorario.get('repeticion').value) {
      this.formHorario.get('lunes').disable();
      this.formHorario.get('martes').disable();
      this.formHorario.get('miercoles').disable();
      this.formHorario.get('jueves').disable();
      this.formHorario.get('viernes').disable();
      this.formHorario.get('sabado').disable();
      this.formHorario.get('domingo').disable();
    } else {
      this.marcarDias();
    }

    this.formHorario.get('repeticion').valueChanges.subscribe((res: boolean) => {
      if (res) {
        this.formHorario.get('lunes').enable();
        this.formHorario.get('martes').enable();
        this.formHorario.get('miercoles').enable();
        this.formHorario.get('jueves').enable();
        this.formHorario.get('viernes').enable();
        this.formHorario.get('sabado').enable();
        this.formHorario.get('domingo').enable();
      } else {
        this.formHorario.get('lunes').setValue(false);
        this.formHorario.get('lunes').disable();
        this.formHorario.get('martes').setValue(false);
        this.formHorario.get('martes').disable();
        this.formHorario.get('miercoles').setValue(false);
        this.formHorario.get('miercoles').disable();
        this.formHorario.get('jueves').setValue(false);
        this.formHorario.get('jueves').disable();
        this.formHorario.get('viernes').setValue(false);
        this.formHorario.get('viernes').disable();
        this.formHorario.get('sabado').setValue(false);
        this.formHorario.get('sabado').disable();
        this.formHorario.get('domingo').setValue(false);
        this.formHorario.get('domingo').disable();
      }
    })
  }

  marcarDias(){
    for(let i = 0; i<this.horario.dias_semanas.length;i++){
       switch(this.horario.dias_semanas[i]){
         case 0:
           this.formHorario.get('domingo').setValue(true);
           break;
         case 1:
           this.formHorario.get('lunes').setValue(true);
           break;
         case 2:
           this.formHorario.get('martes').setValue(true);
           break;
         case 3:
           this.formHorario.get('miercoles').setValue(true);
           break;
         case 4:
           this.formHorario.get('jueves').setValue(true);
           break;
         case 5:
           this.formHorario.get('viernes').setValue(true);
           break;
         case 6:
           this.formHorario.get('sabado').setValue(true);
           break;
       }
    }
  }

  salir(): void {
    this.dialogRef.close(0);
  }

  eliminar():void{
    this.dialogRef.close(1);
  }

  actualizarHorario() {
    let auxHorario = new Horario();
    auxHorario.fecha_inicio = moment(this.formHorario.get('fecha_inicio').value).format("YYYY-MM-DD")
    auxHorario.fecha_fin = moment(this.formHorario.get('fecha_fin').value).format("YYYY-MM-DD")
    auxHorario.hora_inicio = this.formHorario.get('hora_inicio').value
    auxHorario.hora_fin = this.formHorario.get('hora_fin').value
    auxHorario.se_repite = this.formHorario.get('repeticion').value
    if (auxHorario.se_repite) {
      let aux = [];
      if (this.formHorario.get('domingo').value) {
        aux.push(0)
      }
      if (this.formHorario.get('lunes').value) {
        aux.push(1)
      }
      if (this.formHorario.get('martes').value) {
        aux.push(2)
      }
      if (this.formHorario.get('miercoles').value) {
        aux.push(3)
      }
      if (this.formHorario.get('jueves').value) {
        aux.push(4)
      }
      if (this.formHorario.get('viernes').value) {
        aux.push(5)
      }
      if (this.formHorario.get('sabado').value) {
        aux.push(6)
      }
      auxHorario.dias_semanas = aux;
    }
    this.dialogRef.close(auxHorario);
  }
}
