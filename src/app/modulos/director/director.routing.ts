import {Routes} from "@angular/router";
import {MainDirectorComponent} from "./main/main_director.component";
import {DocentesListComponent} from "./docentes/docentes-list/docentes-list.component";
import {FormulariosListComponent} from "../docente/formularios/formularios-list/formularios-list.component";
import {CrearFormularioDocenteComponent} from "../docente/formularios/formularios_add/formulario_add.component";
import {FormulariosEditComponent} from "../docente/formularios/formularios-edit/formularios-edit.component";
import {EstudiantesListComponent} from "../docente/estudiantes/estudiantes-list/estudiantes-list.component";
import {SolicitudesListComponent} from "../docente/solicitudes/solicitudes-list/solicitudes-list.component";

export const DirectorRoutes: Routes = [
  { path: '',      component: MainDirectorComponent },
  { path: 'listar-docentes',      component: DocentesListComponent },
  { path: 'crear-formulario',      component: CrearFormularioDocenteComponent },
  { path: 'editar-formulario',      component: FormulariosEditComponent },
  { path: 'listar-formularios',      component: FormulariosListComponent },
  { path: 'listar-estudiantes',      component: EstudiantesListComponent },
  { path: 'listar-asesorias',      component: SolicitudesListComponent },
];
