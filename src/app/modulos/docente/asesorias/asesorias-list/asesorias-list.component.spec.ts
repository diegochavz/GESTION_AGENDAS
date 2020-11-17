import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsesoriasListComponent } from './asesorias-list.component';

describe('AsesoriasListComponent', () => {
  let component: AsesoriasListComponent;
  let fixture: ComponentFixture<AsesoriasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsesoriasListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsesoriasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
