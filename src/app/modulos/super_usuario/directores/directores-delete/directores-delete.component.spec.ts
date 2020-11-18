import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectoresDeleteComponent } from './directores-delete.component';

describe('DirectoresDeleteComponent', () => {
  let component: DirectoresDeleteComponent;
  let fixture: ComponentFixture<DirectoresDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectoresDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectoresDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
