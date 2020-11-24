import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ClipboardModule} from "ngx-clipboard";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
  MatOptionModule
} from "@angular/material/core";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatDividerModule} from "@angular/material/divider";
import {MatChipsModule} from "@angular/material/chips";
import {MatExpansionModule} from "@angular/material/expansion";
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MomentDateModule
} from "@angular/material-moment-adapter";
import {MatRadioModule} from "@angular/material/radio";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatListModule} from "@angular/material/list";
import {VisualizarFormulariosComponent} from "./visualizar-formularios/visualizar-formularios.component";
import {EstudianteRoutes} from "./estudiante.routing";
import { CalificacionAsesoriaComponent } from './calificacion-asesoria/calificacion-asesoria.component';
import { ViewFormularioComponent } from './view-formulario/view-formulario.component';
import { NotPageComponent } from './not-page/not-page.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(EstudianteRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    ReactiveFormsModule,
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
    VisualizarFormulariosComponent,
    CalificacionAsesoriaComponent,
    ViewFormularioComponent,
    NotPageComponent
  ],
  entryComponents: [  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'ja-JP'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})

export class EstudianteModule {
}
