import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorizacionesDeleteComponent } from './autorizaciones-delete.component';

describe('AutorizacionesDeleteComponent', () => {
  let component: AutorizacionesDeleteComponent;
  let fixture: ComponentFixture<AutorizacionesDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutorizacionesDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorizacionesDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
