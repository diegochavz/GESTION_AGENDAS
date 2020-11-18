import {NgModule} from '@angular/core';
import {CommonModule,} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';
import {DocenteComponent} from "./modulos/docente/docente.component";
import {SuperComponent} from "./modulos/super_usuario/super.component";
import {EstudianteComponent} from "./modulos/estudiante/estudiante.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'super',
    pathMatch: 'full',
  },
  {
    path: 'estudiante',
    component: EstudianteComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/modulos/estudiante/estudiante.module').then(m => m.EstudianteModule)
      },
    ]
  }
  , {
    path: 'super',
    component: SuperComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/modulos/super_usuario/super.module').then(m => m.SuperModule)
      },
    ]
  }
  , {
    path: 'docente',
    component: DocenteComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/modulos/docente/docente.module').then(m => m.DocenteModule)
      }
    ]
  },
  {
    path: 'director',
    component: DocenteComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/modulos/director/director.module').then(m => m.DirectorModule)
      }
    ]
  }
  , {
    path: '**',
    redirectTo: 'main'
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [],
})
export class AppRoutingModule {
}
