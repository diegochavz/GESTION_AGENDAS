import {Component, Inject, OnInit} from '@angular/core';
import Horario from "../../../../core/models/horario.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EstudianteServiceImpl} from "../../../../core/http/implement/estudiante.service.impl";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToasterService} from "../../../../core/services/toaster.service";
import * as moment from "moment";
import {FormularioHelpsService} from "../../../../core/services/formulario_helps.service";

@Component({
  selector: 'app-edit-horarios',
  templateUrl: './edit-horarios.component.html',
  styleUrls: ['./edit-horarios.component.scss']
})
export class EditHorariosComponent implements OnInit {

  horario: Horario;
  listHorariosOcupados: Horario[];
  listHorarosAgregados: Horario[];
  formHorario: FormGroup;
  validadorTimeOut: any;
  constructor(private estudianteService: EstudianteServiceImpl,
              public dialogRef: MatDialogRef<EditHorariosComponent>,
              private _formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formularioHelps: FormularioHelpsService) {
    this.horario = data.horario;
    this.listHorariosOcupados = data.horariosOcupados;
    this.listHorarosAgregados = data.horariosAgregados;
  }

  ngOnInit(): void {
    this.crearFormHorario();
  }

  crearFormHorario() {
    this.formHorario = this._formBuilder.group({
      cruce: false,
      fecha_inicial: [moment(this.horario.fecha_inicial), [Validators.required]],
      fecha_final: [moment(this.horario.fecha_final), [Validators.required]],
      inicio_horario: [this.horario.inicio_horario, [Validators.required]],
      fin_horario: [this.horario.fin_horario, [Validators.required]],
      repeticion: this.horario.se_repite,
      lunes: false,
      martes: [false],
      miercoles: [false],
      jueves: [false],
      viernes: [false],
      sabado: [false],
      domingo: false,
    })

    //Validate select from week or day
    if (moment(this.horario.fecha_final).isBefore(moment(this.horario.fecha_inicial))) {
      this.formHorario.get('fecha_final').setValue(moment(this.horario.fecha_inicial));
      this.formHorario.get('repeticion').setValue(false);
    }

    this.formHorario.valueChanges.subscribe(res => {
      //Validación horas
      if (res.inicio_horario >= res.fin_horario) {
        this.formHorario.get('fin_horario').setErrors({'error': true})
      } else {
        this.formHorario.get('fin_horario').setErrors(null)
        this.formHorario.get('fin_horario').setValidators([Validators.required])
      }

      //validación fecha
      if (res.fecha_inicial > res.fecha_final && res.fecha_final !== '') {
        this.formHorario.get('fecha_final').setErrors({'error': true})
      } else {
        this.formHorario.get('fecha_final').setErrors(null)
        this.formHorario.get('fecha_final').setValidators([Validators.required])
      }

      if (res.fecha_inicial != '' && res.fecha_final != '' && res.inicio_horario != '' && res.fin_horario != '') {
        this.validadorTimeOut = setTimeout(() => {
          let auxHorario = new Horario();
          auxHorario.fecha_inicial = moment(res.fecha_inicial).format("YYYY-MM-DD");
          auxHorario.fecha_final = moment(res.fecha_final).format("YYYY-MM-DD");
          auxHorario.inicio_horario = res.inicio_horario;
          auxHorario.fin_horario = res.fin_horario;
          auxHorario.dias_semanas = this.getDias();

          this.formHorario.get('cruce').setValue(this.compareNewHorarioList(auxHorario))
          if (this.formHorario.get('cruce').value) {
            this.formHorario.get('cruce').setErrors({'error-cruce': true})
          } else {
            this.formHorario.get('cruce').setErrors(null)
          }


        }, 2000);
      }
    });

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

  getDias(): number[] {
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
    return aux;
  }

  compareNewHorarioList(horario: Horario): boolean {
    let listHorariosNew = this.formularioHelps.desglosarHorarios(horario);
    let totalList = this.listHorariosOcupados.concat(this.formularioHelps.sacarHorarioDeList(this.listHorarosAgregados, horario));
    for (let i = 0; i < listHorariosNew.length; i++) {
      for (let j = 0; j < totalList.length; j++) {
        if (this.formularioHelps.validarCruceFecha(listHorariosNew[i], this.formularioHelps.desglosarHorarios(totalList[j]))) {
          return true;
        }
      }
    }
    return false;
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

  getValidacion(): boolean {
    if (this.formHorario.get('repeticion').value == true) {
      if (this.getDias().length != 0) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  salir(): void {
    this.dialogRef.close(0);
  }

  eliminar():void{
    this.dialogRef.close(1);
  }

  editarHorario() {
    if (this.formHorario.valid) {
      if (this.formHorario.get('repeticion').value == true) {
        if (this.getDias().length != 0) {
          this.updateHorario();
        } else {
          return;
        }
      } else {
        this.updateHorario();
      }
    }
  }

  updateHorario() {
    let auxHorario = new Horario();
    auxHorario.fecha_inicial = moment(this.formHorario.get('fecha_inicial').value).format("YYYY-MM-DD")
    auxHorario.fecha_final = moment(this.formHorario.get('fecha_final').value).format("YYYY-MM-DD")
    auxHorario.inicio_horario = this.formHorario.get('inicio_horario').value
    auxHorario.fin_horario = this.formHorario.get('fin_horario').value
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
