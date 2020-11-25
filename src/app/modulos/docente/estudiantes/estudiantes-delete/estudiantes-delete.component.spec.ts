import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudiantesDeleteComponent } from './estudiantes-delete.component';

describe('EstudiantesDeleteComponent', () => {
  let component: EstudiantesDeleteComponent;
  let fixture: ComponentFixture<EstudiantesDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstudiantesDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudiantesDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
