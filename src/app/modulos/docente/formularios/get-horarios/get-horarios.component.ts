import {Component, Input, KeyValueDiffers, OnInit, Output, ViewChild, EventEmitter} from '@angular/core';
import {CalendarOptions, EventInput, EventApi, EventClickArg} from '@fullcalendar/core';
import {FullCalendarComponent, DateSelectArg} from '@fullcalendar/angular';
import Horario from "../../../../core/models/horario.model";
import {ConverterService} from "../../../../core/services/converters.service";
import {DocenteServiceImpl} from "../../../../core/http/implement/docente.service.impl";
import {AuthenticationServiceImpl} from "../../../../core/http/implement/authentication.service.impl";
import {ToasterService} from "../../../../core/services/toaster.service";
import {DialogService} from "../../../../core/services/dialogs.service";
import {DateAdapter} from "@angular/material/core";
import {FormBuilder} from "@angular/forms";
import * as moment from 'moment';
import HorarioResponse from "../../../../core/models/horario_response.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {FormularioHelpsService} from "../../../../core/services/formulario_helps.service";
import {v4 as uuidv4} from 'uuid';
import {FormularioServiceImpl} from "../../../../core/http/implement/formulario.service.impl";

@Component({
  selector: 'app-get-horarios',
  templateUrl: './get-horarios.component.html',
  styleUrls: ['./get-horarios.component.scss']
})
export class GetHorariosComponent implements OnInit {

  @Output()
  datosHorario = new EventEmitter<Horario[]>();

  @Output()
  datosEdit = new EventEmitter<Horario[]>();

  @Input()
  idFormulario: number;

  loading: boolean;

  @ViewChild('fullcalendar') fullcalendar: FullCalendarComponent;
  calendarOptions: CalendarOptions;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['fecha_inicial', 'fecha_final', 'inicio_horario', 'fin_horario', 'se_repite', 'dias'];
  dataSource: MatTableDataSource<Horario>;

  listHorariosEdit: Horario[];

  listHorarioOcupados: Horario[];

  listHorariosAdd: Horario[]

  constructor(private _adapter: DateAdapter<any>,
              private _formBuilder: FormBuilder,
              private differs: KeyValueDiffers,
              private converterService: ConverterService,
              private docenteService: DocenteServiceImpl,
              private authenticationService: AuthenticationServiceImpl,
              private toasterService: ToasterService,
              private dialogService: DialogService,
              private formularioHelps: FormularioHelpsService,
              private formularioService: FormularioServiceImpl) {
    this._adapter.setLocale('es');
    this.loading = true;
    this.listHorariosEdit = [];
    this.listHorarioOcupados = [];
    this.listHorariosAdd = [];
  }

  ngOnInit(): void {
    this.getLisHorariosEdit();
    this.loadCalendar();
  }

  /***CARGE DE INFORMACION***/
  loadCalendar() {
    this.calendarOptions = {
      'locale': 'es',
      themeSystem: 'bootstrap',
      navLinks: true,
      allDaySlot: false,
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
      select: this.handleDateSelect.bind(this),
      eventsSet: this.handleEvents.bind(this)
    };
  }

  getLisHorariosEdit() {
    if (this.idFormulario != undefined && this.idFormulario != null) {
      this.loading = false;
      this.formularioService.getHorariosByFormulario(this.idFormulario).subscribe(res => {
        console.log(res)
        this.listHorariosEdit = this.formularioHelps.parseListDocentesHorariosToHorario(res);
      }, (error) => {
        this.toasterService.openSnackBarCumtom(error, 'error')
        this.loading = true;
      }, () => {
        this.setInitThen();
        this.cargaEditEventsCalendar()
        this.getLisHorariosOcupado();
        this.loading = true;
      })
    }
  }

  cargaEditEventsCalendar() {
    for (let i = 0; i < this.listHorariosEdit.length; i++) {
      let horario = this.listHorariosEdit[i];
      let auxFechaInicio = horario.fecha_inicial.split("-");
      let fechaInicio = new Date(+auxFechaInicio[0], (+auxFechaInicio[1] - 1), +auxFechaInicio[2])
      let horaInicio = horario.inicio_horario.split(':')
      fechaInicio.setHours(+horaInicio[0], +horaInicio[1])

      let auxFechaFin = horario.fecha_final.split("-");
      let fechaFin = new Date(+auxFechaFin[0], (+auxFechaFin[1] - 1), +auxFechaFin[2])
      let horaFin = horario.fin_horario.split(':')
      fechaFin.setHours(+horaFin[0], +horaFin[1])

      this.agregarEvento("+" + horario.id, (horario.inicio_horario + " - " + horario.fin_horario), fechaInicio, fechaFin, '#93D6F7')
    }

  }

