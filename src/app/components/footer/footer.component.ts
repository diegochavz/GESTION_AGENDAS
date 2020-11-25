import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {
  test: Date = null;
  constructor() { }

  ngOnInit(): void {
    this.test = new Date();
  }

}
