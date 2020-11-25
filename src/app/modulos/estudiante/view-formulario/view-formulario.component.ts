import {Component, Input, OnChanges, OnInit, SimpleChanges, Type, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Horario from "../../../core/models/horario.model";
import {MatCalendar, MatCalendarCellClassFunction, MatCalendarCellCssClasses} from "@angular/material/datepicker";
import {TIPO_DATO} from "../../../core/constants/tipo_dato.constants";
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';

import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as moment from 'moment';
import {TIPO_CAMPO} from "../../../core/constants/tipo_campo.constants";
import Pregunta from "../../../core/models/pregunta.model";
import {Observable, Observer} from "rxjs";
import {CrearFormularioDocenteComponent} from "../../docente/formularios/formularios_add/formulario_add.component";
import {ActivatedRoute, Router} from "@angular/router";
import {DocenteServiceImpl} from "../../../core/http/implement/docente.service.impl";
import {FormularioServiceImpl} from "../../../core/http/implement/formulario.service.impl";
import FormularioResponse from "../../../core/models/formulario_response.model";
import DocenteResponse from "../../../core/models/docente_response.model";
import Formulario from "../../../core/models/formulario.model";
import {SolicitudServiceImpl} from "../../../core/http/implement/solicitud.service.impl";
import Solicitud from "../../../core/models/solicitud.model";
import {ToasterService} from "../../../core/services/toaster.service";
import Respuesta from "../../../core/models/respuesta.model";
import EstudianteResponse from "../../../core/models/estudiante_response.model";
import Programa from "../../../core/models/programa.model";
import {ProgramaServiceImpl} from "../../../core/http/implement/programa.service.impl";

@Component({
  selector: 'app-view-formulario',
  templateUrl: './view-formulario.component.html',
  styleUrls: ['./view-formulario.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ViewFormularioComponent implements OnInit {

  formulario: FormularioResponse;

  startAt: Date;

  minDateCalendar: Date;

  maxDateCalendar: Date;

  formularioAddAsesoria: FormGroup;

  listHorariosDisponibles: Array<Horario>;

  listHorariosFormulario: Array<Horario>;

  listPreguntasFormulario: Array<Pregunta>

  loadFile: FileList;

  step = 0;

  loading: boolean;

  nombreDocente: string;

  horarioAsesoria: Horario;

  archivo: File;

  listProgramas: Array<Programa>;

  constructor(private route: ActivatedRoute,
              private docenteService: DocenteServiceImpl,
              private routes: Router,
              private formularioService: FormularioServiceImpl,
              private _adapter: DateAdapter<any>,
              private _formBuilder: FormBuilder,
              private solicitudService: SolicitudServiceImpl,
              private toasterService: ToasterService,
              private programaService: ProgramaServiceImpl) {
    this._adapter.setLocale('es');
    this.formulario = new FormularioResponse();
    this.listHorariosDisponibles = [];
    this.listHorariosFormulario = [];
    this.listPreguntasFormulario = [];
    this.startAt = new Date();
    this.minDateCalendar = new Date();
    this.maxDateCalendar = new Date();
    this.loading = true;
    this.nombreDocente = '';
    const uuid = this.route.snapshot.paramMap.get('enlace');
    this.getFormulario(uuid);
    this.listProgramas = [];
  }

  ngOnInit(): void {
    this.crearFormAddAsesoria();
    this.agregarIntegrante();
    this.fechasDisponibles();
    this.listarProgramas();
  }

  listarProgramas() {
    this.listProgramas = [];
    this.programaService.getAll().subscribe((res: Array<Programa>) => {
      this.listProgramas = res;
    })
  }

  /****CARGA VALORES INICIALES***/

  crearFormAddAsesoria() {
    this.formularioAddAsesoria = this._formBuilder.group({
      fecha_asesoría: ['', [Validators.required]],
      hora_asesoría: ['', [Validators.required]],
      preguntas: this._formBuilder.array([]),
      integrantes: this._formBuilder.array([]),
      file: '',
      es_virtual: false,
    })
  }

  getFormulario(uuid) {
    this.loading = false;
    this.formularioService.getFormularioByEnlace(uuid).subscribe((res: Array<FormularioResponse>) => {
      if (res != null && res != undefined) {
        if (res.length > 0) {
          this.formulario = res[0];
          console.log("hay algo ahí")
        } else {
          this.routes.navigate(['/not-page'])
          console.log("viene vacio")
        }
      }
    }, () => {
      console.log("hay error")
      this.routes.navigate(['/not-page'])
    }, () => {
      this.loading = true;
      console.log(JSON.stringify(this.formulario));
      this.establecerMaxMinDate();
      this.consultarNombreDocente();
      this.consultarHorarios();
      this.consultarPreguntas();
    })
  }

  formatHora(hora: string): string {
    if (this.listHorariosDisponibles.length > 0) {
      return hora.split(':')[0] + ":" + hora.split(':')[1]
    }
    return '';
  }

  consultarNombreDocente() {
    if (Object.keys(this.formulario).length !== 0) {
      this.loading = false;
      this.docenteService.get(+this.formulario.docente).subscribe((res: DocenteResponse) => {
        this.nombreDocente = res.usuario.nombre;
      }, () => {
      }, () => {
        this.loading = true;
      });
    }
  }

  establecerMaxMinDate() {
    if (Object.keys(this.formulario).length !== 0) {
      let min_date = this.formulario.disponibilidad_inicio_formulario.split("-");
      this.minDateCalendar = new Date(+min_date[0], (+min_date[1] - 1), +min_date[2])
      let max_date = this.formulario.disponibilidad_fin_formulario.split("-");
      this.maxDateCalendar = new Date(+max_date[0], (+max_date[1] - 1), +max_date[2])
    }
  }

  showCalendar = false;

  consultarHorarios() {
    if (Object.keys(this.formulario).length !== 0) {
      this.loading = false;
      this.formularioService.getHorariosByFormulario(this.formulario.id).subscribe((res: Array<Horario>) => {
        this.listHorariosFormulario = res;
      }, () => {
      }, () => {
        this.loading = true;
        this.showCalendar = true;
      })
    }
  }

  get duracionAsesoria(): number {
    if (this.formulario != null && this.formulario != undefined) {
      return this.formulario.duracion;
    }
    return 0;
  }

  get nombreformularioAsesoria(): string {
    if (this.formulario != null && this.formulario != undefined) {
      return this.formulario.nombre_formulario;
    }
    return '';
  }

  get cargaArchivo(): boolean {
    if (this.formulario != null && this.formulario != undefined) {
      return this.formulario.carga_archivos;
    }
    return false;
  }

  get lugarPresencial(): string {
    if (this.formulario != null && this.formulario != undefined) {
      return this.formulario.ubicacion_formulario + "";
    }
    return '';
  }

  consultarPreguntas() {
    if (Object.keys(this.formulario).length !== 0) {
      this.loading = false;
      this.formularioService.getPreguntasByFormulario(this.formulario.id).subscribe((res: Array<Pregunta>) => {
        this.listPreguntasFormulario = res;
       // console.log(JSON.stringify(res))
      }, () => {
      }, () => {
        this.loading = true;
        this.crearControlesPreguntas();
      });
    }
  }

  crearControlesPreguntas() {
    console.log("Entre en crear preguntas")
    for (let i = 0; i < this.listPreguntasFormulario.length; i++) {
      this.preguntas.push(new FormControl())
    }
  }

  /****CONFIGURACIÓN DEL CALENDARIO***/

  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      let listFechasDisponibles = this.fechasDisponibles();
      const highlightDate = listFechasDisponibles.some(d => moment(d).date() === moment(date).date() && moment(d).month() === moment(date).month() && moment(d).year() === moment(date).year());
      return highlightDate ? 'example-custom-date-class' : '';
    };
  }

  fechasDisponibles(): Array<Date> {
    const newFechasDisponibles = new Array<Date>()
    if (Object.keys(this.formulario).length !== 0) {
      if (this.listHorariosFormulario.length > 0) {
        for (let i of this.listHorariosFormulario) {
          let dateAux = i.fecha_horario.split("-");
          let newD = new Date(+dateAux[0], (+dateAux[1] - 1), +dateAux[2])
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
    if (this.formulario != null && this.formulario != undefined) {
      const horarios = this.listHorariosFormulario;
      if (horarios != undefined && horarios != null) {
        for (var i = 0; i < horarios.length; i++) {
          let dateAux = horarios[i].fecha_horario.split("-");
          let newD = new Date(+dateAux[0], (+dateAux[1] - 1), +dateAux[2])
          if ((moment(newD).date() == moment(fechaSeleccionada).date()) &&
            ((moment(newD).month()) == moment(fechaSeleccionada).month()) &&
            (moment(newD).year() == moment(fechaSeleccionada).year())) {
            this.listHorariosDisponibles.push(horarios[i])
          }
        }
      }
    }
  }

  selectedHorario(horario: Horario) {
    console.log("china")
    this.horarioAsesoria = horario;
  }

  /****CONFIGURACIÓN DE INTEGRANTES***/

  get integrantes(): FormArray {
    return this.formularioAddAsesoria.get('integrantes') as FormArray;
  }

  agregarIntegrante() {
    const newIntegrante = this._formBuilder.group({
      nombre: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      codigo: ['', [Validators.required]],
      id_programa: ['', [Validators.required]],
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

  onFormSubmit() {
    console.log("Entre aquíi")
    let formData = new FormData();
    formData.append('id_formulario', this.formulario.id + "")
    formData.append('id_docente', this.formulario.docente + "")
    formData.append('fecha', this.horarioAsesoria.fecha_horario)
    formData.append('hora', this.formatHora(this.horarioAsesoria.inicio_horario))
    formData.append('archivo', this.archivo)

    let resAux = new Array<Respuesta>()
    for (let i = 0; i < this.preguntas.controls.length; i++) {
      let res = new Respuesta();
      res.id_pregunta = this.listPreguntasFormulario[i].id;
      res.respuesta = this.formularioAddAsesoria.value.preguntas[i];
      resAux.push(res);
    }
    formData.append('respuestas', JSON.stringify(resAux))

    let auxEstudiantes = new Array<EstudianteResponse>()
    for (let i = 0; i < this.integrantes.controls.length; i++) {
      auxEstudiantes.push(<EstudianteResponse>Object.assign({}, this.integrantes.controls[i].value))
    }
    formData.append('estudiantes', JSON.stringify(auxEstudiantes))

    formData.append('es_virtual', this.formularioAddAsesoria.get('es_virtual').value)

    console.log(" ----> DatofORM ", formData.get('id_formulario'))
    console.log(" ----> DatofORM ", formData.get('id_docente'))
    console.log(" ----> DatofORM ", formData.get('fecha'))
    console.log(" ----> DatofORM ", formData.get('hora'))
    console.log(" ----> DatofORM ", formData.get('archivo'))
    console.log(" ----> DatofORM ", formData.get('respuestas'))
    console.log(" ----> DatofORM ", formData.get('estudiantes'))
    console.log(" ----> DatofORM ", formData.get('es_virtual'))

     this.solicitudService.saveSolicitud(formData).subscribe(
     () => {
        console.log("Pase bien")
        this.toasterService.openSnackBar(
          'ASESORÍA AGENDADA CORRECTAMENTE',
          ToasterService.CERRAR_ACTION
        );
      },
     (error) => {
        console.log("Ingrese error", JSON.stringify(error))
        this.toasterService.openSnackBar(
          'ERROR INESPERADO',
          ToasterService.CERRAR_ACTION
        );
      },
     () => {
        this.loading = true;
      });
  }

}


