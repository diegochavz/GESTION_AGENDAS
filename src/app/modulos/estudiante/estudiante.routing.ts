import {Routes} from "@angular/router";
import {VisualizarFormulariosComponent} from "./visualizar-formularios/visualizar-formularios.component";
import {CalificacionAsesoriaComponent} from "./calificacion-asesoria/calificacion-asesoria.component";

export const EstudianteRoutes: Routes = [
  { path: 'formularios',      component: VisualizarFormulariosComponent  },
  { path: 'calificacion-asesoria',      component: CalificacionAsesoriaComponent  },
];
