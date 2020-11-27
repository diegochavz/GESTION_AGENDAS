import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocentesDeleteComponent } from './docentes-delete.component';

describe('DocentesDeleteComponent', () => {
  let component: DocentesDeleteComponent;
  let fixture: ComponentFixture<DocentesDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocentesDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocentesDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
