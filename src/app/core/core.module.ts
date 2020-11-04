import {FormularioServiceImpl} from "./http/implement/formulario.service.impl";
import {ProgramaServiceImpl} from "./http/implement/programa.service.impl";
import {ServiceImpl} from "./http/implement/service.impl";
import {NgModule} from "@angular/core";

@NgModule({
  declarations: [],
  imports: [
     ],
  providers: [
    FormularioServiceImpl,
    ProgramaServiceImpl,
    ServiceImpl,
  ],
  entryComponents: [
  ]
})
export class CoreModule {
}
