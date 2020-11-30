import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorizacionesApproveComponent } from './autorizaciones-approve.component';

describe('AutorizacionesApproveComponent', () => {
  let component: AutorizacionesApproveComponent;
  let fixture: ComponentFixture<AutorizacionesApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutorizacionesApproveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorizacionesApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
