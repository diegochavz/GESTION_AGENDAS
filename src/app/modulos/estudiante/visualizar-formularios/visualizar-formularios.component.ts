import {Component, OnInit} from '@angular/core';
import {FormularioServiceImpl} from "../../../core/http/implement/formulario.service.impl";
import Formulario from "../../../core/models/formulario.model";
import FormularioResponse from "../../../core/models/formulario_response.model";
import {Router} from "@angular/router";

interface Food {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-visualizar-formularios',
  templateUrl: './visualizar-formularios.component.html',
  styleUrls: ['./visualizar-formularios.component.scss']
})
export class VisualizarFormulariosComponent implements OnInit {

  listFormularios: FormularioResponse[];

  loading: boolean;


  test: Date = null;

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Item 1'},
    {value: 'pizza-1', viewValue: 'Item 2'},
    {value: 'tacos-2', viewValue: 'Item 3'}
  ];

  focus: any;
  focus1: any;

  constructor(private formularioService: FormularioServiceImpl,
              private routes: Router,
              ) {
    this.listFormularios = [];
    this.loading = true;
  }

  ngOnInit(): void {
    this.test = new Date();
    this.getListFormulario();
  }

  getListFormulario() {
    this.loading = false;
    this.formularioService.getAll().subscribe(res => {
      this.listFormularios = res;
      console.log(this.listFormularios)
    }, () => {
      console.log("ERROR AL CARGA FORMULARIO EN PRINCIPAL")
    }, () => {
      this.loading = true;
    })
  }

  irFormulario(enlace) {
    document.location.href = 'http://localhost:4200/#/formulario/'+enlace;
  }
}
