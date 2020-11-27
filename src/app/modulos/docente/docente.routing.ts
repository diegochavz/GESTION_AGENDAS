import { Routes } from '@angular/router';
import { MainDocenteComponent} from "./main/main_docente.component";
import {CrearFormularioDocenteComponent} from "./formularios/formularios_add/formulario_add.component";
import {FormulariosListComponent} from "./formularios/formularios-list/formularios-list.component";
import {FormulariosEditComponent} from "./formularios/formularios-edit/formularios-edit.component";
import {EstudiantesListComponent} from "./estudiantes/estudiantes-list/estudiantes-list.component";
import {SolicitudesListComponent} from "./solicitudes/solicitudes-list/solicitudes-list.component";

export const DocenteRoutes: Routes = [
  { path: '',component: MainDocenteComponent },
  { path: 'crear-formulario',      component: CrearFormularioDocenteComponent },
  { path: 'editar-formulario',      component: FormulariosEditComponent },
  { path: 'listar-formularios',      component: FormulariosListComponent },
  { path: 'listar-estudiantes',      component: EstudiantesListComponent },
  { path: 'listar-asesorias',      component: SolicitudesListComponent },
];
