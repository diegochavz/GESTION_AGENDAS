import {Component, OnInit, Type, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Formulario from "../../../../core/models/formulario.model";
import Horario from "../../../../core/models/horario.model";
import {MatCalendarCellClassFunction, MatCalendarCellCssClasses} from "@angular/material/datepicker";
import {TIPO_DATO} from "../../../../core/constants/tipo_dato.constants";
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';

import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as moment from 'moment';
import {TIPO_CAMPO} from "../../../../core/constants/tipo_campo.constants";
import Pregunta from "../../../../core/models/pregunta.model";

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

  formularioAddAsesoria: FormGroup;
  formulario: Formulario;
  listHorariosDisponibles: Array<string>;
  listPreguntas: Array<Pregunta>;
  fechasResaltar: Array<Date>;
  selectedDate = new Date('2020/09/12');
  startAt = new Date(2020, 1, 15);
  minDate = new Date(2020, 1, 15);
  maxDate = new Date(2020, 11, 20);
  year: any;
  DayAndDate: string;

  constructor(private _adapter: DateAdapter<any>, private _formBuilder: FormBuilder) {
    this._adapter.setLocale('es');
    this.formulario = new Formulario();
    this.onSelect(this.selectedDate);
    this.listHorariosDisponibles = [];
    this.listPreguntas = [];
    this.crearFormularioPrueba();
    this.fechasDisponibles();
  }

  ngOnInit(): void {
    this.formularioAddAsesoria = this._formBuilder.group({
      fecha_asesoría: ['', [Validators.required]],
      hora_asesoría: ['', [Validators.required]],
      preguntas: this._formBuilder.array([]),
      integrantes: this._formBuilder.array([]),
    })
  }

  get preguntas(): FormArray {
    return this.formularioAddAsesoria.get('preguntas') as FormArray;
  }

  validarIsTipoCampo(tipoCampo: string): number {
    let response;
    switch (tipoCampo) {
      case TIPO_CAMPO.CUADRO_TEXTO:
        response = 0;
        break;
      case TIPO_CAMPO.COMBOBOX:
        response = 1;
        break
    }
    return response;
  }

  validarIsTipoDato(tipoDato: string): number {
    let response;
    switch (tipoDato) {
      case TIPO_DATO.ALFANUMERICO:
        response = 0;
        break;
      case TIPO_DATO.NUMERICO:
        response = 1;
        break
    }
    return response;
  }

  crearControlForm(index: number): number {
      this.preguntas.push( new FormControl());
    return index;
  }

  /***********************************************/

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

    let pregunt: Array<Pregunta> = [
      {
        nombre_campo: "Nombre estudiante",
        tipo_campo: TIPO_CAMPO.CUADRO_TEXTO,
        tipo_dato: TIPO_DATO.ALFANUMERICO,
        longitud: 100,
        obligatorio: true,
        selecciones: [],
      },
      {
        nombre_campo: "Materias",
        tipo_campo: TIPO_CAMPO.COMBOBOX,
        tipo_dato: "",
        longitud: 0,
        obligatorio: true,
        selecciones: ["Materia 1", "Materia 2", "Materia 3", "Materia 4"],
      },
      {
        nombre_campo: "campos prueba",
        tipo_campo: TIPO_CAMPO.CUADRO_TEXTO,
        tipo_dato: TIPO_DATO.NUMERICO,
        longitud: 4,
        obligatorio: false,
        selecciones: [],
      },
      {
        nombre_campo: "un select de cada",
        tipo_campo: TIPO_CAMPO.COMBOBOX,
        tipo_dato: "",
        longitud: 0,
        obligatorio: false,
        selecciones: ["SIIII", "NOOOO"],
      }
    ]

    this.formulario.preguntas = pregunt;
    this.listPreguntas = pregunt;



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
