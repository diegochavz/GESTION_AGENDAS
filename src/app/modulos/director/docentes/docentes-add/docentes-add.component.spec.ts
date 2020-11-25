import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocentesAddComponent } from './docentes-add.component';

describe('DocentesAddComponent', () => {
  let component: DocentesAddComponent;
  let fixture: ComponentFixture<DocentesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocentesAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocentesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
