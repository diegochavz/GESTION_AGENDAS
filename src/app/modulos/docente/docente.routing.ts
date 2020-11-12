import { Routes } from '@angular/router';
import { Principal_docenteComponent} from "./main/principal_docente.component";
import {CrearFormularioDocenteComponent} from "./formularios/formularios_add/formulario_add.component";
import {FormulariosShowComponent} from "./formularios/formularios-show/formularios-show.component";

export const DocenteDashboardRoutes: Routes = [
  { path: 'principal',      component: Principal_docenteComponent },
  { path: 'crear-formulario',      component: CrearFormularioDocenteComponent },
  { path: 'n',      component: FormulariosShowComponent },

];
