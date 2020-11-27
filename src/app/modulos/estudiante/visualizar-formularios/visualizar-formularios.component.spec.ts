import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarFormulariosComponent } from './visualizar-formularios.component';

describe('VisualizarFormulariosComponent', () => {
  let component: VisualizarFormulariosComponent;
  let fixture: ComponentFixture<VisualizarFormulariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarFormulariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarFormulariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
