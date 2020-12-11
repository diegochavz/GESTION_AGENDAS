import {Component, HostListener} from '@angular/core';
import {AuthenticationServiceImpl} from "./core/http/implement/authentication.service.impl";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'agendas';

  constructor(private auth:AuthenticationServiceImpl) {
  }

  @HostListener("window:unload", ["$event"])
  unloadHandler() {
    this.auth.logout();
  }

  @HostListener("window:beforeunload", ["$event"])
  beforeUnloadHander() {
  }
}
