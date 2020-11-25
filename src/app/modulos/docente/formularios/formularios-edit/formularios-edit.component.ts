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
import {ClipboardService} from "ngx-clipboard";
import SeleccionesDataResponse from "../../../../core/models/selecciones_data_response.model";
import {ValidateUser} from "../../../../core/services/validate_usuario.service";
import {AuthenticationServiceImpl} from "../../../../core/http/implement/authentication.service.impl";
import {TIPO_USER} from "../../../../core/constants/tipo_user.constants";

@Component({
  selector: 'app-formularios-edit',
  templateUrl: './formularios-edit.component.html',
  styleUrls: ['./formularios-edit.component.scss']
})
export class FormulariosEditComponent implements OnInit {

  //Form
  formEditFormulario: FormGroup;

  formPreguntasFormulario: FormGroup;

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

  listProgramas: Array<Programa>;

  urlFormulario: string;

  constructor(private _adapter: DateAdapter<any>,
              private _formBuilder: FormBuilder,
              private formularioService: FormularioServiceImpl,
              private programaService: ProgramaServiceImpl,
              private dataFormularioService: DataFormularioService,
              private docenteService: DocenteServiceImpl,
              private toasterService: ToasterService,
              private clipboardService: ClipboardService,
              private validateUser: ValidateUser,
              private authenticationService: AuthenticationServiceImpl) {
    this.validateUser.validateTipoUser(authenticationService.currentUserValue.tipo_usuario, TIPO_USER.DOCENTE)
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
  }

  /****CARGA VALORES INICIALES***/
  consultarHorarios() {
    if (this.editFormulario != null && this.editFormulario != undefined) {
      this.loading = false;
      this.formularioService.getHorariosByFormulario(this.editFormulario.id).subscribe(res => {
          console.log("listado de horarios", res)
          this.listarHorarios(res);
        }, () => {
        }, () => {
          this.loading = true;
        }
      )
    }
  }

