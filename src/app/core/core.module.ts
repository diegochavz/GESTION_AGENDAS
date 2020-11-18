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

@NgModule({
  declarations: [],
  imports: [
    MatDialogModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatSelectModule,
  ],
  providers: [
    FormularioServiceImpl,
    ProgramaServiceImpl,
    ServiceImpl,
    DataFormularioService,
    DialogService,
    DocenteServiceImpl,
    ToasterService,
    DirectorServiceImpl,
  ],
  entryComponents: [
  ]
})
export class CoreModule {
}
