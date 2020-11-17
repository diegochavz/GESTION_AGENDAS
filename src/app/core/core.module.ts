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

@NgModule({
  declarations: [],
  imports: [
    MatDialogModule,
    MatSnackBarModule,
     ],
  providers: [
    FormularioServiceImpl,
    ProgramaServiceImpl,
    ServiceImpl,
    DataFormularioService,
    DialogService,
    DocenteServiceImpl,
    ToasterService,
  ],
  entryComponents: [
  ]
})
export class CoreModule {
}
