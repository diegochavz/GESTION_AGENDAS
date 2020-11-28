import {Router} from "@angular/router";
import {Injectable} from "@angular/core";
import Horario from "../models/horario.model";
import * as moment from "moment";

@Injectable()
export class ValidateService {

  constructor(private router: Router) {
  }

  validateUser(tipo_usuario: number) {
    console.log(tipo_usuario)
    switch (tipo_usuario) {
      case 0:
        this.router.navigate(['/super']);
        break;
      case 1:
        this.router.navigate(['/director']);
        break;
      case 2:
        this.router.navigate(['/docente']);
        break;
    }
  }

  validateTipoUser(tipo_user: number, tipo_user_module: number) {
    if ((tipo_user == tipo_user_module) ||
      ((tipo_user == 1) && (tipo_user_module == 2))) {
      return;
    }
    this.validateUser(tipo_user);
  }

  validarCruceFecha(horarioNew: Horario, listHorarios: Array<Horario>): boolean {
    for (let horario of listHorarios) {
      if ( horario.fecha_horario == horarioNew.fecha_horario) {
        const horaInicioNew = moment(horarioNew.inicio_horario.replace(':', ''), "hmm");
        const horaInicioOld = moment(this.formatHora(horario.inicio_horario).replace(':', ''), "hmm");
        const horaFinNew = moment(horarioNew.fin_horario.replace(':', ''), "hmm");
        const horaFinOld = moment(this.formatHora(horario.fin_horario).replace(':', ''), "hmm");

        if (horaInicioNew.isSame(horaFinOld) &&
          horaInicioNew.isAfter(horaInicioOld)
          && horaFinNew.isAfter(horaFinOld)) {
          console.log("contreee 1")
          return false;
        } else if(horaFinNew.isSame(horaInicioOld) &&
          horaInicioOld.isAfter(horaInicioNew)
          && horaFinOld.isAfter(horaFinNew)) {
          console.log("contreee 2")
          return false;
        } else if(horaInicioNew.isSameOrBefore(horaInicioOld) &&
          horaFinNew.isSameOrAfter(horaInicioOld)
          && horaFinNew.isSameOrBefore(horaFinOld)) {
          console.log("contreee 3")
          return true;
        } else if (horaInicioNew.isSameOrBefore(horaInicioOld)
          && horaFinNew.isSameOrAfter(horaFinOld)) {
          console.log("contreee 4")
          return true;
        } else if (horaInicioNew.isSameOrAfter(horaInicioOld)
          && horaFinNew.isSameOrBefore(horaFinOld)) {
          console.log("contreee 5")
          return true;
        } else if (horaInicioNew.isSameOrAfter(horaInicioOld)
          && horaInicioNew.isSameOrBefore(horaFinOld) &&
          horaFinNew.isSameOrAfter(horaFinOld)) {
          console.log("contreee 6")
          return true;
        } else {
          console.log("ERROR VALIDADOR FECHA")
        }
      }
    }
    return false;
  }

  formatHora(hora: string): string {
      return hora.split(':')[0] + ":" + hora.split(':')[1]
  }

}
