import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../../core/services/usuarios.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  nomeUsuario = '';
  mobileMode = false;
  mobileMenuOpen = false;

  constructor(
    private router: Router,
    public usuariosService: UsuariosService
  ) {}

  ngOnInit(): void {
    this.atualizarLayoutResponsivo();
  }

  @HostListener('window:resize')
  aoRedimensionar(): void {
    this.atualizarLayoutResponsivo();
  }

  alternarMenuMobile(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  fecharMenuMobile(): void {
    this.mobileMenuOpen = false;
  }

 

  sair(): void {
    void this.router.navigate(['/login']);
  }

  private atualizarLayoutResponsivo(): void {
    const mobile = window.matchMedia('(max-width: 680px)').matches;
    if (mobile !== this.mobileMode) {
      this.mobileMode = mobile;
      this.mobileMenuOpen = false;
    }
  }
}
