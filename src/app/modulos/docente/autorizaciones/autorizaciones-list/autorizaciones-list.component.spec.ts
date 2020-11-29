import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorizacionesListComponent } from './autorizaciones-list.component';

describe('AutorizacionesListComponent', () => {
  let component: AutorizacionesListComponent;
  let fixture: ComponentFixture<AutorizacionesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutorizacionesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorizacionesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
