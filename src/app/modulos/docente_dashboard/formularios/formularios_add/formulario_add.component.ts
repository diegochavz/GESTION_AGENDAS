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

@Component({
  selector: 'formulario-add',
  templateUrl: './formulario_add.component.html',
  styleUrls: ['./formulario_add.component.scss'],
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
export class CrearFormularioDocenteComponent implements OnInit {

  //Form
  formAddFormulario: FormGroup;
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


  //Impide el paso del Step 1
  isDisable_1 = true;

  //Impide el paso del Step 2
  isDisable_2 = true;

  constructor(private _adapter: DateAdapter<any>, private _formBuilder: FormBuilder, private formularioService: FormularioServiceImpl) {
    this._adapter.setLocale('es');
    this.loading = false;
    this.minDate = new Date();
    this.maxDate = new Date();
  }

  ngOnInit() {
    this.crearFormAddFormulario();
    this.listTipoDatos = this.getTipoDatos();
    this.listTipoCampos = this.getTipoCampos();
    this.agregarHorario();
    this.agregarPregunta();
    this.formAddFormulario.valueChanges.subscribe(rst => {
      this.validarGrupoHorarioAtencion();
      this.validarGrupoPreguntas();
    })
  }

  /****CARGA VALORES INICIALES***/
  crearFormAddFormulario() {
    this.formAddFormulario = this._formBuilder.group({
      nombre_formulario: ['', [Validators.required]],
      ubicacion_formulario: ['', [Validators.required]],
      disponibilidad_inicio_formulario: [Date, [Validators.required]],
      disponibilidad_fin_formulario: [Date, [Validators.required]],
      tiempo_minimo: ['', [Validators.required]],
      intervalo: ['', [Validators.required]],
      duracion: ['', [Validators.required]],
      //plan_estudios: [null, [Validators.required]],
      restringe_estudiantes: [false],
      restringe_otros_estudiantes: [false],
      horarios: this._formBuilder.array([]),
      preguntas: this._formBuilder.array([]),
      carga_archivos: [false],
    });
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
    return this.formAddFormulario.get('preguntas') as FormArray;
  }

  agregarPregunta() {
    const pregunta = this._formBuilder.group({
      nombre_campo: ['', [Validators.required]],
      tipo_campo: [TIPO_CAMPO.CUADRO_TEXTO, [Validators.required]],
      tipo_dato: [TIPO_DATO.ALFANUMERICO],
      longitud: '',
      obligatorio: false,
      selecciones: this._formBuilder.array([]),
    });
    this.preguntas.push(pregunta);
    this.isDisable_2 = true;
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
      fecha_horario: '',
      inicio_horario: '',
      fin_horario: '',
    });
    this.horarios.push(horario);
    this.isDisable_1 = true;
  }

  borrarHorario(indice: number) {
    this.horarios.removeAt(indice)
  }

  /****VALIDADORES STEPPER***/

  validarGrupoPreguntas() {
    if (!this.formAddFormulario.controls["preguntas"].invalid) {
      this.isDisable_2 = false;
    } else {
      this.isDisable_2 = true;
    }
  }

  validarGrupoHorarioAtencion() {
    if (
      !this.formAddFormulario.controls["nombre_formulario"].invalid &&
      !this.formAddFormulario.controls["ubicacion_formulario"].invalid &&
      !this.formAddFormulario.controls["disponibilidad_inicio_formulario"].invalid &&
      !this.formAddFormulario.controls["disponibilidad_fin_formulario"].invalid &&
      !this.formAddFormulario.controls["tiempo_minimo"].invalid &&
      !this.formAddFormulario.controls["intervalo"].invalid &&
      !this.formAddFormulario.controls["duracion"].invalid &&
      !this.formAddFormulario.controls["horarios"].invalid
    ) {
      this.isDisable_1 = false;
    } else {
      this.isDisable_1 = true;
    }
  }

  /****ENVIO Y REGISTRO DE INFORMACIÓN***/

  onShowFormulario() {
    this.newFormulario = <Formulario>Object.assign({}, this.formAddFormulario.value);
    this.minDate = this.newFormulario.disponibilidad_inicio_formulario;
    this.maxDate = this.newFormulario.disponibilidad_fin_formulario;
  }

  onFormSubmit() {
    this.loading = true;
    //const dataFormulario = <Formulario>Object.assign({}, this.formAddFormulario.getRawValue());
    /**
     this.formularioService.save(FormularioNuevo).pipe(
     finalize(() => {
        this.loading = false
      })
     )**/
  }


}