  getLisHorariosOcupado() {
    this.loading = false;
    this.docenteService.getHorariosByDocente(this.authenticationService.currentUserValue.user_id).subscribe((res: HorarioResponse[]) => {
      this.quitarListaHorariosEdit(this.formularioHelps.parseListDocentesHorariosToHorario(res))
    }, (error) => {
      this.toasterService.openSnackBarCumtom(error, 'error')
      this.loading = true;
    }, () => {
      this.cargaNewEventsCalendar(this.listHorarioOcupados, '---', '#FAA5A5')
      this.loading = true;
    })
  }

  quitarListaHorariosEdit(listHorario: Horario[]) {
    let auxList = listHorario;
    for(let i = 0; i< this.listHorariosEdit.length; i++){
      auxList = this.formularioHelps.sacarHorarioDeList(auxList, this.listHorariosEdit[i]);
    }
    this.listHorarioOcupados = auxList;
  }

  /***MANEJADOR DE EVENTOS***/
  //NUEVO EVENTO
  handleDateSelect(selectInfo: DateSelectArg) {
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
    let auxList = this.listHorariosEdit.concat(this.listHorariosAdd)
    this.dialogService.createHorarioDialog(this.crearHorarioObject(selectInfo.start, selectInfo.end), this.listHorarioOcupados, auxList).subscribe((res: Horario) => {
      if (res != null) {
        this.listHorariosAdd.push(res)
        this.setInitThen();
        this.cargaNewEventsCalendar(
          this.formularioHelps.desglosarHorarios(res),
          this.crearIDHorario(res.fecha_inicial, res.fecha_final, res.dias_semanas),
          '#B0F8AC');
      }
    });
  }

  //EMITIR EL LISTADO DE NUEVOS HORARIOS
  handleEvents() {
      this.datosHorario.emit(this.listHorariosAdd);
      this.datosEdit.emit(this.listHorariosEdit)
  }


  //EDITAR O REMOVER HORARIO
  handleEventClick(clickInfo: EventClickArg) {
    let id = clickInfo.event.id
    let type = (id).substring(0, 1);
    if (type == '+') {
      let res = this.formularioHelps.parseEventToHorario(this.listHorariosEdit, id, clickInfo.event.start, clickInfo.event.end);
      let position = res.position;
      let horario = res.horario;
      console.log(res.horario)
      if(horario.disponibilidad){
        if (res != null) {
          this.dialogService.getEditHorarioDialog(horario, this.listHorariosEdit, this.listHorarioOcupados, this.listHorariosAdd).subscribe(res => {
            if (res != undefined) {
              if (res == 0) {
                return;
              } else if (res == 1) {
                this.loading = false;
                this.formularioService.deleteHorarioById(+id.substring(1,id.length)).subscribe(() => {
                    this.toasterService.openSnackBarCumtom('Horario eliminado satisfactoriamente', 'success')
                  },
                  (error) => {
                    this.toasterService.openSnackBarCumtom(error, 'error')
                    this.loading = true;
                  }, () => {
                    this.loading = true;
                    this.eliminarEventHorario(id);
                    this.eliminarItemListEdit(position);
                    this.setInitThen()
                  });
              } else {
                this.loading = false;
                this.formularioService.deleteHorarioById(res.id).subscribe(() => {
                  },
                  (error) => {
                    this.toasterService.openSnackBarCumtom('Error al acualizar horario', 'error')
                    this.loading = true;
                  },
                  () => {
                    this.loading = true;
                    this.eliminarEventHorario(id);
                    this.eliminarItemListEdit(position);
                    this.listHorariosAdd.push(res)
                    this.setInitThen();
                    this.cargaNewEventsCalendar(this.formularioHelps.desglosarHorarios(res),
                      "+" + horario.id, '#B0F8AC');
                  });
              }
            }
          })
        }
      } else {
        this.toasterService.openSnackBarCumtom('El horario seleccionado ya cuenta con turnos ocupados', 'error')
      }
    } else {
      let res = this.formularioHelps.parseEventToHorario(this.listHorariosAdd, id, clickInfo.event.start, clickInfo.event.end);
      if (res != null) {
        let position = res.position;
        let horario = res.horario;
        this.dialogService.editHorarioDialog(horario, this.listHorarioOcupados.concat(this.listHorariosEdit), this.listHorariosAdd).subscribe(res => {
          if (res != undefined) {
            if (res == 0) {
              return;
            } else if (res == 1) {
              this.eliminarEventHorario(id);
              this.eliminarItemListAdd(position);
            } else {
              this.eliminarEventHorario(id);
              this.eliminarItemListAdd(position);
              this.listHorariosAdd.push(res)
              this.setInitThen();
              this.cargaNewEventsCalendar(this.formularioHelps.desglosarHorarios(res),
                this.crearIDHorario(res.fecha_inicial, res.fecha_final, res.dias_semanas), '#B0F8AC');
            }
          }
        })
      }
    }
  }

