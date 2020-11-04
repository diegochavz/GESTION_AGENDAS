import { Routes } from '@angular/router';
import { Principal_docenteComponent} from "./principal_docente/principal_docente.component";
import {CrearFormularioDocenteComponent} from "./formularios/formularios_add/formulario_add.component";

export const DocenteDashboardRoutes: Routes = [
  { path: 'principal',      component: CrearFormularioDocenteComponent },
];