  listarHorarios(restHorarios: Horario[]) {
    for (let i = 0; i < restHorarios.length; i++) {
      let dateHorario = restHorarios[i].fecha_horario.split("-")
      let dateAux = new Date(+dateHorario[0], +dateHorario[1] - 1, +dateHorario[2])
      const horario = this._formBuilder.group(
        {
          id_horario: restHorarios[i].id,
          fecha_horario: dateAux,
          inicio_horario: restHorarios[i].inicio_horario,
          fin_horario: restHorarios[i].fin_horario,
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
  }

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
        carga_archivos: [this.editFormulario.carga_archivos],
      });

      this.formPreguntasFormulario = this._formBuilder.group({
        preguntas: this._formBuilder.array([]),
      });

      this.formEditFormulario.valueChanges.subscribe(res => {
        if (res.disponibilidad_inicio_formulario >= res.disponibilidad_fin_formulario &&
          res.disponibilidad_fin_formulario !== '') {
          this.formEditFormulario.get('disponibilidad_fin_formulario').setErrors({'error': true})
        } else {
          this.formEditFormulario.get('disponibilidad_fin_formulario').setErrors(null)
          this.formEditFormulario.get('disponibilidad_fin_formulario').setValidators([Validators.required])
        }
      });

      this.docenteService.getProgramasByDocente(this.editFormulario.docente).subscribe(
        (programas: Array<Programa>) => {
          this.listProgramas = programas;
          this.consultarProgramas()
        }
      );

      let dateIni = this.editFormulario.disponibilidad_inicio_formulario.split("-")
      this.formEditFormulario.get('disponibilidad_inicio_formulario').setValue(new Date(+dateIni[0], +dateIni[1] - 1, +dateIni[2]))

      let dateFin = this.editFormulario.disponibilidad_fin_formulario.split("-")
      this.formEditFormulario.get('disponibilidad_fin_formulario').setValue(new Date(+dateFin[0], +dateFin[1] - 1, +dateFin[2]))

      this.urlFormulario = "http://localhost:4200/#/formulario/" + this.editFormulario.enlace_uuid_formulario;
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

  consultarPreguntas() {
    if (this.editFormulario != null && this.editFormulario != undefined) {
      this.loading = false;
      this.formularioService.getPreguntasByFormulario(this.editFormulario.id).subscribe(res => {
          console.log(res)
          this.listarPreguntas(res);
        }, () => {
        }, () => {
          this.loading = true;
        }
      )
    }
  }

  listarPreguntas(resPreguntas: Pregunta[]) {
    for (let i = 0; i < resPreguntas.length; i++) {
      const pregunta = this._formBuilder.group({
        id: resPreguntas[i].id,
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
      id: null,
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

  borrarPregunta(indice) {
    let aux = this.preguntas.controls[indice].value;
    if (aux.id != null) {
      console.log("Estoy llenito")
      this.formularioService.deletePreguntaById(+aux.id).subscribe(res => {
      }, () => {
        console.log("Marque error")
      })
    } else {
      console.log("Estoy vacio")
    }
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
      id_horario: null,
      fecha_horario: '',
      inicio_horario: '',
      fin_horario: '',
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

  borrarHorario(indice) {
    let aux = this.horarios.controls[indice].value
    if (aux.id_horario != null) {
      this.formularioService.deleteHorarioById(+aux.id_horario).subscribe(res => {
      }, () => {
        console.log("Marque error")
      })
    }
    this.horarios.removeAt(indice)
  }

  copiarURL() {
    this.clipboardService.copyFromContent(this.urlFormulario);
  }

  /****ENVIO Y EDICIÓN DE INFORMACIÓN***/

  onShowFormulario() {
    this.editFormulario.nombre_formulario = this.formEditFormulario.get('nombre_formulario').value
    this.editFormulario.ubicacion_formulario = this.formEditFormulario.get('ubicacion_formulario').value
    this.editFormulario.disponibilidad_inicio_formulario = this.formEditFormulario.get('disponibilidad_inicio_formulario').value
    this.editFormulario.disponibilidad_fin_formulario = this.formEditFormulario.get('disponibilidad_fin_formulario').value
    this.editFormulario.tiempo_minimo = this.formEditFormulario.get('tiempo_minimo').value
    this.editFormulario.intervalo = this.formEditFormulario.get('intervalo').value
    this.editFormulario.duracion = this.formEditFormulario.get('duracion').value
    this.editFormulario.restringe_estudiantes = this.formEditFormulario.get('restringe_estudiantes').value
    this.editFormulario.restringe_otros_estudiantes = this.formEditFormulario.get('restringe_otros_estudiantes').value
    this.editFormulario.programas = this.formEditFormulario.get('programas').value
    this.editFormulario.carga_archivos = this.formEditFormulario.get('carga_archivos').value

    this.minDate = new Date(this.editFormulario.disponibilidad_inicio_formulario);
    this.maxDate = new Date(this.editFormulario.disponibilidad_fin_formulario);
    this.editFormulario.disponibilidad_inicio_formulario = moment(this.editFormulario.disponibilidad_inicio_formulario).format("YYYY-MM-DD")
    this.editFormulario.disponibilidad_fin_formulario = moment(this.editFormulario.disponibilidad_fin_formulario).format("YYYY-MM-DD")

    this.getHorariosFromForm();
    this.getPreguntasFromForm();

  }

  getHorariosFromForm() {
    let horariosAux = new Array<Horario>();
    for (let i = 0; i < this.horarios.controls.length; i++) {
      let aux = this.horarios.controls[i].value;
      let hor = new Horario(moment(aux.fecha_horario).format("YYYY-MM-DD"), aux.inicio_horario, aux.fin_horario, aux.id_horario);
      horariosAux.push(hor)
    }
    this.editFormulario.horarios = horariosAux;

    this.calcularNuevosHorarios();
  }

  calcularNuevosHorarios() {
    const horariosCal = this.editFormulario.horarios;
    let horarioListAux = new Array<Horario>();
    let duracionAux = this.editFormulario.duracion;
    let intervaloAux = this.editFormulario.intervalo;

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
    }

    this.editFormulario.horarios = horarioListAux;
  }

  getPreguntasFromForm() {
    let preguntasAux = new Array<Pregunta>();
    for (let i = 0; i < this.preguntas.controls.length; i++) {
      let aux = this.preguntas.controls[i].value;
      let pre = <Pregunta>Object.assign({}, aux);
      preguntasAux.push(pre)
    }
    this.editFormulario.preguntas = preguntasAux;
    console.log("preguntas ", this.editFormulario.preguntas)
  }

  onFormSubmit() {
    this.loading = true;

    this.registrarHorarioAtencion();
    this.registrarPreguntas();

    this.editFormulario.horarios = null;
    this.editFormulario.preguntas = null;

    this.formularioService.update(this.editFormulario.id, this.editFormulario).subscribe(
      (newForm) => {
        this.toasterService.openSnackBar(
          'Formulario editado Exitosamente.',
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
      });
  }

  registrarHorarioAtencion() {
    //BORRADO DE HORARIOS VIEJOS
    for (let horarioControl of this.horarios.controls) {
      if (horarioControl.get('id_horario').value != null) {
        this.formularioService.deleteHorarioById(horarioControl.get('id_horario').value).subscribe(() => {
        });
      }
    }

    //REGISTRO NUEVOS HORARIOS
    for (let horarioList of this.editFormulario.horarios) {
      this.formularioService.addHorariobyFormulario(this.editFormulario.id, horarioList).subscribe(() => {
      });
    }
  }

  registrarPreguntas() {
    //ACTUALIZAR PREGUNTAS
    for (let pregunta of this.editFormulario.preguntas) {
      if (pregunta.id == null) {
        console.log("NUEVA PREGUNTA", JSON.stringify(pregunta))
        this.formularioService.addPreguntabyFormulario(this.editFormulario.id, pregunta).subscribe(() => {
        });
      } else {
        this.formularioService.updatePreguntaByFormulario(pregunta.id, pregunta).subscribe(() => {
        });
      }
    }
  }
}
