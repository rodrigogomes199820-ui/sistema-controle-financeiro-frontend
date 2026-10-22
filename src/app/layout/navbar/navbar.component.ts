
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../../core/services/usuarios.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  nomeUsuario: string = '';

  constructor(
    private router: Router,
    public usuariosService: UsuariosService
  ) {}

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    this.usuariosService.buscarUsuarioAtual().subscribe({
      next: (result) => {
        this.nomeUsuario = result.usuario.nome;
      },
      error: (erro) => {
        console.error('Erro ao buscar usuário:', erro);
      }
    });
  }

  sair(): void {
    void this.router.navigate(['/login']);
  }
}

