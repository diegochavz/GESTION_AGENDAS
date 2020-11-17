import { Routes } from '@angular/router';
import { Principal_docenteComponent} from "./main/principal_docente.component";
import {CrearFormularioDocenteComponent} from "./formularios/formularios_add/formulario_add.component";
import {FormulariosShowComponent} from "./formularios/formularios-show/formularios-show.component";
import {FormulariosListComponent} from "./formularios/formularios-list/formularios-list.component";
import {FormulariosEditComponent} from "./formularios/formularios-edit/formularios-edit.component";

export const DocenteDashboardRoutes: Routes = [
  { path: 'principal',      component: Principal_docenteComponent },
  { path: 'crear-formulario',      component: CrearFormularioDocenteComponent },
  { path: 'editar-formulario',      component: FormulariosEditComponent },
  { path: 'listar-formularios',      component: FormulariosListComponent },

];
