import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import {DocenteDashboardRoutes} from "./docente_dashboard.routing";
import {Principal_docenteComponent} from "./principal_docente/principal_docente.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CrearFormularioDocenteComponent } from './crear_formulario_docente/crear_formulario_docente.component';
import {MatStepperModule} from '@angular/material/stepper';
//import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from '@angular/material/button';
import{MatTooltipModule} from "@angular/material/tooltip";
import {MatFormFieldModule} from '@angular/material/form-field';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DocenteDashboardRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    MatStepperModule,
    ReactiveFormsModule,
   // MatFormFieldModule,
    MatButtonModule,
    MatTooltipModule,
    MatFormFieldModule,
  ],
  declarations: [
    Principal_docenteComponent,
    CrearFormularioDocenteComponent,
  ]
})

export class DocenteDashboardModule {}
