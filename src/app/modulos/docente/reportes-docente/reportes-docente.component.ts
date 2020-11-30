import {Component, OnInit} from '@angular/core';
import {DocenteServiceImpl} from "../../../core/http/implement/docente.service.impl";
import Formulario from "../../../core/models/formulario.model";
import {MatTableDataSource} from "@angular/material/table";
import {FormularioServiceImpl} from "../../../core/http/implement/formulario.service.impl";
import {ValidateService} from "../../../core/services/validators";
import {AuthenticationServiceImpl} from "../../../core/http/implement/authentication.service.impl";
import {TIPO_USER} from "../../../core/constants/tipo_user.constants";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Pregunta from "../../../core/models/pregunta.model";
import {ToasterService} from "../../../core/services/toaster.service";
import SolicitudResponse from "../../../core/models/solicitud_response.model";
import {DateAdapter} from "@angular/material/core";
import Reporte from "../../../core/models/reporte.model";
import * as moment from "moment";
import {SolicitudServiceImpl} from "../../../core/http/implement/solicitud.service.impl";

@Component({
  selector: 'app-reportes-docente',
  templateUrl: './reportes-docente.component.html',
  styleUrls: ['./reportes-docente.component.scss']
})
export class ReportesDocenteComponent implements OnInit {

  displayedColumns: string[];
  dataSource: MatTableDataSource<any>;
  data: Array<any>

  loading: boolean;
  listFormularios: Array<Formulario>
  formReporteAsesorias: FormGroup;
  formReporteFormularios: FormGroup;

  constructor(private docenteService: DocenteServiceImpl,
              private formularioService: FormularioServiceImpl,
              private validate: ValidateService,
              private authenticationService: AuthenticationServiceImpl,
              private _formBuilder: FormBuilder,
              private _adapter: DateAdapter<any>,
              private solicitudService: SolicitudServiceImpl) {
    this.validate.validateTipoUser(authenticationService.currentUserValue.tipo_usuario, TIPO_USER.DOCENTE)
    this._adapter.setLocale('es');
    this.loading = true;
    this.listFormularios = [];
    this.data = [];
    this.displayedColumns = [];
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getFormularios();
    this.crearFormReporte();
    this.crearReporteFormularios();
  }

  getFormularios() {
    this.loading = false;
    this.docenteService.getFormulariosByDocente(this.authenticationService.currentUserValue.user_id).subscribe((listFormularios: Array<Formulario>) => {
        console.log(listFormularios)
        this.listFormularios = listFormularios;
      }, () => {
        console.log("ERROR AL CARGAR FORMULARIOS")
      }, () => {
        this.loading = true;
      }
    )
  }

  crearReporteFormularios() {
    this.formReporteFormularios = this._formBuilder.group({
      fecha_inicio: ['',[Validators.required]],
      fecha_fin:['',[Validators.required]],
      asistida: [false],
      no_asistida: [false],
      nombreFormulario: [false],
      ubicacionFormulario: [false],
      enlaceFormulario: [false],
      fecha_solicitada: [false],
      hora_solicitada: [false],
      get_estudiantes: [false],
      get_respuestas: [false],
      es_virtual: [false],
      estado: [false],
      atendida: [false],
      calificada: [false],
      calificacion: [false],
      observaciones_calificacion: [false],
      fecha_calificacion: [false],
      fecha_registro: [false],
    });

  }

  crearFormReporte() {
    this.formReporteAsesorias = this._formBuilder.group({
      formulario: [null],
      fecha_inicio: ['',[Validators.required]],
      fecha_fin:['',[Validators.required]],
    })
    this.formReporteAsesorias.get('formulario').valueChanges.subscribe(res => {
      this.consultarPreguntasForColumns(res);
    })
  }

  consultarPreguntasForColumns(idFormulario: number) {
    this.loading = false;
    this.docenteService.getSolicitudesByDocente(this.authenticationService.currentUserValue.user_id).subscribe((res: SolicitudResponse[]) => {
        console.log(res)
        console.log(idFormulario)
        this.data = [];
        for (let i of res) {
          if (idFormulario == i.formulario) {
            this.data.push(i.respuestas_data)
          }
        }
        console.log("formulario ", this.data)
        this.dataSource.data = this.data;

        this.displayedColumns = [];
        if (this.data.length > 0) {
          for (let i of this.data[0]) {
            this.displayedColumns.push(i.nombre_pregunta)
          }
        }
        console.log(this.displayedColumns)
      }, () => {
        console.log("ERROR CONSULTAR PREGUNTAS")
      }, () => {
        this.loading = true;
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  generarReporteSolicitudes() {
    let auxReport = new Reporte();
    console.log(this.formReporteFormularios.value)

    if(this.formReporteFormularios.value.fecha_inicio!=''){
      auxReport.fecha_inicio = moment(this.formReporteFormularios.value.fecha_inicio).format("YYYY-MM-DD")
    }

    if(this.formReporteFormularios.value.fecha_fin!=''){
      auxReport.fecha_final = moment(this.formReporteFormularios.value.fecha_fin).format("YYYY-MM-DD")
    }

    auxReport.asistida = this.formReporteFormularios.value.asistida;
    auxReport.no_asistida = this.formReporteFormularios.value.no_asistida;
    let camposAux = new Array<string>();

    if (this.formReporteFormularios.value.nombreFormulario == true) {
      camposAux.push("formulario.nombre_formulario")
    }

    if (this.formReporteFormularios.value.ubicacionFormulario == true) {
      camposAux.push("formulario.ubicacion_formulario")
    }

    if (this.formReporteFormularios.value.enlaceFormulario == true) {
      camposAux.push("formulario.enlace_uuid_formulario")
    }

    if (this.formReporteFormularios.value.fecha_solicitada == true) {
      camposAux.push("fecha_solicitada");
    }

    if (this.formReporteFormularios.value.hora_solicitada == true) {
      camposAux.push("hora_solicitada");
    }

    if (this.formReporteFormularios.value.get_estudiantes == true) {
      camposAux.push("get_estudiantes");
    }

    if (this.formReporteFormularios.value.get_respuestas == true) {
      camposAux.push("get_respuestas");
    }

    if (this.formReporteFormularios.value.es_virtual == true) {
      camposAux.push("es_virtual");
    }

    if (this.formReporteFormularios.value.estado == true) {
      camposAux.push("estado");
    }

    if (this.formReporteFormularios.value.atendida == true) {
      camposAux.push("atendida");
    }


    if (this.formReporteFormularios.value.calificacion == true) {
      camposAux.push("calificacion");
    }

    if (this.formReporteFormularios.value.calificada == true) {
      camposAux.push("calificada");
    }

    if (this.formReporteFormularios.value.observaciones_calificacion == true) {
      camposAux.push("observaciones_calificacion");
    }

    if (this.formReporteFormularios.value.fecha_calificacion == true) {
      camposAux.push("fecha_calificacion");
    }

    if (this.formReporteFormularios.value.fecha_registro == true) {
      camposAux.push("fecha_registro");
    }

    auxReport.campos = camposAux;

    this.loading = false;
    this.solicitudService.generarReporte(auxReport).subscribe(res => {
    console.log(" reporte ", res)
    })

  }

}
