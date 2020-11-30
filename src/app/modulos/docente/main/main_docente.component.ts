import {Component, OnInit, ViewChild} from '@angular/core';
import {ValidateService} from "../../../core/services/validators";
import {AuthenticationServiceImpl} from "../../../core/http/implement/authentication.service.impl";
import {TIPO_USER} from "../../../core/constants/tipo_user.constants";
import {CalendarOptions, EventInput} from '@fullcalendar/core';
import {FullCalendarComponent} from '@fullcalendar/angular';
import {DialogService} from "../../../core/services/dialogs.service";
import * as moment from "moment";
import SolicitudResponse from "../../../core/models/solicitud_response.model";
import {DocenteServiceImpl} from "../../../core/http/implement/docente.service.impl";
import EstudianteRequest from "../../../core/models/estudiante_request.model";
import {MatTableDataSource} from "@angular/material/table";
import {SolicitudServiceImpl} from "../../../core/http/implement/solicitud.service.impl";
import Formulario from "../../../core/models/formulario.model";
import {ToasterService} from "../../../core/services/toaster.service";

@Component({
  selector: 'app-main-docente',
  templateUrl: './main_docente.component.html',
})
export class MainDocenteComponent implements OnInit {

  loading: boolean;

  @ViewChild('fullcalendar') fullcalendar: FullCalendarComponent;

  calendarOptions: CalendarOptions;

  cuentaEstudiantes: number;
  cuentaAsesorias: number;
  cuentaAutorizaciones: number;
  cuentaFormularios: number;

  constructor(private validate: ValidateService,
              private authenticationService: AuthenticationServiceImpl,
              private docenteService: DocenteServiceImpl,
              private dialogService: DialogService,
              private toasterService: ToasterService,) {
    this.validate.validateTipoUser(authenticationService.currentUserValue.tipo_usuario, TIPO_USER.DOCENTE)
    this.loading = true;
    this.cuentaEstudiantes = 0;
    this.cuentaAsesorias = 0;
    this.cuentaAutorizaciones = 0;
    this.cuentaFormularios = 0;
  }

  ngOnInit() {
    this.loadCalendar();
    this.cargaSolicitudes();
    this.getEstudiantes();
    this.getFormularios();
  }

  getFormularios() {
    this.loading = false;
    this.docenteService.getFormulariosByDocente(this.authenticationService.currentUserValue.user_id).subscribe(
      (listFormularios: Array<Formulario>) => {
        let aux = 0;
        for(let i of listFormularios){
          if(i.activo == 1){
            aux++;
          }
        }
       this.cuentaFormularios = aux;
      },
      (error) => {
        console.log("ERROR -> LISTAR FORMULARIOS")
      },
      () => {
        this.loading = true;
      });
  }

  getEstudiantes() {
    this.loading = false;
    this.docenteService.getEstudiantesByDocente(this.authenticationService.currentUserValue.user_id).subscribe(
      (listEstudiantes: Array<EstudianteRequest>) => {
        this.cuentaEstudiantes = listEstudiantes.length;
      },
      (error) => {
        console.log("ERROR -> LISTAR ESTUDIANTES")
      },
      () => {
        this.loading = true;
      });
  }

  loadCalendar() {
    this.calendarOptions = {
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      initialView: 'dayGridMonth',
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      eventClick: this.handleEventClick.bind(this),
    };
  }

  //añadir el ID del docente registrado en el storage
  cargaSolicitudes() {
    this.loading = false;
    this.docenteService.getSolicitudesByDocente(this.authenticationService.currentUserValue.user_id).subscribe(
      (listsolitudes: Array<SolicitudResponse>) => {

        let agendadas = 0;
        let pendientes = 0;

        for(let i of listsolitudes){
          if(i.estado == 1){
            pendientes++;
          } else if(i.estado == 2) {
            agendadas++;
          }
        }
        this.cuentaAutorizaciones = pendientes;
        this.cuentaAsesorias = agendadas;

        this.convertSolicitudesToEventos(listsolitudes);
      },
      (error) => {
        console.log("ERROR -> LISTAR CALENDAR SOLICITUDES")
      },
      () => {
        this.loading = true;
      });
  }

  //Esto debe cambiarse solicitudes
  convertSolicitudesToEventos(listHorario: SolicitudResponse[]) {
    console.log(listHorario)
    for (let i = 0; i < listHorario.length; i++) {
      let dataIni: EventInput[] = [];
      let dateAux = listHorario[i].fecha_solicitada.split("-");
      let newD = new Date(+dateAux[0], (+dateAux[1] - 1), +dateAux[2])
      this.agregarEvento(listHorario[i].id, listHorario[i].formulario_data.nombre_formulario, newD)
    }
  }

  agregarEvento(id, title, start) {
    this.fullcalendar.getApi().addEvent({
      id: id,
      title,
      start: start,
      end: start,
      allDay: false
    });
  }

  handleEventClick(clickInfo: any) {
    this.dialogService.showSolicitudDialog(clickInfo.event.id).subscribe(res => {
    });
  }

}
