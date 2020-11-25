import {FormularioServiceImpl} from "./http/implement/formulario.service.impl";
import {ProgramaServiceImpl} from "./http/implement/programa.service.impl";
import {ServiceImpl} from "./http/implement/service.impl";
import {NgModule} from "@angular/core";
import {DataFormularioService} from "./services/data_formulario.service";
import {DialogService} from "./services/dialogs.service";
import {DocenteServiceImpl} from "./http/implement/docente.service.impl";
import {MatDialogModule} from "@angular/material/dialog";
import {ToasterService} from "./services/toaster.service";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSelectModule} from "@angular/material/select";
import {DirectorServiceImpl} from "./http/implement/director.service.impl";
import {AuthenticationServiceImpl} from "./http/implement/authentication.service.impl";
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpResponse, HttpRequest
} from "@angular/common/http";
import {JwtInterceptor} from "./helpers/jwt.interceptor";
import {ErrorInterceptor} from "./helpers/error.interceptor";
import {EstudianteServiceImpl} from "./http/implement/estudiante.service.impl";
import {SolicitudServiceImpl} from "./http/implement/solicitud.service.impl";
import {DataUserService} from "./services/data_user.service";
import {ValidateUser} from "./services/validate_usuario.service";

@NgModule({
  declarations: [],
  imports: [
    MatDialogModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatSelectModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    FormularioServiceImpl,
    ProgramaServiceImpl,
    ServiceImpl,
    DataFormularioService,
    DataUserService,
    ValidateUser,
    DialogService,
    DocenteServiceImpl,
    ToasterService,
    DirectorServiceImpl,
    AuthenticationServiceImpl,
    EstudianteServiceImpl,
    SolicitudServiceImpl,
  ],
  entryComponents: [
  ]
})
export class CoreModule {
}
