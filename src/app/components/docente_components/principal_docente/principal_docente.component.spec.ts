import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Principal_docenteComponent } from './principal_docente.component';

describe('PrincipalDocenteComponent', () => {
  let component: Principal_docenteComponent;
  let fixture: ComponentFixture<Principal_docenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Principal_docenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Principal_docenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
