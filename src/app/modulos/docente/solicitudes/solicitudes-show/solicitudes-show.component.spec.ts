import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesShowComponent } from './solicitudes-show.component';

describe('SolicitudesShowComponent', () => {
  let component: SolicitudesShowComponent;
  let fixture: ComponentFixture<SolicitudesShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudesShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudesShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
