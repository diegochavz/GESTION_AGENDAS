import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {DocenteDashboardRoutes} from "./docente_dashboard.routing";
import {Principal_docenteComponent} from "../../components/docente_components/principal_docente/principal_docente.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DocenteDashboardRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
  ],
  declarations: [
    Principal_docenteComponent,
  ]
})

export class DocenteDashboardModule {}
