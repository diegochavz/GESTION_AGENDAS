import {Routes} from "@angular/router";
import {MainDirectorComponent} from "./main/main_director.component";
import {DocentesListComponent} from "./docentes/docentes-list/docentes-list.component";

export const DirectorRoutes: Routes = [
  { path: 'main-director',      component: MainDirectorComponent },
  { path: 'listar-docentes',      component: DocentesListComponent },
];
