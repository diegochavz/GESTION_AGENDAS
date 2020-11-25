import RouteModel from "../models/route.model";
import {SolicitudesListComponent} from "../../modulos/docente/solicitudes/solicitudes-list/solicitudes-list.component";

export const ROUTES_CONST_DOCENTE: RouteModel[] = [
  {path: '/docente/main-docente', title: 'Inicio', icon: 'ni-tv-2 text-primary'},
  {path: '/docente/listar-formularios', title: 'Gestionar formularios', icon: 'ni-tv-2 text-primary'},
  {path: '/docente/listar-estudiantes', title: 'Gestionar estudiantes', icon: 'ni-tv-2 text-primary'},
  {path: '/docente/listar-asesorias', title: 'Gestionar asesorías', icon: 'ni-tv-2 text-primary'},

];

export const ROUTES_CONST_DIRECTOR: RouteModel[] = [
  {path: '/director/main-director', title: 'Inicio', icon: 'ni-tv-2 text-primary'},
  {path: '/director/listar-docentes', title: 'Gestionar docentes', icon: 'ni-tv-2 text-primary'},
  {path: '/director/listar-formularios', title: 'Gestionar formularios', icon: 'ni-tv-2 text-primary'},
  {path: '/director/listar-estudiantes', title: 'Gestionar estudiantes', icon: 'ni-tv-2 text-primary'},
  {path: '/director/listar-asesorias', title: 'Gestionar asesorías', icon: 'ni-tv-2 text-primary'},

];

export const ROUTES_CONST_SUPER: RouteModel[] = [
  {path: '/super/main-super', title: 'Inicio', icon: 'ni-tv-2 text-primary'},
  {path: '/super/listar-programas', title: 'Gestionar programas', icon: 'ni-tv-2 text-primary'},
  {path: '/super/listar-directores', title: 'Gestionar directores', icon: 'ni-tv-2 text-primary'},
];


