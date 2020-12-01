import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadDataProgramaComponent } from './load-data-programa.component';

describe('LoadDataProgramaComponent', () => {
  let component: LoadDataProgramaComponent;
  let fixture: ComponentFixture<LoadDataProgramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadDataProgramaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadDataProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
