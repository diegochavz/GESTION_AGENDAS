import {Component, OnInit} from '@angular/core';
import {DocenteServiceImpl} from "../../../core/http/implement/docente.service.impl";
import Formulario from "../../../core/models/formulario.model";
import {MatTableDataSource} from "@angular/material/table";
import {FormularioServiceImpl} from "../../../core/http/implement/formulario.service.impl";
import {ValidateService} from "../../../core/services/validators";
import {AuthenticationServiceImpl} from "../../../core/http/implement/authentication.service.impl";
import {TIPO_USER} from "../../../core/constants/tipo_user.constants";
import {FormBuilder, FormGroup} from "@angular/forms";
import Pregunta from "../../../core/models/pregunta.model";
import {ToasterService} from "../../../core/services/toaster.service";
import SolicitudResponse from "../../../core/models/solicitud_response.model";
import {DateAdapter} from "@angular/material/core";

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
  formReporte: FormGroup;

  constructor(private docenteService: DocenteServiceImpl,
              private formularioService: FormularioServiceImpl,
              private validate: ValidateService,
              private authenticationService: AuthenticationServiceImpl,
              private _formBuilder: FormBuilder,
              private _adapter: DateAdapter<any>) {
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

  crearFormReporte() {
    this.formReporte = this._formBuilder.group({
      formulario: [null],
      fecha_inicio:[''],
      fecha_fin:[''],
    })
    this.formReporte.get('formulario').valueChanges.subscribe(res => {
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
        console.log("formulario ",this.data)
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


}
