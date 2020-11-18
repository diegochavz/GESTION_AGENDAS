import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import Formulario from "../../../../core/models/formulario.model";
import Programa from "../../../../core/models/programa.model";
import {DateAdapter} from "@angular/material/core";
import {FormularioServiceImpl} from "../../../../core/http/implement/formulario.service.impl";
import {ProgramaServiceImpl} from "../../../../core/http/implement/programa.service.impl";
import {DataFormularioService} from "../../../../core/services/data_formulario.service";
import {TIPO_DATO} from "../../../../core/constants/tipo_dato.constants";
import {TIPO_CAMPO} from "../../../../core/constants/tipo_campo.constants";
import {MatChipInputEvent} from "@angular/material/chips";
import Horario from "../../../../core/models/horario.model";
import Pregunta from "../../../../core/models/pregunta.model";
import {v4 as uuidv4} from "uuid";
import * as moment from "moment";
import {DocenteServiceImpl} from "../../../../core/http/implement/docente.service.impl";
import {ToasterService} from "../../../../core/services/toaster.service";

@Component({
  selector: 'app-formularios-edit',
  templateUrl: './formularios-edit.component.html',
  styleUrls: ['./formularios-edit.component.scss']
})
export class FormulariosEditComponent implements OnInit {

  //Form
  formEditFormulario: FormGroup;

  //Barra de carga del mat-progress-bar
  loading: boolean;

  listTipoDatos: Array<string>;
  listTipoCampos: Array<string>;

  //Recurso para los CHIPs de angular
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  //Datos del formulario a envíar a la Step de visualización
  editFormulario: Formulario;
  minDate: Date;
  maxDate: Date;

  //Impide el paso del Step 1
  isDisable_1 = true;

  //Impide el paso del Step 2
  isDisable_2 = true;

  listProgramas: Array<Programa>;

  urlFormulario: string;

  constructor(private _adapter: DateAdapter<any>,
              private _formBuilder: FormBuilder,
              private formularioService: FormularioServiceImpl,
              private programaService: ProgramaServiceImpl,
              private dataFormularioService: DataFormularioService,
              private docenteService: DocenteServiceImpl,
              private toasterService: ToasterService) {
    this._adapter.setLocale('es');
    this.editFormulario = this.dataFormularioService.getDataFormulario();
    this.minDate = new Date();
    this.maxDate = new Date();
    this.loading = false;
    this.listProgramas = [];
    this.consultarHorarios();
    this.consultarPreguntas();
    this.establecerFechaMaxMin();
    this.urlFormulario = '';
  }

  ngOnInit() {
    this.crearFormEditFormulario();
    this.listTipoDatos = this.getTipoDatos();
    this.listTipoCampos = this.getTipoCampos();
    this.formEditFormulario.valueChanges.subscribe(rst => {
      this.validarGrupoHorarioAtencion();
      this.validarGrupoPreguntas();
    })
  }

  /****CARGA VALORES INICIALES***/

  establecerFechaMaxMin() {
    if (this.editFormulario != null && this.editFormulario != undefined) {
      let dateMin = this.editFormulario.disponibilidad_inicio_formulario.split("-")
      this.minDate = new Date(+dateMin[0], +dateMin[1] - 1, +dateMin[2]);
      console.log(this.minDate)
      let dateMax = this.editFormulario.disponibilidad_fin_formulario.split("-")
      this.maxDate = new Date(+dateMax[0], +dateMax[1] - 1, +dateMax[2]);
      console.log(this.maxDate)
    }
  }

  crearFormEditFormulario() {
    if (this.editFormulario != null && this.editFormulario != undefined) {
      this.formEditFormulario = this._formBuilder.group({
        nombre_formulario: [this.editFormulario.nombre_formulario, [Validators.required]],
        ubicacion_formulario: [this.editFormulario.ubicacion_formulario, [Validators.required]],
        disponibilidad_inicio_formulario: [[Validators.required]],
        disponibilidad_fin_formulario: [[Validators.required]],
        tiempo_minimo: [this.editFormulario.tiempo_minimo, [Validators.required]],
        intervalo: [this.editFormulario.intervalo, [Validators.required]],
        duracion: [this.editFormulario.duracion, [Validators.required]],
        programas: [null, [Validators.required]],
        restringe_estudiantes: [this.editFormulario.restringe_estudiantes],
        restringe_otros_estudiantes: [this.editFormulario.restringe_otros_estudiantes],
        horarios: this._formBuilder.array([]),
        preguntas: this._formBuilder.array([]),
        carga_archivos: [this.editFormulario.carga_archivos],
      });

      let dateIni = this.editFormulario.disponibilidad_inicio_formulario.split("-")
      this.formEditFormulario.get('disponibilidad_inicio_formulario').setValue(new Date(+dateIni[0], +dateIni[1] - 1, +dateIni[2]))

      let dateFin = this.editFormulario.disponibilidad_fin_formulario.split("-")
      this.formEditFormulario.get('disponibilidad_fin_formulario').setValue(new Date(+dateFin[0], +dateFin[1] - 1, +dateFin[2]))

      this.docenteService.getProgramasByDocente(this.editFormulario.docente).subscribe(
        (programas: Array<Programa>) => {
          this.listProgramas = programas;
          this.consultarProgramas()
        }
      );
      this.urlFormulario = this.editFormulario.enlace_uuid_formulario;
    }
  }

