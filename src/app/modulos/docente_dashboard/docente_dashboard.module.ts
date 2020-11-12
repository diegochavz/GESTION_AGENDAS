import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import {DocenteDashboardRoutes} from "./docente_dashboard.routing";
import {Principal_docenteComponent} from "./principal_docente/principal_docente.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CrearFormularioDocenteComponent } from './formularios/formularios_add/formulario_add.component';
import {MatStepperModule} from '@angular/material/stepper';
//import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from '@angular/material/button';
import{MatTooltipModule} from "@angular/material/tooltip";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {MatIconModule} from "@angular/material/icon";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatProgressBarModule} from '@angular/material/progress-bar';

import {MatDividerModule} from "@angular/material/divider";
import {MatChipsModule} from "@angular/material/chips";
import { FormulariosShowComponent } from './formularios/formularios-show/formularios-show.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MomentDateModule} from "@angular/material-moment-adapter";
import {MatRadioModule} from '@angular/material/radio';

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
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatDividerModule,
    MatChipsModule,
    MatExpansionModule,
    MomentDateModule,
    MatRadioModule,
  ],
  declarations: [
    Principal_docenteComponent,
    CrearFormularioDocenteComponent,
    FormulariosShowComponent,
  ]
})

export class DocenteDashboardModule {}
