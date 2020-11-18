import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectoresEditComponent } from './directores-edit.component';

describe('DirectoresEditComponent', () => {
  let component: DirectoresEditComponent;
  let fixture: ComponentFixture<DirectoresEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectoresEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectoresEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
