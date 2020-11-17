import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import {DocenteComponent} from "./modulos/docente/docente.component";
import { CrearFormularioDocenteComponent} from "./modulos/docente/formularios/formularios_add/formulario_add.component";

const routes: Routes =[
  {
    path: '',
    redirectTo: 'principal',
    pathMatch: 'full',
  }, {
    path: '',
    component: DocenteComponent,
    children: [
      {
        path: '',
        /*loadChildren: () => import('src/app/modulos/docente/docente.module').then(m => m.DocenteModule)*/
        loadChildren: () => import('src/app/modulos/docente/docente.module').then(m => m.DocenteModule)
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
