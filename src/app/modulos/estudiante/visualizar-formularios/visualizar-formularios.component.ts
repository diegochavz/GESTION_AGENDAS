import { Component, OnInit } from '@angular/core';

interface Food {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-visualizar-formularios',
  templateUrl: './visualizar-formularios.component.html',
  styleUrls: ['./visualizar-formularios.component.scss']
})
export class VisualizarFormulariosComponent implements OnInit {
  test: Date = null;

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Item 1'},
    {value: 'pizza-1', viewValue: 'Item 2'},
    {value: 'tacos-2', viewValue: 'Item 3'}
  ];

  focus: any;
  focus1: any;

  constructor() {
  }

  ngOnInit(): void {
    this.test = new Date();

  }

}
