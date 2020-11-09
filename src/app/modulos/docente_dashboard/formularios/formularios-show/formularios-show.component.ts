import {Component, OnInit, Type, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormGroup} from "@angular/forms";
import Formulario from "../../../../core/models/formulario.model";
import Horario from "../../../../core/models/horario.model";
import {MatCalendarCellClassFunction, MatCalendarCellCssClasses} from "@angular/material/datepicker";

import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';

import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as moment from 'moment';

@Component({
  selector: 'app-formularios-show',
  templateUrl: './formularios-show.component.html',
  styleUrls: ['./formularios-show.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'ja-JP'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})
export class FormulariosShowComponent implements OnInit {


  formulario: Formulario;
  listHorariosDisponibles: Array<string>;
  fechasResaltar: Array<Date>;
  selectedDate = new Date('2020/09/12');
  startAt = new Date(2020, 1, 15);
  minDate = new Date(2020, 1, 15);
  maxDate = new Date(2020, 11, 20);
  year: any;
  DayAndDate: string;

  constructor(private _adapter: DateAdapter<any>) {
    this._adapter.setLocale('es');
    this.formulario = new Formulario();
    this.onSelect(this.selectedDate);
    this.listHorariosDisponibles = [];
    this.crearFormularioPrueba();
    this.fechasDisponibles();
  }

  ngOnInit(): void {
  }

  crearFormularioPrueba() {
    this.formulario = new Formulario();
    this.formulario.nombre_formulario = "Formulario de prueba";
    this.formulario.ubicacion_formulario = "SA 403";
    let date_1: Date = new Date(2020, 5, 1);
    let date_2: Date = new Date(2020, 5, 20);

    this.formulario.disponibilidad_fin_formulario = date_1;
    this.formulario.disponibilidad_fin_formulario = date_2;
    this.formulario.intervalo = 10;
    this.formulario.duracion = 15;
    this.formulario.restringe_estudiantes = false;
    this.formulario.restringe_otros_estudiantes = false;
    this.formulario.carga_archivos = false;

    let date_3: Date = new Date(2020, 10, 11);
    let date_4: Date = new Date(2020, 8, 18);
    let date_5: Date = new Date(2020, 2, 8);//
    let date_6: Date = new Date(2020, 9, 9);
    let date_7: Date = new Date(2020, 10, 10);
    let date_8: Date = new Date(2020, 11, 9);


    let horar: Array<Horario> = [
      {
        "fecha_horario": date_3,
        "inicio_horario": "13:50",
        "fin_horario": "18:00"
      },
      {
        fecha_horario: date_4,
        "inicio_horario": "14:50",
        "fin_horario": "18:00"
      },
      {
        fecha_horario: date_5,
        inicio_horario: "15:50",
        fin_horario: "18:00"
      },
      {
        "fecha_horario": date_6,
        "inicio_horario": "13:50",
        "fin_horario": "18:00"
      },
      {
        fecha_horario: date_7,
        "inicio_horario": "14:50",
        "fin_horario": "18:00"
      },
      {
        fecha_horario: date_8,
        inicio_horario: "15:50",
        fin_horario: "18:00"
      }
    ]
    this.formulario.horarios = horar;
  }

  fechasDisponibles() {
    this.fechasResaltar = new Array<Date>();
    if (this.formulario.horarios != null && this.formulario.horarios != undefined) {
      for (let i of this.formulario.horarios) {
        this.fechasResaltar.push(i.fecha_horario)
      }
    }
  }

  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      //console.log("día: " + moment(date).day() + "mes " + moment(date).month() + "año" + moment(date).year()  );
      const highlightDate = this.fechasResaltar.map(str => new Date(str.toDateString()))
        .some(d => moment(d).date() === moment(date).date() && (moment(d).month()) === moment(date).month() && moment(d).year() === moment(date).year());
      return highlightDate ? 'example-custom-date-class' : '';
    };
  }

  calcularHorariosDisponibles(fechaSeleccionada: Date) {
    const horarios = this.formulario.horarios;
    this.listHorariosDisponibles = [];
    if (horarios != undefined && horarios != null) {
      for (var i = 0; i < this.formulario.horarios.length; i++) {
        if ((horarios[i].fecha_horario.getDate() == fechaSeleccionada.getDate()) &&
          ((horarios[i].fecha_horario.getMonth()) == fechaSeleccionada.getMonth()) &&
          (horarios[i].fecha_horario.getFullYear() == fechaSeleccionada.getFullYear())) {
          this.listHorariosDisponibles.push(horarios[i].inicio_horario)
        }
      }
    }
  }


  onSelect(event) {
    this.selectedDate = event;
    //const dateSelected = this.convertDateCalendar(event.toDateString());
    //this.calcularHorariosDisponibles(new Date(event.toDateString()))
    /** const dateValue = dateString.split(' ');
     this.year = dateValue[3];
     this.DayAndDate = dateValue[0] + ',' + ' ' + dateValue[1] + ' ' + dateValue[2];
     **/
  }

  selectedHorario(horario: string) {
    console.log("selected: " + horario)
  }

  /****PRUEBAS EXPAN********/
  step = 0;

  setStep(index
            :
            number
  ) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }


}
