import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { NavbarComponent } from './navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { UsuariosService } from '../../core/services/usuarios.service';
import { MaterialModule } from '../../shared/material/material.module';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent, SidebarComponent],
      imports: [RouterTestingModule, MaterialModule],
      providers: [{
        provide: UsuariosService,
        useValue: {
          buscarUsuarioAtual: () => of({ usuario: { nome: 'Usuário de teste' } })
        }
      }]
    });
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
