import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { DocenteComponent} from "./modulos/docente/docente.component";
import {AppRoutingModule} from "./app.routing";
import {ComponentsModule} from "./components/components.module";
import {CoreModule} from "./core/core.module";
import { ConfirmDialogComponent } from './shared/confirmdialog/confirmdialog.component';

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
  ],
  declarations: [
    AppComponent,
    DocenteComponent,
    ConfirmDialogComponent,
  ],
  entryComponents:[ConfirmDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
