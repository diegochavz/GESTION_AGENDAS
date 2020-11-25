import {NgModule} from '@angular/core';
import {CommonModule,} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';
import {DocenteComponent} from "./modulos/docente/docente.component";
import {SuperComponent} from "./modulos/super_usuario/super.component";
import {EstudianteComponent} from "./modulos/estudiante/estudiante.component";
import {LoginComponent} from "./security/login/login.component";
import {VisualizarFormulariosComponent} from "./modulos/estudiante/visualizar-formularios/visualizar-formularios.component";
import {AuthGuard} from "./core/helpers/auth.guard";
import {DirectorModule} from "./modulos/director/director.module";
import {DirectorComponent} from "./modulos/director/director.component";
import {ViewFormularioComponent} from "./modulos/estudiante/view-formulario/view-formulario.component";
import {NotPageComponent} from "./modulos/estudiante/not-page/not-page.component";

const routes: Routes = [
  {
    path: '',
    component: VisualizarFormulariosComponent,
    pathMatch:"full",
  }
  , {
    path: 'login',
    component: LoginComponent,
    pathMatch:"full",
  },
  {
    path: 'formulario/:enlace',
    component: ViewFormularioComponent,
    pathMatch:"full",
  },
  {
    path: 'not-page',
    component: NotPageComponent,
    pathMatch:"full",
  }
  , {
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
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/modulos/super_usuario/super.module').then(m => m.SuperModule)
      },
    ]
  }
  , {
    path: 'docente',
   canActivate: [AuthGuard],
    component: DocenteComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/modulos/docente/docente.module').then(m => m.DocenteModule)
      }
    ]
  }
  , {
    path: 'director',
    canActivate: [AuthGuard],
    component: DirectorComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/modulos/director/director.module').then(m => m.DirectorModule)
      }
    ]
  }
  , {
    path: '**',
    redirectTo: ''
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
