import {Component, OnInit, Type, ViewChild} from '@angular/core';
import {FormGroup} from "@angular/forms";
import Formulario from "../../../../core/models/formulario.model";
import {Time} from "@angular/common";
import Horario from "../../../../core/models/horario.model";


@Component({
  selector: 'app-formularios-show',
  templateUrl: './formularios-show.component.html',
  styleUrls: ['./formularios-show.component.scss']
})
export class FormulariosShowComponent implements OnInit {


  formulario: Formulario;
  listHorariosDisponibles: Array<string>;
  title = 'ng-calendar-demo';
  selectedDate = new Date('2019/09/26');
  startAt = new Date('2020/09/11');
  // startAt : Date;
  minDate = new Date('2020/09/11');
  maxDate = new Date(new Date().setMonth(new Date().getMonth() + 1));
  //maxDate: Date;
  year: any;
  DayAndDate: string;

  constructor() {
    this.formulario = new Formulario();
    this.onSelect(this.selectedDate);
    this.listHorariosDisponibles = [];
    this.crearFormularioPrueba();
    /**
     this.startAt = new Date(
     this.formulario.disponibilidad_inicio_formulario.getFullYear(),
     this.formulario.disponibilidad_inicio_formulario.getMonth(),
     this.formulario.disponibilidad_inicio_formulario.getDate());

     this.maxDate = new Date(
     this.formulario.disponibilidad_fin_formulario.getFullYear(),
     this.formulario.disponibilidad_fin_formulario.getMonth(),
     this.formulario.disponibilidad_fin_formulario.getDate());
     **/
  }

  crearFormularioPrueba() {
    this.formulario = new Formulario();
    this.formulario.nombre_formulario = "Formulario de prueba";
    this.formulario.ubicacion_formulario = "SA 403";
    let date_1: Date = new Date(2020, 5, 1);
    let date_2: Date = new Date(2020, 5, 20);

    this.formulario.disponibilidad_fin_formulario = date_1;
    this.formulario.disponibilidad_fin_formulario = date_2;
    this.formulario.intervalo = 10;
    this.formulario.duracion = 15;
    this.formulario.restringe_estudiantes = false;
    this.formulario.restringe_otros_estudiantes = false;
    this.formulario.carga_archivos = false;

    let date_3: Date = new Date(2020, 9, 11);
    let date_4: Date = new Date(2020, 9, 18);
    let date_5: Date = new Date(2020, 9, 8);

    let horar: Array<Horario> = [
      {
        "fecha_horario": date_3,
        "inicio_horario": "13:50",
        "fin_horario": "18:00"
      },
      {
        fecha_horario: date_3,
        "inicio_horario": "14:50",
        "fin_horario": "18:00"
      },
      {
        fecha_horario: date_4,
        inicio_horario: "15:50",
        fin_horario: "18:00"
      }
    ]
    this.formulario.horarios = horar;
  }


  calcularHorariosDisponibles(fechaSeleccionada: Date) {
    const horarios = this.formulario.horarios;
    this.listHorariosDisponibles = [];
    if (horarios != undefined && horarios != null) {
      for (var i = 0; i < this.formulario.horarios.length; i++) {
        if ((horarios[i].fecha_horario.getDate() == fechaSeleccionada.getDate()) &&
          ((horarios[i].fecha_horario.getMonth()) == fechaSeleccionada.getMonth() + 1) &&
          (horarios[i].fecha_horario.getFullYear() == fechaSeleccionada.getFullYear())) {
          console.log("Hola")
          this.listHorariosDisponibles.push(horarios[i].inicio_horario)
        }
      }
    }
  }


  onSelect(event) {
    this.selectedDate = event;
    //const dateSelected = this.convertDateCalendar(event.toDateString());
    this.calcularHorariosDisponibles(new Date(event.toDateString()))
    /** const dateValue = dateString.split(' ');
     this.year = dateValue[3];
     this.DayAndDate = dateValue[0] + ',' + ' ' + dateValue[1] + ' ' + dateValue[2];
     **/
  }

  selectedHorario(horario: string) {
    console.log(horario)
  }

  /****PRUEBAS EXPAN********/
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  /****PRUEBAS EXPAN********/





  formAddFormulario: FormGroup;


  ngOnInit(): void {
  }


  myDateFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }
}
