import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  RequiredValidator,
  Validators
} from '@angular/forms';
import Formulario from "../../../../core/models/formulario.model";
import {FormularioServiceImpl} from "../../../../core/http/implement/formulario.service.impl";
import Pregunta from "../../../../core/models/pregunta.model";
import {TIPO_CAMPO} from "../../../../core/constants/tipo_campo.constants";
import {TIPO_DATO} from "../../../../core/constants/tipo_dato.constants";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material/chips";
import {newArray} from "@angular/compiler/src/util";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter
} from "@angular/material-moment-adapter";
import {Observable, Subject} from "rxjs";
import Programa from "../../../../core/models/programa.model";
import {ProgramaServiceImpl} from "../../../../core/http/implement/programa.service.impl";
import {v4 as uuidv4} from 'uuid';
import * as moment from 'moment';
import {DefaultMatCalendarRangeStrategy, MAT_DATE_RANGE_SELECTION_STRATEGY} from "@angular/material/datepicker";
import {DocenteServiceImpl} from "../../../../core/http/implement/docente.service.impl";
import {ToasterService} from "../../../../core/services/toaster.service";
import Horario from "../../../../core/models/horario.model";
import {ClipboardService} from "ngx-clipboard";
import {ValidateUser} from "../../../../core/services/validate_usuario.service";
import {AuthenticationServiceImpl} from "../../../../core/http/implement/authentication.service.impl";
import {TIPO_USER} from "../../../../core/constants/tipo_user.constants";

@Component({
  selector: 'formulario-add',
  templateUrl: './formulario_add.component.html',
  styleUrls: ['./formulario_add.component.scss'],
})
export class CrearFormularioDocenteComponent implements OnInit {

  //Form
  formAddFormulario: FormGroup;

  formPreguntasFormulario: FormGroup;


  //Barra de carga del mat-progress-bar
  loading: boolean;

  listTipoDatos: Array<string>;
  listTipoCampos: Array<string>;

  //Recurso para los CHIPs de angular
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  //Datos del formulario a envíar a la Step de visualización
  newFormulario: Formulario;
  minDate: Date;
  maxDate: Date;

  listProgramas: Array<Programa>;

  idDocente : number;

  urlFormulario: string;

  constructor(private _adapter: DateAdapter<any>,
              private _formBuilder: FormBuilder,
              private formularioService: FormularioServiceImpl,
              private docenteService: DocenteServiceImpl,
              private toasterService: ToasterService,
              private clipboardService: ClipboardService,
              private validateUser: ValidateUser,
              private authenticationService: AuthenticationServiceImpl) {
    this.validateUser.validateTipoUser(authenticationService.currentUserValue.tipo_usuario, TIPO_USER.DOCENTE)
    this._adapter.setLocale('es');
    this.idDocente = authenticationService.currentUserValue.user_id;
    this.loading = false;
    this.minDate = new Date();
    this.maxDate = new Date();
    this.listProgramas = [];
    this.newFormulario = new Formulario();
    this.urlFormulario = '';
  }

  ngOnInit() {
    this.crearFormAddFormulario();
    this.listTipoDatos = this.getTipoDatos();
    this.listTipoCampos = this.getTipoCampos();
    this.agregarPregunta();
    this.agregarHorario();
  }

  /****CARGA VALORES INICIALES***/
  crearFormAddFormulario() {
    this.formAddFormulario = this._formBuilder.group({
      nombre_formulario: ['', [Validators.required]],
      ubicacion_formulario: ['', [Validators.required]],
      disponibilidad_inicio_formulario: ['', [Validators.required]],
      disponibilidad_fin_formulario: ['', [Validators.required]],
      tiempo_minimo: ['', [Validators.required]],
      intervalo: ['', [Validators.required]],
      duracion: ['', [Validators.required]],
      programas: [null, [Validators.required]],
      restringe_estudiantes: [false],
      restringe_otros_estudiantes: [false],
      horarios: this._formBuilder.array([]),
      carga_archivos: [false],
    });
    this.formPreguntasFormulario = this._formBuilder.group({
      preguntas: this._formBuilder.array([]),
    });
    this.formAddFormulario.valueChanges.subscribe(res => {
      if (res.disponibilidad_inicio_formulario >= res.disponibilidad_fin_formulario &&
        res.disponibilidad_fin_formulario !== '') {
        this.formAddFormulario.get('disponibilidad_fin_formulario').setErrors({'error': true})
      } else {
        this.formAddFormulario.get('disponibilidad_fin_formulario').setErrors(null)
        this.formAddFormulario.get('disponibilidad_fin_formulario').setValidators([Validators.required])
      }
    });
    this.docenteService.getProgramasByDocente(this.idDocente).subscribe(
      (programas: Array<Programa>) => {
        this.listProgramas = programas;
      }
    );
  }

  /****CONFIGURACIÓN PREGUNTAS***/

  getTipoDatos(): Array<string> {
    let tipoDatos = new Array<string>();
    for (let tipo in TIPO_DATO) {
      tipoDatos.push(TIPO_DATO[tipo])
    }
    return tipoDatos;
  }

  getTipoCampos(): Array<string> {
    let tipoCampos = new Array<string>();
    for (let tipo in TIPO_CAMPO) {
      tipoCampos.push(TIPO_CAMPO[tipo])
    }
    return tipoCampos;
  }

