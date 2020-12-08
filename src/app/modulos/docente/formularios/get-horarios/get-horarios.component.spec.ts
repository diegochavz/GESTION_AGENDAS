import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetHorariosComponent } from './get-horarios.component';

describe('GetHorariosComponent', () => {
  let component: GetHorariosComponent;
  let fixture: ComponentFixture<GetHorariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetHorariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetHorariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
