import {Injectable} from '@angular/core';
import Formulario from '../models/formulario.model';

@Injectable()
export class DataFormularioService {

  dataFormulario: number;

  constructor() {
  }

  getDataFormulario(): number {
    return this.dataFormulario;
  }

  setDataFormulario(idFormulario: number) {
    this.dataFormulario = idFormulario;
  }
}
