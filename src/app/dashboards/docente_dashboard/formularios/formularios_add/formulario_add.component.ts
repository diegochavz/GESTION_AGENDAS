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
  items = ['Javascript', 'Typescript'];


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
    /**
     this.formNewPregunta = this._formBuilder.group({
      nombre_campo: ['', Validators.required],
      tipo_campo: ['', Validators.required],
      tipo_dato: ['', Validators.required],
      longitud: ['', Validators.required],
      obligatorio: [false],
      selecciones: ['', Validators.required],
    })
     **/

    this.listTipoDatos = this.getTipoDatos();
    this.listTipoCampos = this.getTipoCampos();
    this.agregarHorario();
    this.agregarPregunta();
  }
  public onSelect(item) {
    console.log('tag selected: value is ' + item);
  }

  validarIsTipoCampo(indice: number):number {
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
      tipo_campo: '',
      tipo_dato: '',
      longitud: '',
      obligatorio: '',
      selecciones: '',
    });
    this.preguntas.push(pregunta);
  }

  borrarHorario(indice: number) {
    this.horarios.removeAt(indice)
  }

  borrarPregunta(indice: number) {
    this.preguntas.removeAt(indice)
  }


  /**
   extraerDatosFormularioPregunta(): Pregunta {
    const formValues = Object.assign({}, this.formNewPregunta.value);
    const newPregunta = <Pregunta>{
      nombre_campo: formValues.nombre_campo,
      tipo_campo: formValues.tipo_campo,
      tipo_dato: formValues.tipo_dato,
      longitud: formValues.longitud,
      obligatorio: formValues.obligatorio,
      //selecciones:formValues.nombre_campo,
    }
    return newPregunta;
  }


   agregarPregunta() {
    const pregunta = this.extraerDatosFormularioPregunta();
    const newPregunta = this._formBuilder.group({
      nombre_campo: pregunta.nombre_campo,
      tipo_campo: pregunta.tipo_campo,
      tipo_dato: pregunta.tipo_dato,
      longitud: pregunta.longitud,
      obligatorio: pregunta.obligatorio,
      selecciones: pregunta.nombre_campo,
    })

    this.preguntas.push(horario);




     var newPreguntaControl = this._formBuilder.group({
      this.pregunta.nombre_campo: ''
    });



     if (pregunta.tipo_campo == TIPO_CAMPO.CUADRO_TEXTO) {
      newPreguntaControl =  new FormControl(Validators.maxLength(pregunta.longitud))
    } else {
      newPreguntaControl = null;
    }
     if(pregunta.obligatorio){
      newPreguntaControl.setValidators(Validators.required);
    }

    const horario = this._formBuilder.group({
      "fecha_horario": '',
      inicio_horario: '',
      fin_horario: '',
    });

    //this.preguntas.push(newPreguntaControl);
  }
   **/
  onFormSubmit() {

    this.loading = true;
    /**
     this.mensajeError = null;
     const formValues = Object.assign({}, this.formAddFormulario.value);
     const formularioNuevo = <Formulario>{
      nombre_formulario: formValues.nombre_formulario,
      ubicacion_formulario: formValues.ubicacion_formulario,
      disponibilidad_inicio_formulario: formValues.disponibilidad_inicio_formulario,
      disponibilidad_fin_formulario: formValues.disponibilidad_fin_formulario,
      tiempo_minimo: formValues.tiempo_minimo,
      intervalo: formValues.intervalo,
      duracion: formValues.duracion,
      restringe_estudiantes: formValues.restringe_estudiantes,
      restringe_otros_estudiantes: formValues.restringe_otros_estudiantes,
      programas: formValues.programa,
    };


     this.formularioService.save(FormularioNuevo).pipe(
     finalize(() => {
        this.loading = false
      })
     )**/
  }
}
