import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import Formulario from "../../../../core/models/formulario.model";
import {FormularioServiceImpl} from "../../../../core/http/implement/formulario.service.impl";

@Component({
  selector: 'formulario-add',
  templateUrl: './formulario_add.component.html',
  styleUrls: ['./formulario_add.component.scss']

})
export class CrearFormularioDocenteComponent implements OnInit {

  formAddFormulario: FormGroup;
  toppings = new FormControl();
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  loading: boolean;
  mensajeError: string

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
    })
    this.agregarHorarioAtencion();
  }

  get horarios(): FormArray {
    return this.formAddFormulario.get('horarios') as FormArray;
  }

  agregarHorarioAtencion() {
    const horario = this._formBuilder.group({
      fecha_horario: '',
      inicio_horario: '',
      fin_horario:'',
    });

    this.horarios.push(horario);
  }

  borrarHorarioAtencion(indice: number) {
    this.horarios.removeAt(indice)
  }

  onFormSubmit() {

    this.loading = true;
    console.log(this.formAddFormulario.get("horarios"));
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

    console.log(formularioNuevo)

    this.formularioService.save(FormularioNuevo).pipe(
      finalize(() => {
        this.loading = false
      })
    )**/
  }
}
