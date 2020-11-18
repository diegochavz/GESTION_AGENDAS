import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramasDeleteComponent } from './programas-delete.component';

describe('ProgramasDeleteComponent', () => {
  let component: ProgramasDeleteComponent;
  let fixture: ComponentFixture<ProgramasDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramasDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramasDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
