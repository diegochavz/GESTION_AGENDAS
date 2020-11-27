import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesDeleteComponent } from './solicitudes-delete.component';

describe('SolicitudesDeleteComponent', () => {
  let component: SolicitudesDeleteComponent;
  let fixture: ComponentFixture<SolicitudesDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudesDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudesDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
