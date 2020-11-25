import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFormularioComponent } from './view-formulario.component';

describe('ViewFormularioComponent', () => {
  let component: ViewFormularioComponent;
  let fixture: ComponentFixture<ViewFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFormularioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
