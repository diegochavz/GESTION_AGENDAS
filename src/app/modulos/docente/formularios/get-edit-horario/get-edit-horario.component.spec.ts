import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetEditHorarioComponent } from './get-edit-horario.component';

describe('GetEditHorarioComponent', () => {
  let component: GetEditHorarioComponent;
  let fixture: ComponentFixture<GetEditHorarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetEditHorarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetEditHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
