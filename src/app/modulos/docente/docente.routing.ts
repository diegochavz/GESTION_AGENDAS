import { Routes } from '@angular/router';
import { MainDocenteComponent} from "./main/main_docente.component";
import {CrearFormularioDocenteComponent} from "./formularios/formularios_add/formulario_add.component";
import {FormulariosListComponent} from "./formularios/formularios-list/formularios-list.component";
import {FormulariosEditComponent} from "./formularios/formularios-edit/formularios-edit.component";

export const DocenteRoutes: Routes = [
  { path: 'main-docente',      component: MainDocenteComponent },
  { path: 'crear-formulario',      component: CrearFormularioDocenteComponent },
  { path: 'editar-formulario',      component: FormulariosEditComponent },
  { path: 'listar-formularios',      component: FormulariosListComponent },
];
