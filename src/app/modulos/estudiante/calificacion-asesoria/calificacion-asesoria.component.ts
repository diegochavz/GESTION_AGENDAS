import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-calificacion-asesoria',
  templateUrl: './calificacion-asesoria.component.html',
  styleUrls: ['./calificacion-asesoria.component.scss']
})
export class CalificacionAsesoriaComponent implements OnInit {

  test: Date = null;
  eleccion: string;

  constructor() {
  }

  ngOnInit(): void {
    this.test = new Date();
    this.eleccion = '';
  }

  onSelection(id: number) {
    switch (id) {
      case 1:
        this.eleccion = "NADA SATISFECHO";
        break;
      case 2:
        this.eleccion = "POCO SATISFECHO";
        break;
      case 3:
        this.eleccion = "NEUTRAL";
        break;
      case 4:
        this.eleccion = "MUY SATISFECHO";
        break;
      case 5:
        this.eleccion = "TOTALMENTE SATISFECHO";
        break;
    }
  }


}
