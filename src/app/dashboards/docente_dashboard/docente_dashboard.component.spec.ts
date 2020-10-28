import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocenteDashboardComponent } from './docente_dashboard.component';

describe('DocenteDashboardComponent', () => {
  let component: DocenteDashboardComponent;
  let fixture: ComponentFixture<DocenteDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocenteDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocenteDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
