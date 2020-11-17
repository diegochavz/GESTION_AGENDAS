import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import {DocenteDashboardRoutes} from "./docente.routing";
import {Principal_docenteComponent} from "./main/principal_docente.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CrearFormularioDocenteComponent } from './formularios/formularios_add/formulario_add.component';
import {MatStepperModule} from '@angular/material/stepper';
//import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from '@angular/material/button';
import{MatTooltipModule} from "@angular/material/tooltip";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {MatIconModule} from "@angular/material/icon";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatProgressBarModule} from '@angular/material/progress-bar';

import {MatDividerModule} from "@angular/material/divider";
import {MatChipsModule} from "@angular/material/chips";
import { FormulariosShowComponent } from './formularios/formularios-show/formularios-show.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MomentDateModule
} from "@angular/material-moment-adapter";
import {MatRadioModule} from '@angular/material/radio';
import { FormulariosListComponent } from './formularios/formularios-list/formularios-list.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import { FormulariosEditComponent } from './formularios/formularios-edit/formularios-edit.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AsesoriasListComponent } from './asesorias/asesorias-list/asesorias-list.component';
import { AsesoriaShowComponent } from './asesorias/asesorias-show/asesorias-show.component';
import {MatListModule} from '@angular/material/list';
import { FormulariosDeleteComponent } from './formularios/formularios-delete/formularios-delete.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";


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
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatListModule,
  ],
  declarations: [
    Principal_docenteComponent,
    CrearFormularioDocenteComponent,
    FormulariosShowComponent,
    FormulariosListComponent,
    FormulariosEditComponent,
    AsesoriasListComponent,
    AsesoriaShowComponent,
    FormulariosDeleteComponent,
  ],
  entryComponents:[FormulariosDeleteComponent]
  ,
  providers:[
    {provide: MAT_DATE_LOCALE, useValue: 'ja-JP'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})

export class DocenteModule {}
