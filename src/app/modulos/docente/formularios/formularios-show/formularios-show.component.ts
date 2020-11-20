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
})
export class FormulariosShowComponent implements OnInit {

  //Datos del formularios a exponer en el step
  @Input() showFormulario: Formulario;
  @Input() minDateCalendar: Date;
  @Input() maxDateCalendar: Date;

  startAt: Date;

  //Form
  formularioAddAsesoria: FormGroup;
  listHorariosDisponibles: Array<Horario>;

  //Archivo cargado por el estudiante
  loadFile: FileList;
  step = 0;

  programas: string;

  constructor(private _adapter: DateAdapter<any>, private _formBuilder: FormBuilder) {
    this._adapter.setLocale('es');
    this.showFormulario = new Formulario();
    this.listHorariosDisponibles = [];
    this.startAt = new Date();
    this.minDateCalendar = new Date();
    this.maxDateCalendar = new Date();
    this.programas = '';
  }


  ngOnInit(){
    this.getProgramasNames();
    this.crearFormAddAsesoria();
    this.agregarIntegrante();
  }

  /****CARGA VALORES INICIALES***/

  getProgramasNames() {
    /**if (this.showFormulario != null && this.showFormulario != undefined) {
      let size = this.showFormulario.programas.length - 1;
      for (let i = 0; i < size; i = i++) {
        this.programas += this.showFormulario.programas[i].nombre_programa + ", ";
      }
      this.programas += this.showFormulario.programas[size - 1].nombre_programa;
    }
     ESTO CAMBIA DEBIDO A QUE AHORA SOLO RECIBO LOS CODIGOS
     **/
  }

  crearFormAddAsesoria() {
    this.formularioAddAsesoria = this._formBuilder.group({
      fecha_asesoría: ['', [Validators.required]],
      hora_asesoría: ['', [Validators.required]],
      preguntas: this._formBuilder.array([]),
      integrantes: this._formBuilder.array([]),
      file: '',
      lugar: false,
    })
  }

  get duracionAsesoria(): number {
    if (this.showFormulario != null && this.showFormulario != undefined) {
      return this.showFormulario.duracion;
    }
    return 0;
  }

  get nombreformularioAsesoria(): string {
    if (this.showFormulario != null && this.showFormulario != undefined) {
      return this.showFormulario.nombre_formulario;
    }
    return '';
  }

  get cargaArchivo(): boolean {
    if (this.showFormulario != null && this.showFormulario != undefined) {
      return this.showFormulario.carga_archivos;
    }
    return false;
  }

  get lugarPreencial(): string {
    if (this.showFormulario != null && this.showFormulario != undefined) {
      return this.showFormulario.ubicacion_formulario + "";
    }
    return '';
  }

  get listPreguntas(): Array<Pregunta> {
    if (this.showFormulario != null && this.showFormulario != undefined) {
      return this.showFormulario.preguntas;
    }
    return new Array<Pregunta>();
  }

  /****CONFIGURACIÓN DEL CALENDARIO***/

  //Personalización de días en el calendar
  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      let listFechasDisponibles = this.fechasDisponibles();
      const highlightDate = listFechasDisponibles.some(d => moment(d).date() === moment(date).date() && moment(d).month() === moment(date).month() && moment(d).year() === moment(date).year());
      return highlightDate ? 'example-custom-date-class' : '';
    };
  }

  fechasDisponibles(): Array<Date> {
    const newFechasDisponibles = new Array<Date>()
    if (this.showFormulario != null && this.showFormulario != undefined) {
      if (this.showFormulario.horarios != null && this.showFormulario.horarios != undefined) {
        for (let i of this.showFormulario.horarios) {
          let dateAux = i.fecha_horario.split("-");
          let newD = new Date(+dateAux[0],(+dateAux[1]-1),+dateAux[2])
          newFechasDisponibles.push(newD);
        }
      }
    }
    return newFechasDisponibles;
  }

  /****CONFIGURACIÓN DE HORARIOS DE ATENCIÓN***/

  onSelect(event) {
    this.calcularHorariosDisponibles(event);
  }

  calcularHorariosDisponibles(fechaSeleccionada: Date) {
    this.listHorariosDisponibles = [];
    if (this.showFormulario != null && this.showFormulario != undefined) {
      const horarios = this.showFormulario.horarios;
      if (horarios != undefined && horarios != null) {
        for (var i = 0; i < horarios.length; i++) {
          let dateAux = horarios[i].fecha_horario.split("-");
          let newD = new Date(+dateAux[0],(+dateAux[1]-1),+dateAux[2])
          if ((moment(newD).date() == moment(fechaSeleccionada).date()) &&
            ((moment(newD).month()) == moment(fechaSeleccionada).month()) &&
            (moment(newD).year() == moment(fechaSeleccionada).year())) {
            this.listHorariosDisponibles.push(horarios[i])
          }
        }
      }
    }
  }

  selectedHorario(horario: string) {
  }

  /****CONFIGURACIÓN DE INTEGRANTES***/

  get integrantes(): FormArray {
    return this.formularioAddAsesoria.get('integrantes') as FormArray;
  }

  agregarIntegrante() {
    const newIntegrante = this._formBuilder.group({
      nombre: '',
      correo: '',
    });
    this.integrantes.push(newIntegrante);
  }

  borrarIntegrante(indice: number) {
    this.integrantes.removeAt(indice)
  }

  /****CONFIGURACIÓN DE PREGUNTAS***/

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

  crearControlFormPregunta(index: number): number {
    this.preguntas.push(new FormControl());
    return index;
  }

  cargarArchivo(event): void {
    this.loadFile = event.target.files[0];
  }

  /****CONFIGURACIÓN DE mat-expansion-panel***/

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

}
