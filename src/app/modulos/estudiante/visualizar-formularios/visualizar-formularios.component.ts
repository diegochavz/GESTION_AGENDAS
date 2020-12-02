import {Component, forwardRef, OnInit, ViewEncapsulation} from '@angular/core';
import {FormularioServiceImpl} from "../../../core/http/implement/formulario.service.impl";
import Formulario from "../../../core/models/formulario.model";
import FormularioResponse from "../../../core/models/formulario_response.model";
import {Router} from "@angular/router";
import Docente from "../../../core/models/docente.model";
import DocenteResponse from "../../../core/models/docente_response.model";
import Programa from "../../../core/models/programa.model";
import {DocenteServiceImpl} from "../../../core/http/implement/docente.service.impl";
import {ProgramaServiceImpl} from "../../../core/http/implement/programa.service.impl";
import {FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR} from "@angular/forms";
import {URL_FORMULARIO} from "../../../core/constants/url_formulario.constants";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {MAT_AUTOCOMPLETE_SCROLL_STRATEGY} from "@angular/material/autocomplete";

interface Food {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-visualizar-formularios',
  templateUrl: './visualizar-formularios.component.html',
  styleUrls: ['./visualizar-formularios.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VisualizarFormulariosComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None
})
export class VisualizarFormulariosComponent implements OnInit {

  listFormularios: FormularioResponse[];

  formInicio: FormGroup;
  listDocentes: DocenteResponse[];
  filteredOptions: Observable<DocenteResponse[]>;
  docenteControl = new FormControl({value: ''});


  listProgramas: Programa[];

  loading: boolean;


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

    this.filteredOptions = this.docenteControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.formInicio = this._formBuilder.group({
      docente: '',
    });

    this.filteredOptions = this.formInicio.get('docente').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }


  private _filter(value: any): DocenteResponse[] {
    if (typeof value === 'object') {
      let id = value.usuario.id
      value = value.usuario.nombre;
      this.formInicio.get('docente').setValue(value)
      this.filtrarPorDocente(id)
    }
    const filterValue = value.toLowerCase();
    return this.listDocentes.filter(option => option.usuario.nombre.toLowerCase().indexOf(filterValue) === 0);
  }


   filtrarPorDocente(idDocente) {
    console.log(idDocente)
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
      console.log("antes ", res)
      let aux = []
      for(let i of res){
        if(i.usuario.tipo_usuario == 2){
          aux.push(i)
        }
      }
      console.log("despues ", aux);
      this.listDocentes = aux;
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

  clearParametros() {
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
    document.location.href = URL_FORMULARIO.BASE + enlace;
  }
}
