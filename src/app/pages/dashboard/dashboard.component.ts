
import { SalarioService } from './../lancamentos/service/salario.service';
import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/core/services/usuarios.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  nomeUsuario: string = '';
  meuSaldo: number = 0;

  constructor(
    public usuariosService: UsuariosService,
    private salarioService: SalarioService
  ) {}

  ngOnInit(): void {
    this.loadUser();
    this.mySaldo();
  }

  loadUser(): void {
    this.usuariosService.buscarUsuarioAtual().subscribe({
      next: (result) => {
        this.nomeUsuario = result.usuario.nome;
      },
      error: (erro) => {
        console.error('Erro ao carregar usuário:', erro);
      }
    });
  }

  mySaldo(): void {
    this.salarioService.consultarSalario().subscribe({
      next: (result) => {
        const historico = result.salario?.historicoValores ?? [];
        const ultimoValor = historico[historico.length - 1]?.valor;
        const valor = Number(ultimoValor);

        this.meuSaldo = Number.isFinite(valor) ? valor : 0;
      },
      error: (erro) => {
        console.error('Erro ao consultar salário:', erro);
        this.meuSaldo = 0;
      }
    });
  }
}
