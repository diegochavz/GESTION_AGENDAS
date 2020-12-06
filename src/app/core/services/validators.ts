import {Router} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable()
export class ValidateService {

  constructor(private router: Router) {
  }

  validateUser(tipo_usuario: number) {
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

}
