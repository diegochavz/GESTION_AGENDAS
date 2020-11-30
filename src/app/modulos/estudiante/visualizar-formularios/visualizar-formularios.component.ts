import {Component, OnInit} from '@angular/core';
import {FormularioServiceImpl} from "../../../core/http/implement/formulario.service.impl";
import Formulario from "../../../core/models/formulario.model";
import FormularioResponse from "../../../core/models/formulario_response.model";
import {Router} from "@angular/router";
import Docente from "../../../core/models/docente.model";
import DocenteResponse from "../../../core/models/docente_response.model";
import Programa from "../../../core/models/programa.model";
import {DocenteServiceImpl} from "../../../core/http/implement/docente.service.impl";
import {ProgramaServiceImpl} from "../../../core/http/implement/programa.service.impl";
import {FormBuilder, FormGroup} from "@angular/forms";

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

  listDocentes: DocenteResponse[];

  listProgramas: Programa[];

  loading: boolean;

  formInicio: FormGroup;

  test: Date = null;

  focus: any;
  focus1: any;

  listAux: FormularioResponse[];

  constructor(private formularioService: FormularioServiceImpl,
              private docenteService: DocenteServiceImpl,
              private programaService: ProgramaServiceImpl,
              private routes: Router,
              private _formBuilder: FormBuilder,
  ) {
    this.listFormularios = [];
    this.listDocentes = [];
    this.listProgramas = [];
    this.loading = true;
  }

  ngOnInit(): void {
    this.crearForm();
    this.test = new Date();
    this.getListFormulario();
    this.getDocentes();
    this.getProgramas();
  }

  crearForm() {
    this.formInicio = this._formBuilder.group({
      docente: null,
    });

    this.formInicio.get('docente').valueChanges.subscribe(res => {
      this.filtrarPorDocente(res);
    })
  }


  filtrarPorDocente(idDocente) {
    this.listFormularios = this.listAux;
    if (this.listFormularios.length > 0) {
      let aux = [];
      for (let i of this.listFormularios) {
        if (i.docente == idDocente) {
          aux.push(i);
        }
      }
      this.listFormularios = aux;
    }
  }

  getDocentes() {
    this.loading = false;
    this.docenteService.getAll().subscribe((res: DocenteResponse[]) => {
      this.listDocentes = res;
    }, () => {
      console.log("ERROR AL CARGA FORMULARIO EN PRINCIPAL")
    }, () => {
      this.loading = true;
    })
  }


  getProgramas() {
    this.loading = false;
    this.programaService.getAll().subscribe((res: Programa[]) => {
      this.listProgramas = res;
    }, () => {
      console.log("ERROR AL CARGA FORMULARIO EN PRINCIPAL")
    }, () => {
      this.loading = true;
    })
  }

  clearParametros(){
    this.listFormularios = this.listAux;
  }

  getListFormulario() {
    this.listFormularios = [];
    this.loading = false;
    this.formularioService.getAll().subscribe((res: FormularioResponse[]) => {
      let aux = []
      for (let i of res) {
        if (i.activo == 1) {
          aux.push(i)
        }
      }
      this.listFormularios = aux;
      this.listAux = aux;
    }, () => {
      console.log("ERROR AL CARGA FORMULARIO EN PRINCIPAL")
    }, () => {
      this.loading = true;
    })
  }

  irFormulario(enlace) {
    document.location.href = 'http://agendadocb.cpsw.ingsistemasufps.co/#/formulario/' + enlace;
  }
}
