import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectoresAddComponent } from './directores-add.component';

describe('DirectoresAddComponent', () => {
  let component: DirectoresAddComponent;
  let fixture: ComponentFixture<DirectoresAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectoresAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectoresAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
