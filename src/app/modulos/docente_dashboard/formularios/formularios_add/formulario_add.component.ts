import {Component, OnInit} from '@angular/core';
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

@Component({
  selector: 'formulario-add',
  templateUrl: './formulario_add.component.html',
  styleUrls: ['./formulario_add.component.scss']

})
export class CrearFormularioDocenteComponent implements OnInit {

  formAddFormulario: FormGroup;
  formNewPregunta: FormGroup;
  toppings = new FormControl();
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  loading: boolean;
  mensajeError: string
  listTipoDatos: Array<string>;
  listTipoCampos: Array<string>;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private _formBuilder: FormBuilder, private formularioService: FormularioServiceImpl) {
    this.loading = false;
  }

  ngOnInit() {
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
    })
    this.listTipoDatos = this.getTipoDatos();
    this.listTipoCampos = this.getTipoCampos();
    this.agregarHorario();
    this.agregarPregunta();
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

  get horarios(): FormArray {
    return this.formAddFormulario.get('horarios') as FormArray;
  }

  get preguntas(): FormArray {
    return this.formAddFormulario.get('preguntas') as FormArray;
  }

  agregarHorario() {
    const horario = this._formBuilder.group({
      fecha_horario: '',
      inicio_horario: '',
      fin_horario: '',
    });
    this.horarios.push(horario);
  }

  agregarPregunta() {
    const pregunta = this._formBuilder.group({
      nombre_campo: '',
      tipo_campo: TIPO_CAMPO.CUADRO_TEXTO,
      tipo_dato: '',
      longitud: '',
      obligatorio: false,
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

  borrarHorario(indice: number) {
    this.horarios.removeAt(indice)
  }

  borrarPregunta(indice: number) {
    this.preguntas.removeAt(indice)
  }

  borrarItemCombobox(indicePregunta: number, indiceItem): void {
    if (indiceItem >= 0) {
      this.preguntas.controls[indicePregunta].value['selecciones'].splice(indiceItem, 1);
    }
  }

  onFormSubmit() {
    this.loading = true;
    //const dataFormulario = <Formulario>Object.assign({}, this.formAddFormulario.getRawValue());
    const dataFormulario = <Formulario>Object.assign({}, this.formAddFormulario.value);
    console.log(dataFormulario)

    /**
     this.formularioService.save(FormularioNuevo).pipe(
     finalize(() => {
        this.loading = false
      })
     )**/
  }


}
