import {Injectable} from "@angular/core";
import Horario from "../models/horario.model";
import * as moment from 'moment';

@Injectable()
export class FormularioHelpsService {

  constructor() {
  }

  desglosarHorarios(horario: Horario): Horario[] {
    if (horario.fecha_inicio == horario.fecha_fin) {
      return [horario];
    }
    let fecha_inicio = moment(horario.fecha_inicio);
    let fecha_fin = moment(horario.fecha_fin);
    let dias = horario.dias_semanas;
    let auxList = new Array<Horario>();
    if(dias!=null && dias != undefined){
      while (fecha_inicio.isSameOrBefore(fecha_fin)) {
        if (dias.includes(fecha_inicio.day())) {
          let auxHorario = new Horario();
          auxHorario.fecha_inicio = fecha_inicio.format("YYYY-MM-DD")
          auxHorario.fecha_fin = auxHorario.fecha_inicio
          auxHorario.hora_inicio = horario.hora_inicio;
          auxHorario.hora_fin = horario.hora_fin;
          auxList.push(auxHorario);
        }
        fecha_inicio = fecha_inicio.add(1, 'days')
      }
    }
    return auxList;
  }

  parseEventToHorario(listHorarios: Horario[], id: string, fechaInicio, fechaFin): { 'position': number, 'horario': Horario } {
    let fecha_inicio = moment(fechaInicio);
    let hora_inicio = moment(fechaInicio).format('HH:mm')
    let hora_fin = moment(fechaFin).format('HH:mm')
    for (let i = 0; i < listHorarios.length; i++) {
      let auxInicio = moment(listHorarios[i].fecha_inicio)
      let auxFin = moment(listHorarios[i].fecha_fin)

      if (id.substring(0, 1) == '0') {
        while (auxInicio.isSameOrBefore(auxFin)) {
          if (moment(auxInicio).format("YYYY-MM-DD") == fecha_inicio.format("YYYY-MM-DD")) {
            if (listHorarios[i].hora_inicio == hora_inicio && listHorarios[i].hora_fin == hora_fin) {
              return {'position': i, 'horario': listHorarios[i]};
            }
          }
          auxInicio = auxInicio.add(1, 'days')
        }
      } else {
        if (moment(auxInicio).format("YYYY-MM-DD") == fecha_inicio.format("YYYY-MM-DD")) {
          if (listHorarios[i].hora_inicio == hora_inicio && listHorarios[i].hora_fin == hora_fin) {
            return {'position': i, 'horario': listHorarios[i]};
          }
        }
      }

    }
    return null;
  }

  validarCruceFecha(horarioNew: Horario, listHorarios: Array<Horario>): boolean {
    if (listHorarios != null && listHorarios != undefined) {
      for (let i = 0; i < listHorarios.length; i++) {
        let horario = listHorarios[i]
        if (horario.fecha_inicio == horarioNew.fecha_inicio && horario.fecha_fin == horarioNew.fecha_fin) {
          const horaInicioNew = moment(horarioNew.hora_inicio.replace(':', ''), "hmm");
          const horaInicioOld = moment(this.formatHora(horario.hora_inicio).replace(':', ''), "hmm");
          const horaFinNew = moment(horarioNew.hora_fin.replace(':', ''), "hmm");
          const horaFinOld = moment(this.formatHora(horario.hora_fin).replace(':', ''), "hmm");

          if (horaInicioNew.isSame(horaFinOld) &&
            horaInicioNew.isAfter(horaInicioOld)
            && horaFinNew.isAfter(horaFinOld)) {
            return false;
          } else if (horaFinNew.isSame(horaInicioOld) &&
            horaInicioOld.isAfter(horaInicioNew)
            && horaFinOld.isAfter(horaFinNew)) {
            return false;
          } else if (horaInicioNew.isSameOrBefore(horaInicioOld) &&
            horaFinNew.isSameOrAfter(horaInicioOld)
            && horaFinNew.isSameOrBefore(horaFinOld)) {
            return true;
          } else if (horaInicioNew.isSameOrBefore(horaInicioOld)
            && horaFinNew.isSameOrAfter(horaFinOld)) {
            return true;
          } else if (horaInicioNew.isSameOrAfter(horaInicioOld)
            && horaFinNew.isSameOrBefore(horaFinOld)) {
            return true;
          } else if (horaInicioNew.isSameOrAfter(horaInicioOld)
            && horaInicioNew.isSameOrBefore(horaFinOld) &&
            horaFinNew.isSameOrAfter(horaFinOld)) {
            return true;
          } else {
          }
        }
      }
    }
    return false;
  }

  parseHorarioToTurnos(listHorario: Horario[], duracion:number, intervalo: number): Horario[]{
    const horariosCal = listHorario;
    console.log(horariosCal)
    let horarioListAux = new Array<Horario>();
    let duracionAux = duracion;
    let intervaloAux = intervalo;

    for (let i = 0; i < horariosCal.length; i++) {
      const dateHorario = moment(horariosCal[i].fecha_inicio).format("YYYY-MM-DD");
      const horaFinal = moment(horariosCal[i].hora_fin.replace(':', ''), "hmm");
      let horaVariable = moment(horariosCal[i].hora_inicio.replace(':', ''), "hmm");
      if (horaFinal.isSameOrAfter(horaVariable.clone().add(duracionAux, "minutes"))) {
        while (horaFinal.isAfter(horaVariable)) {
          let newH = horaVariable.clone().add(duracionAux, "minutes")
          let horarioAux = new Horario();
          horarioAux.fecha_inicio = dateHorario;
          horarioAux.fecha_fin = horarioAux.fecha_inicio;
          horarioAux.hora_inicio = horaVariable.format("HH:mm");
          horarioAux.hora_fin = newH.format("HH:mm");
          horarioListAux.push(horarioAux)
          newH = newH.clone().add(intervaloAux, "minutes")
          horaVariable = newH;
        }
      }
    }

    return horarioListAux;
  }

  /***AUXILIARES***/
  formatHora(hora: string): string {
    return hora.split(':')[0] + ":" + hora.split(':')[1]
  }
}
