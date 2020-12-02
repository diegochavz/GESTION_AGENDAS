import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import FormularioResponse from "../../../core/models/formulario_response.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {SolicitudServiceImpl} from "../../../core/http/implement/solicitud.service.impl";
import SolicitudResponse from "../../../core/models/solicitud_response.model";
import {ToasterService} from "../../../core/services/toaster.service";

@Component({
  selector: 'app-calificacion-asesoria',
  templateUrl: './calificacion-asesoria.component.html',
  styleUrls: ['./calificacion-asesoria.component.scss']
})
export class CalificacionAsesoriaComponent implements OnInit {

  test: Date = null;
  eleccion: string;
  escala: number;
  formData: FormGroup;
  idSolicitud: number;

  constructor(private route: ActivatedRoute,
              private routes: Router,
              private _formBuilder: FormBuilder,
              private solicitudService: SolicitudServiceImpl,
              private toasterService: ToasterService) {
    const uuid = this.route.snapshot.paramMap.get('enlace');
    this.getViewCalificacion(uuid);
    this.escala = 0;
  }

  ngOnInit(): void {
    this.test = new Date();
    this.eleccion = '';
    this.formData = this._formBuilder.group({
      observacion: [],
    })
  }

  getViewCalificacion(uuid) {
    this.solicitudService.getSolicitudCalificacion(uuid).subscribe((res: SolicitudResponse) => {
      if (res != null && res != undefined) {
        this.idSolicitud = res[0].id;
      } else {
        this.toasterService.openSnackBarCumtom(
          'Calificación de asesoría no encontrada',
          'error')
        this.routes.navigate(['/not-page'])
      }
    }, (error) => {
      this.toasterService.openSnackBarCumtom(
        error,
        'error')
      this.routes.navigate(['/not-page'])
    }, () => {
    })
  }

  onSelection(id: number) {
    switch (id) {
      case 1:
        this.escala = 1;
        this.eleccion = "NADA SATISFECHO";
        break;
      case 2:
        this.escala = 2;
        this.eleccion = "POCO SATISFECHO";
        break;
      case 3:
        this.escala = 3;
        this.eleccion = "NEUTRAL";
        break;
      case 4:
        this.escala = 4;
        this.eleccion = "MUY SATISFECHO";
        break;
      case 5:
        this.escala = 5;
        this.eleccion = "TOTALMENTE SATISFECHO";
        break;
    }
  }

  onSubmit() {
    if (this.escala > 0) {
      let val = this.formData.get("observacion").value;
      this.solicitudService.setCalificacionAsesoria(this.idSolicitud, this.escala, val).subscribe(()=>{
        this.toasterService.openSnackBarCumtom(
          'Calificación realizada satisfactoriamente',
          'success')
        this.routes.navigate(['/'])
      },(error)=>{
        this.toasterService.openSnackBarCumtom(
          error,
          'error')
      })
    }
  }
}