  consultarProgramas() {
    if (this.editFormulario != null && this.editFormulario != undefined) {
      const aux = new Array<number>();
      this.formularioService.getProgramasByFormulario(this.editFormulario.id).subscribe((res: Array<Programa>) => {
          for (let i of res) {
            aux.push(i.id);
          }
          this.formEditFormulario.get('programas').setValue(aux)
        }
      )
    }
  }

  consultarHorarios() {
    if (this.editFormulario != null && this.editFormulario != undefined) {
      this.formularioService.getHorariosByFormulario(this.editFormulario.id).subscribe(res => {
          this.listarHorarios(res);
        }
      )
    }
  }

  consultarPreguntas() {
    if (this.editFormulario != null && this.editFormulario != undefined) {
      this.formularioService.getPreguntasByFormulario(this.editFormulario.id).subscribe(res => {
          this.listarPreguntas(res);
        }
      )
    }
  }

  listarPreguntas(resPreguntas: Pregunta[]) {
    for (let i = 0; i < resPreguntas.length; i++) {
      const pregunta = this._formBuilder.group({
        nombre_campo: [resPreguntas[i].nombre_campo, [Validators.required]],
        tipo_campo: [resPreguntas[i].tipo_campo, [Validators.required]],
        tipo_dato: [resPreguntas[i].tipo_dato],
        longitud: [resPreguntas[i].longitud],
        obligatoria: [resPreguntas[i].obligatoria],
        selecciones: this._formBuilder.array([]),
      });

      this.preguntas.push(pregunta);

      if (resPreguntas[i].selecciones_data != null) {
        for (let j of resPreguntas[i].selecciones_data) {
          this.preguntas.controls[i].value['selecciones'].push(j.value)
        }
      }
    }
  }

  listarHorarios(restHorarios: Horario[]) {
    console.log("length -> " + restHorarios.length)
    for (let i = 0; i < restHorarios.length; i++) {
      let dateHorario = restHorarios[i].fecha_horario.split("-")
      let dateAux = new Date(+dateHorario[0], +dateHorario[1] - 1, +dateHorario[2])
      const horario = this._formBuilder.group({
        fecha_horario: dateAux,
        inicio_horario: restHorarios[i].inicio_horario,
        fin_horario: restHorarios[i].fin_horario,
      });
      this.horarios.push(horario);
    }
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
    return this.formEditFormulario.get('preguntas') as FormArray;
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
    return this.formEditFormulario.get('horarios') as FormArray;
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
    if (!this.formEditFormulario.controls["preguntas"].invalid) {
      this.isDisable_2 = false;
    } else {
      this.isDisable_2 = true;
    }
  }

  validarGrupoHorarioAtencion() {
    if (
      !this.formEditFormulario.controls["nombre_formulario"].invalid &&
      !this.formEditFormulario.controls["ubicacion_formulario"].invalid &&
      !this.formEditFormulario.controls["disponibilidad_inicio_formulario"].invalid &&
      !this.formEditFormulario.controls["disponibilidad_fin_formulario"].invalid &&
      !this.formEditFormulario.controls["tiempo_minimo"].invalid &&
      !this.formEditFormulario.controls["intervalo"].invalid &&
      !this.formEditFormulario.controls["duracion"].invalid &&
      !this.formEditFormulario.controls["horarios"].invalid &&
      !this.formEditFormulario.controls["programas"].invalid
    ) {
      this.isDisable_1 = false;
    } else {
      this.isDisable_1 = true;
    }
  }

  /****ENVIO Y EDICIÓN DE INFORMACIÓN***/

  onShowFormulario() {
    let idDocente = this.editFormulario.docente;
    let idFormulario = this.editFormulario.id;
    this.editFormulario = <Formulario>Object.assign({}, this.formEditFormulario.value);
    this.editFormulario.docente = idDocente;
    this.editFormulario.id = idFormulario;

    this.minDate = new Date(this.editFormulario.disponibilidad_inicio_formulario);
    this.maxDate = new Date(this.editFormulario.disponibilidad_fin_formulario);

    this.editFormulario.disponibilidad_inicio_formulario = moment(this.editFormulario.disponibilidad_inicio_formulario).format("YYYY-MM-DD")
    this.editFormulario.disponibilidad_fin_formulario = moment(this.editFormulario.disponibilidad_fin_formulario).format("YYYY-MM-DD")

    for (let i = 0; i < this.editFormulario.horarios.length; i++) {
      this.editFormulario.horarios[i].fecha_horario = moment(this.editFormulario.horarios[i].fecha_horario).format("YYYY-MM-DD")
    }
  }

  onFormSubmit() {
    this.loading = true;
    console.log("INFORMACIÓN IMPORTANTE EDITAR: " + JSON.stringify(this.editFormulario))
    this.formularioService.update(this.editFormulario.id, this.editFormulario).subscribe(
      (newForm) => {
        this.toasterService.openSnackBar(
          'Formulario editado Exitosamente.',
          ToasterService.CERRAR_ACTION
        );
        this.loading = false;
      },
      (error) => {
        this.toasterService.openSnackBar(
          'Ha ocurrido un error inesperado',
          ToasterService.CERRAR_ACTION
        );
        this.loading = false;
      },
      () => {
        console.log("carga")
        this.loading = false;
      });
  }
}
