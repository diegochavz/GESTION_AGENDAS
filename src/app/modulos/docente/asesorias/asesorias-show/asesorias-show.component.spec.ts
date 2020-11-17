import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsesoriasShowComponent } from './asesorias-show.component';

describe('AsesoriasShowComponent', () => {
  let component: AsesoriasShowComponent;
  let fixture: ComponentFixture<AsesoriasShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsesoriasShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsesoriasShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
