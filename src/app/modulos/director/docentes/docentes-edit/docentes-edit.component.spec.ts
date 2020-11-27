import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocentesEditComponent } from './docentes-edit.component';

describe('DocentesEditComponent', () => {
  let component: DocentesEditComponent;
  let fixture: ComponentFixture<DocentesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocentesEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocentesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
