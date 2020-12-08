import {Component, OnInit, ViewChild} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import Formulario from "../../../../core/models/formulario.model";
import {FormularioServiceImpl} from "../../../../core/http/implement/formulario.service.impl";
import {TIPO_CAMPO} from "../../../../core/constants/tipo_campo.constants";
import {TIPO_DATO} from "../../../../core/constants/tipo_dato.constants";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material/chips";
import {DateAdapter} from "@angular/material/core";
import Programa from "../../../../core/models/programa.model";
import {v4 as uuidv4} from 'uuid';
import * as moment from 'moment';
import {DocenteServiceImpl} from "../../../../core/http/implement/docente.service.impl";
import {ToasterService} from "../../../../core/services/toaster.service";
import Horario from "../../../../core/models/horario.model";
import {ClipboardService} from "ngx-clipboard";
import {ValidateService} from "../../../../core/services/validators";
import {AuthenticationServiceImpl} from "../../../../core/http/implement/authentication.service.impl";
import {TIPO_USER} from "../../../../core/constants/tipo_user.constants";
import {URL_FORMULARIO} from "../../../../core/constants/url_formulario.constants";
import {MatTableDataSource} from "@angular/material/table";
import {EstudianteTable} from "../../../../core/util/interface_tables/estudiante_table.interface";
import {MatPaginator} from "@angular/material/paginator";
import {FormularioHelpsService} from "../../../../core/services/formulario_helps.service";

@Component({
  selector: 'formulario-add',
  templateUrl: './formulario_add.component.html',
  styleUrls: ['./formulario_add.component.scss'],
})
export class CrearFormularioDocenteComponent implements OnInit {

  formAddFormulario: FormGroup;

  formPreguntasFormulario: FormGroup;

  loading: boolean;

  listTipoDatos: Array<string>;

  listTipoCampos: Array<string>;

  //Recurso para los CHIPs de angular
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  //Datos del formulario a envíar a la Step de visualización
  newFormulario: Formulario;
  minDate: Date;
  maxDate: Date;

  listHorariosNew: Horario[];

  listProgramas: Array<Programa>;

  idDocente: number;

  urlFormulario: string;

  constructor(private _adapter: DateAdapter<any>,
              private _formBuilder: FormBuilder,
              private formularioService: FormularioServiceImpl,
              private docenteService: DocenteServiceImpl,
              private toasterService: ToasterService,
              private clipboardService: ClipboardService,
              private validate: ValidateService,
              private authenticationService: AuthenticationServiceImpl,
              private formularioHelps: FormularioHelpsService) {
    this.validate.validateTipoUser(authenticationService.currentUserValue.tipo_usuario, TIPO_USER.DOCENTE)
    this._adapter.setLocale('es');
    this.idDocente = authenticationService.currentUserValue.user_id;
    this.loading = false;
    this.minDate = new Date();
    this.maxDate = new Date();
    this.listProgramas = [];
    this.newFormulario = new Formulario();
    this.urlFormulario = '';
    this.listHorariosNew = [];
  }

  ngOnInit() {
    this.crearFormAddFormulario();
    this.listTipoDatos = this.getTipoDatos();
    this.listTipoCampos = this.getTipoCampos();
    this.agregarPregunta();
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

  /****RECIBIR HORARIOS***/

  getListHorariosNew(listHorarios: Horario[]) {
    this.listHorariosNew = listHorarios;
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
    this.newFormulario.docente = this.idDocente + "";

    let auxList = new Array<Horario>();
    for (let i = 0; i < this.listHorariosNew.length; i++) {
      let mm = this.formularioHelps.desglosarHorarios(this.listHorariosNew[i]);
      auxList = auxList.concat(mm)
    }
    this.newFormulario.horarios = this.formularioHelps.parseHorarioToTurnos(auxList, this.newFormulario.duracion, this.newFormulario.intervalo);
    this.urlFormulario = URL_FORMULARIO.BASE + this.newFormulario.enlace_uuid_formulario;

  }

  onFormSubmit() {
    this.loading = false;
    this.newFormulario.horarios = this.listHorariosNew;
    console.log(JSON.stringify(this.newFormulario));
    this.formularioService.save(this.newFormulario).subscribe(
      (newForm) => {
        this.toasterService.openSnackBarCumtom(
          'Formulario creado satisfactoriamente',
          'success')

      },
      (error) => {
        this.toasterService.openSnackBarCumtom(
          error,
          'error')
      },
      () => {
        this.loading = true;
      });
  }
}
