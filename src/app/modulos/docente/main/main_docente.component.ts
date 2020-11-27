import {Component, OnInit, ViewChild} from '@angular/core';
import {ValidateService} from "../../../core/services/validators";
import {AuthenticationServiceImpl} from "../../../core/http/implement/authentication.service.impl";
import {TIPO_USER} from "../../../core/constants/tipo_user.constants";
import {CalendarOptions, EventInput} from '@fullcalendar/core';
import {FullCalendarComponent} from '@fullcalendar/angular';
import Horario from "../../../core/models/horario.model";
import {DialogService} from "../../../core/services/dialogs.service";
import * as moment from "moment";
import SolicitudResponse from "../../../core/models/solicitud_response.model";
import {MatTableDataSource} from "@angular/material/table";
import {DocenteServiceImpl} from "../../../core/http/implement/docente.service.impl";
import Solicitud from "../../../core/models/solicitud.model";

@Component({
  selector: 'app-main-docente',
  templateUrl: './main_docente.component.html',
})
export class MainDocenteComponent implements OnInit {

  loading: boolean;

  @ViewChild('fullcalendar') fullcalendar: FullCalendarComponent;

  calendarOptions: CalendarOptions;

  constructor(private validate: ValidateService,
              private authenticationService: AuthenticationServiceImpl,
              private docenteService: DocenteServiceImpl,
              private dialogService: DialogService) {
    this.validate.validateTipoUser(authenticationService.currentUserValue.tipo_usuario, TIPO_USER.DOCENTE)
    this.loading = true;

    let horarioNew = new Horario('2020-11-05', '11:20','11:35')

    let horarioOld = new Array<Horario>();
    horarioOld.push(new Horario('2020-11-05', '11:20','11:35'))

    console.log("respuesta final ",this.validate.validarCruceFecha(horarioNew, horarioOld))
  }

  ngOnInit() {
    this.loadCalendar();
    this.cargaSolicitudes();
  }

  loadCalendar(){
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

  agregarEvento(id,title, start){
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