  validarIsTipoCampo(indice: number): number {
    let response;
    switch (this.preguntas.controls[indice].value.tipo_campo) {
      case TIPO_CAMPO.CUADRO_TEXTO:
        response = 0;
        break;
      case TIPO_CAMPO.COMBOBOX:
        response = 1;
        break
    }
    return response;
  }

  get preguntas(): FormArray {
    return this.formPreguntasFormulario.get('preguntas') as FormArray;
  }

  agregarPregunta() {
    const pregunta = this._formBuilder.group({
      nombre_campo: ['', [Validators.required]],
      tipo_campo: [TIPO_CAMPO.CUADRO_TEXTO, [Validators.required]],
      tipo_dato: [TIPO_DATO.ALFANUMERICO],
      longitud: 0,
      obligatoria: false,
      selecciones: this._formBuilder.array([]),
    });
    this.preguntas.push(pregunta);
  }

  listarItems(indice: number): Array<string> {
    return this.preguntas.controls[indice].value['selecciones'] as Array<string>;
  }

  agregarItemCombobox(event: MatChipInputEvent, indice: number): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.preguntas.controls[indice].value['selecciones'].push(value.trim())
      if (input) {
        input.value = '';
      }
    }
  }

  borrarPregunta(indice: number) {
    this.preguntas.removeAt(indice)
  }

  borrarItemCombobox(indicePregunta: number, indiceItem): void {
    if (indiceItem >= 0) {
      this.preguntas.controls[indicePregunta].value['selecciones'].splice(indiceItem, 1);
    }
  }

  /****CONFIGURACIÓN HORARIOS***/

  get horarios(): FormArray {
    return this.formAddFormulario.get('horarios') as FormArray;
  }

  agregarHorario() {
    const horario = this._formBuilder.group({
      fecha_horario: ['', [Validators.required]],
      inicio_horario: ['', [Validators.required]],
      fin_horario: ['', [Validators.required]],
    });
    horario.valueChanges.subscribe(res => {
      if (res.inicio_horario >= res.fin_horario) {
        horario.get('fin_horario').setErrors({'error': true})
      } else {
        horario.get('fin_horario').setErrors(null)
        horario.get('fin_horario').setValidators([Validators.required])
      }
    });
    this.horarios.push(horario);
  }

  borrarHorario(indice: number) {
    this.horarios.removeAt(indice)
  }


  /****ENVIO Y REGISTRO DE INFORMACIÓN***/

  copiarURL() {
    this.clipboardService.copyFromContent(this.urlFormulario);
  }

  onShowFormulario() {
    this.newFormulario = <Formulario>Object.assign({}, this.formAddFormulario.value);
    this.newFormulario.preguntas = this.formPreguntasFormulario.get('preguntas').value;
    this.newFormulario.enlace_uuid_formulario = uuidv4();
    this.minDate = new Date(this.newFormulario.disponibilidad_inicio_formulario);
    this.maxDate = new Date(this.newFormulario.disponibilidad_fin_formulario);
    this.newFormulario.disponibilidad_inicio_formulario = moment(this.newFormulario.disponibilidad_inicio_formulario).format("YYYY-MM-DD")
    this.newFormulario.disponibilidad_fin_formulario = moment(this.newFormulario.disponibilidad_fin_formulario).format("YYYY-MM-DD")
    this.newFormulario.docente = this.idDocente+"";

    const horariosCal = this.newFormulario.horarios;
    let horarioListAux = new Array<Horario>();
    let duracionAux = this.newFormulario.duracion;
    let intervaloAux = this.newFormulario.intervalo;

    for (let i = 0; i < horariosCal.length; i++) {
      const dateHorario = moment(horariosCal[i].fecha_horario).format("YYYY-MM-DD");
      const horaFinal = moment(horariosCal[i].fin_horario.replace(':', ''), "hmm");
      let horaVariable = moment(horariosCal[i].inicio_horario.replace(':', ''), "hmm");
      if (horaFinal.isSameOrAfter(horaVariable.clone().add(duracionAux, "minutes"))) {
        while (horaFinal.isAfter(horaVariable)) {
          let newH = horaVariable.clone().add(duracionAux, "minutes")
          horarioListAux.push(new Horario(dateHorario, horaVariable.format("HH:mm"), newH.format("HH:mm")))
          newH = newH.clone().add(intervaloAux, "minutes")
          horaVariable = newH;
        }
      }
      this.newFormulario.horarios = horarioListAux;
    }
    this.urlFormulario = "http://localhost:4200/#/formulario/" + this.newFormulario.enlace_uuid_formulario;

  }

  onFormSubmit() {
    this.loading = false;
    console.log("INFORMACIÓN IMPORTANTE CREAR: " + JSON.stringify(this.newFormulario))
    this.formularioService.save(this.newFormulario).subscribe(
      (newForm) => {
        this.toasterService.openSnackBar(
          'Formulario creado Exitosamente.',
          ToasterService.CERRAR_ACTION
        );
      },
      (error) => {
        this.toasterService.openSnackBar(
          'Ha ocurrido un error inesperado',
          ToasterService.CERRAR_ACTION
        );
      },
      () => {
        console.log("carga")
        this.loading = true;
      });
  }
}
