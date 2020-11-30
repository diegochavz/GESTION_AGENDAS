import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadDataEstudianteComponent } from './load-data-estudiante.component';

describe('LoadDataEstudianteComponent', () => {
  let component: LoadDataEstudianteComponent;
  let fixture: ComponentFixture<LoadDataEstudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadDataEstudianteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadDataEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
