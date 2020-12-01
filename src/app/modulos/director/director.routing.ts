import {Routes} from "@angular/router";
import {MainDirectorComponent} from "./main/main_director.component";
import {DocentesListComponent} from "./docentes/docentes-list/docentes-list.component";
import {PerfilDirectorComponent} from "./perfil-director/perfil-director.component";

export const DirectorRoutes: Routes = [
  { path: '',      component: MainDirectorComponent },
  { path: 'listar-docentes',      component: DocentesListComponent },
  { path: 'editar-perfil',      component: PerfilDirectorComponent },
];
