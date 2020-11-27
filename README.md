![alt text](https://gitlab.com/agendas_docentes_ufps/agendas_ft/-/raw/master/src/assets/img/readme/HEADER_FE.png)
# Título del proyecto:

#### Gestión de asesorías academicas
***
## Índice
1. [Características](#caracter-sticas-)
2. [Contenido del proyecto](#contenido-del-proyecto)
3. [Tecnologías](#tecnologías)
4. [IDE](#ide)
5. [Instalación](#instalación)
6. [Demo](#demo)
7. [Autor(es)](#autores)
8. [Institución Académica](#institución-académica)
***

#### Características:

 - Administración de horarios de atención.
 - Restricción a solicitud de asesoría.
 - Establecimiento de datos básicos del formulario
 - Creación de campos dinámicos.
 - Visualización del formulario de asesoría  
 - Generación de URL del formulario.
 - Administración de formularios de asesoría.
 - Administración de agenda de asesorías 
 - Administración de estudiantes
 - Administración de autorizaciones para asesoría.
 - Administración de docentes del plan de estudios.
 - Administración de planes de estudio.
 - Modificación de información académica del docente.
 - Generación de reporte de asesorías
 - Solicitud de asesoría académica.
 - Calificación de asesoría académica
 - Visualización de formularios de asesoría del plan de estudios.
 - Generación de reporte de asesorías por docente.
 - Inicio de sesión

***
  #### Contenido del PROYECTO  

1. [components](https://gitlab.com/agendas_docentes_ufps/agendas_ft/-/tree/master/src/app/components): componentes compartidos entres vistas
2. [core](https://gitlab.com/agendas_docentes_ufps/agendas_ft/-/tree/master/src/app/core): Servicios utilizados para la organización del codigo del sistema.
3. [modulos](https://gitlab.com/agendas_docentes_ufps/agendas_ft/-/tree/master/src/app/modulos): Modulos del sistema de gestión de asesorías
   - [director](https://gitlab.com/agendas_docentes_ufps/agendas_ft/-/tree/master/src/app/modulos/director):Seccción con módulos relacionados al rol director
     - [docentes](https://gitlab.com/agendas_docentes_ufps/agendas_ft/-/tree/master/src/app/modulos/director/docentes): Módulo para la gestión de docentes  
     - [main](https://gitlab.com/agendas_docentes_ufps/agendas_ft/-/tree/master/src/app/modulos/director/main): Módulo principal (dashboard) de la sección director
       - [director.component.html](https://gitlab.com/agendas_docentes_ufps/agendas_ft/-/blob/master/src/app/modulos/director/director.component.html): template de la sección director
       - [director.component.ts](https://gitlab.com/agendas_docentes_ufps/agendas_ft/-/blob/master/src/app/modulos/director/director.component.ts): Logica template de la sección director 
       - [director.module.ts](https://gitlab.com/agendas_docentes_ufps/agendas_ft/-/blob/master/src/app/modulos/director/director.module.ts): contenedor de controladores, directivas y servicios utilizados en la sección director
       - [director.routing.ts](https://gitlab.com/agendas_docentes_ufps/agendas_ft/-/blob/master/src/app/modulos/director/director.routing.ts): Listado de rutas soportadas por la sección director
   - [docente](https://gitlab.com/agendas_docentes_ufps/agendas_ft/-/tree/master/src/app/modulos/docente):Seccción con módulos relacionados al rol docente
     - [estudiantes](https://gitlab.com/agendas_docentes_ufps/agendas_ft/-/tree/master/src/app/modulos/docente/estudiantes): Módulo para la gestión de estudiantes 
     - [formularios](https://gitlab.com/agendas_docentes_ufps/agendas_ft/-/tree/master/src/app/modulos/docente/formularios): Módulo para la gestión de formularios 
     - [solicitudes](https://gitlab.com/agendas_docentes_ufps/agendas_ft/-/tree/master/src/app/modulos/docente/solicitudes): Módulo para la gestión de solicitudes 
     - [main](https://gitlab.com/agendas_docentes_ufps/agendas_ft/-/tree/master/src/app/modulos/docente/main): Módulo principal (dashboard) de la sección docente   
       - [docente.component.html](https://gitlab.com/agendas_docentes_ufps/agendas_ft/-/blob/master/src/app/modulos/docente/docente.component.html): template de la sección docente
       - [docente.component.ts](https://gitlab.com/agendas_docentes_ufps/agendas_ft/-/blob/master/src/app/modulos/docente/docente.component.ts): controlador template de la sección docente 
       - [docente.module.ts](https://gitlab.com/agendas_docentes_ufps/agendas_ft/-/blob/master/src/app/modulos/docente/docente.module.ts): contenedor de controladores, directivas y servicios utilizados en la sección docente
       - [docente.routing.ts](https://gitlab.com/agendas_docentes_ufps/agendas_ft/-/blob/master/src/app/modulos/docente/docente.routing.ts): Listado de rutas soportadas por la sección docente
   - [estudiante](https://gitlab.com/agendas_docentes_ufps/agendas_ft/-/tree/master/src/app/modulos/estudiante):Seccción con componentes relacionados al rol estudiante (vistas publicas del sistema)
     - [calificacion_asesoria](https://gitlab.com/agendas_docentes_ufps/agendas_ft/-/tree/master/src/app/modulos/estudiante/calificacion-asesoria):  Componente para calificación de la asesoría académica.
     - [not_page](https://gitlab.com/agendas_docentes_ufps/agendas_ft/-/tree/master/src/app/modulos/estudiante/not-page): Componente objetivo de redireccionamiento con rutas no soportadas.
     - [visualizar_formularios](https://gitlab.com/agendas_docentes_ufps/agendas_ft/-/tree/master/src/app/modulos/estudiante/visualizar-formularios): Modulo de visualización principal del sistema (index)
     - [view-formulario](https://gitlab.com/agendas_docentes_ufps/agendas_ft/-/tree/master/src/app/modulos/estudiante/view-formulario): Componente de diligenciamiento del formulario de asesoría.
       - [estudiante.component.html](https://gitlab.com/agendas_docentes_ufps/agendas_ft/-/blob/master/src/app/modulos/estudiante/estudiante.component.html): template de la sección estudiante
       - [estudiante.component.ts](https://gitlab.com/agendas_docentes_ufps/agendas_ft/-/blob/master/src/app/modulos/estudiante/estudiante.component.ts): controlador template de la sección estudiante 
       - [estudiante.module.ts](https://gitlab.com/agendas_docentes_ufps/agendas_ft/-/blob/master/src/app/modulos/estudiante/estudiante.module.ts): contenedor de controladores, directivas y servicios utilizados en la sección estudiante
       - [estudiante.routing.ts](https://gitlab.com/agendas_docentes_ufps/agendas_ft/-/blob/master/src/app/modulos/estudiante/estudiante.routing.ts): Listado de rutas soportadas por la sección estudiante
   - [super_usuario](https://gitlab.com/agendas_docentes_ufps/agendas_ft/-/tree/master/src/app/modulos/super_usuario):Seccción con módulos relacionados al rol super usuario
     - [directores](https://gitlab.com/agendas_docentes_ufps/agendas_ft/-/tree/master/src/app/modulos/super_usuario/directores): Módulo para la gestión de directores 
     - [programas](https://gitlab.com/agendas_docentes_ufps/agendas_ft/-/tree/master/src/app/modulos/super_usuario/programas): Módulo para la gestión de programas 
     - [main](https://gitlab.com/agendas_docentes_ufps/agendas_ft/-/tree/master/src/app/modulos/super_usuario/main): Módulo principal (dashboard) de la sección super usuario
       - [super.component.html](https://gitlab.com/agendas_docentes_ufps/agendas_ft/-/blob/master/src/app/modulos/super_usuario/super.component.html): template de la sección super usuario
       - [super.component.ts](https://gitlab.com/agendas_docentes_ufps/agendas_ft/-/blob/master/src/app/modulos/super_usuario/super.component.ts): controlador template de la sección super usuario 
       - [super.module.ts](https://gitlab.com/agendas_docentes_ufps/agendas_ft/-/blob/master/src/app/modulos/super_usuario/super.module.ts): contenedor de controladores, directivas y servicios utilizados en la sección super usuario
       - [super.routing.ts](https://gitlab.com/agendas_docentes_ufps/agendas_ft/-/blob/master/src/app/modulos/super_usuario/super.routing.ts): Listado de rutas soportadas por la sección super usuario        
4. security: Seccción  de seguridad del sistema
   - [login](https://gitlab.com/agendas_docentes_ufps/agendas_ft/-/tree/master/src/app/security/login): Módulo para el inicio de sesión de docentes/directores/super usuario
  
***
#### Tecnologías

  - TypeScript 4.0.5
  - Angular CLI 10.2.0
  - Node 10.15.3
  - HTML5
  - CSS

  ***
#### IDE

- WebStorm 2020.2.3

***
### Instalación

1.	Instalar [NodeJS](https://nodejs.org/en/download/)
2.	Instalar Angular CLI sobre el sistema ejecutando el comando **npm install -g @angular/cli**
3.	Descargar (o clonar) el proyecto “Angendas-ft” desde el [repositorio del proyecto](https://gitlab.com/agendas_docentes_ufps/agendas_ft.git) 
4.	Instalar los paquetes npm requeridos por la aplicación ejecutando Ejecuta el comando **npm install** para la descarga de paquetes npm de la aplicación (realizarce sobre la carpeta root del proyecto).
5.	Inicia la aplicación con el comando **ng serve --o**. 

***
### Demo

Para ver el demo de la aplicación puede dirigirse a: [Gestión de asesorías académicas](http://23.251.145.118:9000/#/).

***
### Autor(es)
Proyecto desarrollado por:

1. Alvaro Arlex Perez Moncada (<alvaroarlexpm@ufps.edu.co>).
2. Yhuver Andrey Quintero niño (<yhuverandreyqn@ufps.edu.co>).
3. Diego Alejandro Chavez Parra (<diegoalejandrocp@ufps.edu.co>).

***
### Institución Académica   
Proyecto desarrollado en el curso de profundización en Desarrollo de Software del  [Programa de Ingeniería de Sistemas] de la [Universidad Francisco de Paula Santander]

   [Programa de Ingeniería de Sistemas]:<https://ingsistemas.cloud.ufps.edu.co/>
   [Universidad Francisco de Paula Santander]:<https://ww2.ufps.edu.co/>
