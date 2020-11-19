import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { DocenteComponent} from "./modulos/docente/docente.component";
import {SuperComponent} from "./modulos/super_usuario/super.component";
import {AppRoutingModule} from "./app.routing";
import {ComponentsModule} from "./components/components.module";
import {CoreModule} from "./core/core.module";
import {EstudianteComponent} from "./modulos/estudiante/estudiante.component";
import {DirectorComponent} from "./modulos/director/director.component";
import { LoginComponent } from './security/login/login.component';
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    CoreModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  declarations: [
    AppComponent,
    DocenteComponent,
    SuperComponent,
    EstudianteComponent,
    DirectorComponent,
    LoginComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
