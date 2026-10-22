import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  carregando = false;
  mostrarSenha = false;
  mensagem = '';
  erro = '';

  formulario = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const email = this.route.snapshot.queryParamMap.get('email');
    if (email) this.formulario.controls.email.setValue(email);
    if (this.route.snapshot.queryParamMap.get('cadastro') === 'sucesso') {
      this.mensagem = 'Cadastro concluído. Entre com seu e-mail e senha.';
    }
  }

  entrar(): void {
    if (this.formulario.invalid || this.carregando) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.carregando = true;
    this.mensagem = '';
    this.erro = '';
    this.authService.encerrarSessao();

    this.authService.login(this.formulario.getRawValue())
      .pipe(finalize(() => this.carregando = false))
      .subscribe({
        next: (resposta) => {
          if (!this.authService.definirUsuarioAtual(resposta?.usuario)) {
            this.authService.encerrarSessao();
            this.erro = 'A API respondeu sem um usuário válido. A sessão não foi iniciada.';
            return;
          }
          void this.router.navigate(['/layout']);
        },
        error: (erro) => {
          this.erro = this.authService.mensagemDeErro(erro, 'login');
        }
      });
  }
}


