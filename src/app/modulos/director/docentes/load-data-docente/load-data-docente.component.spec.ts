import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadDataDocenteComponent } from './load-data-docente.component';

describe('LoadDataDocenteComponent', () => {
  let component: LoadDataDocenteComponent;
  let fixture: ComponentFixture<LoadDataDocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadDataDocenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadDataDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
