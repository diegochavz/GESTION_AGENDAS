import {Routes} from "@angular/router";
import {ProgramasListComponent} from "./programas/programas-list/programas-list.component";
import {MainSuperComponent} from "./main/main-super.component";
import {DirectoresListComponent} from "./directores/directores-list/directores-list.component";

export const SuperRoutes: Routes = [
  { path: '',      component: MainSuperComponent },
  { path: 'listar-programas',      component: ProgramasListComponent },
  { path: 'listar-directores',      component: DirectoresListComponent },
];
