import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import {DocenteDashboardComponent} from "./dashboards/docente_dashboard/docente_dashboard.component";
import { CrearFormularioDocenteComponent} from "./dashboards/docente_dashboard/formularios/formularios_add/formulario_add.component";

const routes: Routes =[
  {
    path: '',
    redirectTo: 'principal',
    pathMatch: 'full',
  }, {
    path: '',
    component: DocenteDashboardComponent,
    children: [
      {
        path: '',
        /*loadChildren: () => import('src/app/dashboards/docente_dashboard/docente_dashboard.module').then(m => m.DocenteDashboardModule)*/
        loadChildren: () => import('src/app/dashboards/docente_dashboard/docente_dashboard.module').then(m => m.DocenteDashboardModule)
      }
    ]
  }, {
    path: '**',
    redirectTo: 'principal'
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
