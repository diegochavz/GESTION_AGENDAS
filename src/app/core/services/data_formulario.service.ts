import {Injectable} from '@angular/core';
import Formulario from '../models/formulario.model';

@Injectable()
export class DataFormularioService {

  dataFormulario: Formulario;

  constructor() {
  }

  getDataFormulario(): Formulario {
    return this.dataFormulario;
  }

  setDataFormulario(dataFormulario: Formulario) {
    this.dataFormulario = dataFormulario;
  }
}
