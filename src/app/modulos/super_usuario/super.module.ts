import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ClipboardModule} from 'ngx-clipboard';
import {SuperRoutes} from "./super.routing";
import {MainSuperComponent} from "./main/main-super.component";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {ProgramasDeleteComponent} from "./programas/programas-delete/programas-delete.component";
import {ProgramasListComponent} from "./programas/programas-list/programas-list.component";
import {ProgramasAddComponent} from "./programas/programas-add/programas-add.component";
import {ProgramasEditComponent} from "./programas/programas-edit/programas-edit.component";

import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from "@angular/material/tooltip";
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
import {MatExpansionModule} from "@angular/material/expansion";
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MomentDateModule
} from "@angular/material-moment-adapter";
import {MatRadioModule} from '@angular/material/radio';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatDialogModule} from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { DirectoresAddComponent } from './directores/directores-add/directores-add.component';
import { DirectoresListComponent } from './directores/directores-list/directores-list.component';
import { DirectoresEditComponent } from './directores/directores-edit/directores-edit.component';
import { DirectoresDeleteComponent } from './directores/directores-delete/directores-delete.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SuperRoutes),
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
    ProgramasEditComponent,
    ProgramasAddComponent,
    ProgramasListComponent,
    ProgramasDeleteComponent,
    MainSuperComponent,
    DirectoresAddComponent,
    DirectoresListComponent,
    DirectoresEditComponent,
    DirectoresDeleteComponent,
  ],
  entryComponents: [
    ProgramasDeleteComponent,
    ProgramasEditComponent,
    ProgramasAddComponent,
    DirectoresAddComponent,
    DirectoresEditComponent,
    DirectoresDeleteComponent,
  ],
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

export class SuperModule {
}
