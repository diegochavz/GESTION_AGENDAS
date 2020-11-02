import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-crear-formulario-docente',
  templateUrl: './crear_formulario_docente.component.html',
  styleUrls: ['./crear_formulario_docente.component.scss']

})
export class CrearFormularioDocenteComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  toppings = new FormControl();
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  formularioDinamico: FormGroup;

  constructor(private _formBuilder: FormBuilder) {

  }

  ngOnInit() {

    this.formularioDinamico = this._formBuilder.group({
      horarioAtencion : this._formBuilder.array([])
      });
    this.agregarHorarioAtencion();
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  get horarioAtencion(): FormArray {
    return this.formularioDinamico.get('horarioAtencion') as FormArray;
  }

  agregarHorarioAtencion(){
    const horario = this._formBuilder.group({
      dia: new FormControl(''),
      horaInicio: new FormControl(''),
      horaFinalizacion: new FormControl(''),
    });

    this.horarioAtencion.push(horario);
  }

  borrarHorarioAtencion(indice:number){
    this.horarioAtencion.removeAt(indice)
  }
}
