import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectoresListComponent } from './directores-list.component';

describe('DirectoresListComponent', () => {
  let component: DirectoresListComponent;
  let fixture: ComponentFixture<DirectoresListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectoresListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectoresListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
