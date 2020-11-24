import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificacionAsesoriaComponent } from './calificacion-asesoria.component';

describe('CalificacionAsesoriaComponent', () => {
  let component: CalificacionAsesoriaComponent;
  let fixture: ComponentFixture<CalificacionAsesoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalificacionAsesoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalificacionAsesoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
