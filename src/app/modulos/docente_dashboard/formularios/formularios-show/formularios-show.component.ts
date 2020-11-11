import {Component, Input, OnChanges, OnInit, SimpleChanges, Type, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Formulario from "../../../../core/models/formulario.model";
import Horario from "../../../../core/models/horario.model";
import {MatCalendar, MatCalendarCellClassFunction, MatCalendarCellCssClasses} from "@angular/material/datepicker";
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
import {Observable, Observer} from "rxjs";
import {CrearFormularioDocenteComponent} from "../formularios_add/formulario_add.component";

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

  @Input() showFormulario: Formulario;
  @Input() minDateCalendar: Date;
  @Input() maxDateCalendar: Date;

  formularioAddAsesoria: FormGroup;
  listHorariosDisponibles: Array<string>;
  loadFile: FileList;
  step = 0;
  selectedDate: Date;
  startAt: Date;

  constructor(private _adapter: DateAdapter<any>, private _formBuilder: FormBuilder) {
    this._adapter.setLocale('es');
    this.showFormulario = new Formulario();
    this.listHorariosDisponibles = [];
    this.selectedDate = new Date();
    this.startAt = new Date();
    this.minDateCalendar = new Date();
    this.maxDateCalendar = new Date();
  }


  ngOnInit(): void {
    this.crearFormAddAsesoria();
    this.agregarIntegrante();
  }

  /****INICIO: CARGA VALORES INICIALES**************************************/

  crearFormAddAsesoria() {
    this.formularioAddAsesoria = this._formBuilder.group({
      fecha_asesoría: ['', [Validators.required]],
      hora_asesoría: ['', [Validators.required]],
      preguntas: this._formBuilder.array([]),
      integrantes: this._formBuilder.array([]),
      file: '',
    })
  }

  /**Retorna la duración de cada asesoría**/
  get duracionAsesoria(): number {
    if (this.showFormulario != null && this.showFormulario != undefined) {
      return this.showFormulario.duracion;
    }
    return 0;
  }

  /**Retorna si el formulario permite carga de archivo**/
  get cargaArchivo(): boolean {
    if (this.showFormulario != null && this.showFormulario != undefined) {
      return this.showFormulario.carga_archivos;
    }
    return false;
  }

  /**Retorna el listado de preguntas elaboradas por el docente**/
  get listPreguntas(): Array<Pregunta> {
    if (this.showFormulario != null && this.showFormulario != undefined) {
      return this.showFormulario.preguntas;
    }
    return new Array<Pregunta>();
  }

  /****FIN: CARGA VALORES INICIALES**************************************/

  /****INICIO: CONFIGURACIÓN DEL CALENDARIO**************************************/

  /**Establecer limite inferior disponible del calendario
   establecerMinDateCalendario(): Date {
    console.log("Entre a min")
    if (this.showFormulario != null && this.showFormulario != undefined) {
      //Asinga una MinDate de acuerdo al especificado por el docente
      return new Date(this.showFormulario.disponibilidad_inicio_formulario);
    }
    //Asigna un MinDate en la fecha actual por defecto
    return new Date();
  }**/

  /**Establecer limite superior disponible del calendario
   establecerMaxDateCalendario(): Date {
    console.log("Entre a max")
    if (this.showFormulario != null && this.showFormulario != undefined) {
      //Asinga una MaxDate de acuerdo al especificado por el docente
      return new Date(this.showFormulario.disponibilidad_fin_formulario);
    }
    //Asigna un MaxDate en la fecha actual por defecto
    return new Date();
  }**/



  get establecerMaxDateCalendario(): Date {
    if (this.showFormulario != null && this.showFormulario != undefined) {
      return new Date(
        moment(this.showFormulario.disponibilidad_fin_formulario).year(),
        moment(this.showFormulario.disponibilidad_fin_formulario).month(),
        moment(this.showFormulario.disponibilidad_fin_formulario).date(),
      );
    } else {
      return new Date();
    }
    // return new Date(moment(new Date()).year(),moment(new Date()).month()+1, moment(new Date()).date());
  }

  get establecerMinDateCalendario(): Date {
    if (this.showFormulario != null && this.showFormulario != undefined) {
      console.log("Hola 2 " + moment(this.showFormulario.disponibilidad_inicio_formulario).year() +
        moment(this.showFormulario.disponibilidad_inicio_formulario).month() +
        moment(this.showFormulario.disponibilidad_inicio_formulario).date())
      return new Date(
        moment(this.showFormulario.disponibilidad_inicio_formulario).year(),
        moment(this.showFormulario.disponibilidad_inicio_formulario).month(),
        moment(this.showFormulario.disponibilidad_inicio_formulario).date(),
      );
    } else {
      console.log("Hola 3")
      return new Date();
    }

  }


  /**Establecer desde que mes se empezara a mostrar el calendario**/
  establecerStartAtCalendario(): Date {
    //Asigna un StartAt en la fecha actual por defecto
    return new Date();
  }

  /**Pinta de color diferente los días con disponibilidad de agenda en el calendario**/
  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      let listFechasDisponibles = this.fechasDisponibles();
      const highlightDate = listFechasDisponibles.map(str => new Date(str))
        .some(d => moment(d).date() === moment(date).date() && (moment(d).month()) === moment(date).month() && moment(d).year() === moment(date).year());
      return highlightDate ? 'example-custom-date-class' : '';
    };
  }

  /**Retorna un listado de días con disponibilidad de agenda en el calendario**/
  fechasDisponibles(): Array<Date> {
    const newFechasDisponibles = new Array<Date>()
    if (this.showFormulario != null && this.showFormulario != undefined) {
      if (this.showFormulario.horarios != null && this.showFormulario.horarios != undefined) {
        for (let i of this.showFormulario.horarios) {
          newFechasDisponibles.push(i.fecha_horario)
        }
      }
    }
    return newFechasDisponibles;
  }

  /****FIN: CONFIGURACIÓN DEL CALENDARIO**************************************/

  /****INICIO: CONFIGURACIÓN DE HORARIOS DE ATENCIÓN**************************************/

  /**Retorna en la variable global listHorariosDisponibles los horarios de disponibilidad de un día seleccionado**/
  onSelect(event) {
    console.log("Que esta pasando aquí")
    this.listHorariosDisponibles = [];
    this.selectedDate = event;
    /**
     if (this.showFormulario != null && this.showFormulario != undefined) {
      const horarios = this.showFormulario.horarios;
      if (horarios != undefined && horarios != null) {
        for (var i = 0; i < this.showFormulario.horarios.length; i++) {
          if ((moment(horarios[i].fecha_horario).date() == moment(event).date()) &&
            ((moment(horarios[i].fecha_horario).month()) == moment(event).month()) &&
            (moment(horarios[i].fecha_horario).year() == moment(event).year())) {
            this.listHorariosDisponibles.push(horarios[i].inicio_horario)
          }
        }
        console.log("----> "+  this.listHorariosDisponibles)
      }
    }
     **/
  }

  /**Contiene le horario de atención seleccionado por el estudiante**/
  selectedHorario(horario: string) {
  }

  /****FIN: CONFIGURACIÓN DE HORARIOS DE ATENCIÓN**************************************/

  /****INICIO: CONFIGURACIÓN DE INTEGRANTES**************************************/

  /***Retorna una lista de Formgroup de integrantes*/
  get integrantes(): FormArray {
    return this.formularioAddAsesoria.get('integrantes') as FormArray;
  }

  /***Crear un formgroup para un nuevo integrante en la lista de integrantes*/
  agregarIntegrante() {
    const newIntegrante = this._formBuilder.group({
      nombre: '',
      correo: '',
    });
    this.integrantes.push(newIntegrante);
  }

  /***Borra un formgroup de la lista de integrantes*/
  borrarIntegrante(indice: number) {
    this.integrantes.removeAt(indice)
  }

  /****FIN: CONFIGURACIÓN DE INTEGRANTES**************************************/


  /****INICIO: CONFIGURACIÓN DE PREGUNTAS**************************************/

  /***Retorna una lista  de preguntas*/
  get preguntas(): FormArray {
    return this.formularioAddAsesoria.get('preguntas') as FormArray;
  }

  /***Valida si la pregunta es de tipo CUADRO_TEXTO o COMBOBOX*/
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

  /***Valida si la pregunta es de tipo ALFANUMERICO o NUMERICO*/
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

  /**Crear un control por cada pregunta elaborada por el docente**/
  crearControlFormPregunta(index: number): number {
    this.preguntas.push(new FormControl());
    return index;
  }

  /**Permite almacenar un archivo cargado por el estudiante**/
  cargarArchivo(event): void {
    this.loadFile = event.target.files[0];
  }

  /****FIN: CONFIGURACIÓN DE PREGUNTAS**************************************/

  /****INICIO: CONFIGURACIÓN DE mat-expansion-panel**************************************/

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  /****FIN: CONFIGURACIÓN DE mat-expansion-panel**************************************/

}
