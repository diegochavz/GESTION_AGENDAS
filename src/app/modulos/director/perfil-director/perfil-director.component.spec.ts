import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilDirectorComponent } from './perfil-director.component';

describe('PerfilDirectorComponent', () => {
  let component: PerfilDirectorComponent;
  let fixture: ComponentFixture<PerfilDirectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilDirectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
