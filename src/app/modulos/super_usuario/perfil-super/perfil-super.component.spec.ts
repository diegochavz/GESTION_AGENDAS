import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilSuperComponent } from './perfil-super.component';

describe('PerfilSuperComponent', () => {
  let component: PerfilSuperComponent;
  let fixture: ComponentFixture<PerfilSuperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilSuperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilSuperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