  crearHorarioObject(fechaInicio, fechaFin): Horario {
    let horario = new Horario();
    horario.fecha_inicial = moment(fechaInicio).format("YYYY-MM-DD")
    let fecha_fin = fechaFin
    fecha_fin.setDate(fecha_fin.getDate() - 1);
    horario.fecha_final = moment(fecha_fin).format("YYYY-MM-DD")
    horario.inicio_horario = moment(fechaInicio).format('HH:mm')
    horario.fin_horario = moment(fechaFin).format('HH:mm')
    return horario;
  }

  cargaNewEventsCalendar(listHorarios: Horario[], id, color) {
    for (let i = 0; i < listHorarios.length; i++) {
      let auxFechaInicio = listHorarios[i].fecha_inicial.split("-");
      let fechaInicio = new Date(+auxFechaInicio[0], (+auxFechaInicio[1] - 1), +auxFechaInicio[2])
      let horaInicio = listHorarios[i].inicio_horario.split(':')
      fechaInicio.setHours(+horaInicio[0], +horaInicio[1])

      let auxFechaFin = listHorarios[i].fecha_final.split("-");
      let fechaFin = new Date(+auxFechaFin[0], (+auxFechaFin[1] - 1), +auxFechaFin[2])
      let horaFin = listHorarios[i].fin_horario.split(':')
      fechaFin.setHours(+horaFin[0], +horaFin[1])

      this.agregarEvento(id, (listHorarios[i].inicio_horario + " - " + listHorarios[i].fin_horario), fechaInicio, fechaFin, color)
    }

  }

  agregarEvento(id, title, start, finish, color) {
    this.fullcalendar.getApi().addEvent({
      id: id,
      title,
      start: start,
      end: finish,
      allDay: false,
      backgroundColor: color,
      textColor: '#737373',
      overlap: true, //Revisar que hace esto
    });
  }

  eliminarItemListAdd(index: number) {
    this.listHorariosAdd.splice(index, 1);
    this.setInitThen();
  }

  eliminarItemListEdit(index: number) {
    this.listHorariosEdit.splice(index, 1);
    this.setInitThen();
  }


  eliminarEventHorario(idEvent) {
    let events = this.fullcalendar.getApi().getEvents();
    for (let i = 0; i < events.length; i++) {
      if (events[i].id == idEvent) {
        events[i].remove();
      }
    }
  }

  //AUXILIARES
  setInitThen() {
    let auxList = this.listHorariosEdit.concat(this.listHorariosAdd)
    this.dataSource = new MatTableDataSource(auxList);
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = ' Filas por página';
  }

  setDias(value: number[]): string {
    if (value == undefined) {
      return "NO APLICA"
    } else {
      let res = '';
      for (let i = 0; i < value.length; i++) {
        switch (value[i]) {
          case 0:
            res += " Domingo "
            break;
          case 1:
            res += " Lunes "
            break;
          case 2:
            res += " Martes "
            break;
          case 3:
            res += " Miercoles "
            break;
          case 4:
            res += " Jueves "
            break;
          case 5:
            res += " Viernes "
            break;
          case 6:
            res += " Sabado "
            break;
        }
      }
      return res;
    }
  }

  setStringRepetir(value: boolean) {
    if (value) {
      return "SI"
    } else {
      return "NO"
    }
  }

  crearIDHorario(fechaInicio: string, fechaFin: string, list: number[]): string {
    let id = '';
    if (list == undefined && list == null) {
      return '1' + uuidv4();
    }
    id = '0' + fechaInicio + fechaFin;
    for (let i = 0; i < list.length; i++) {
      id += list[i];
    }
    return id;
  }
}
