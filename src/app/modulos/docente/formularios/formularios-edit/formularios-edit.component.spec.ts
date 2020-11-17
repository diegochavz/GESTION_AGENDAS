import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulariosEditComponent } from './formularios-edit.component';

describe('FormulariosEditComponent', () => {
  let component: FormulariosEditComponent;
  let fixture: ComponentFixture<FormulariosEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulariosEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulariosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
