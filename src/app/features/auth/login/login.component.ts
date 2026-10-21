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
  }

  entrar(): void {
    if (this.formulario.invalid || this.carregando) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.carregando = true;
    this.erro = '';

    this.authService.login(this.formulario.getRawValue())
      .pipe(finalize(() => this.carregando = false))
      .subscribe({
        next: (resposta) => {
          this.authService.definirUsuarioAtual(resposta.usuario);
          void this.router.navigate(['/layout']);
        },
        error: (erro) => {
          if (erro.status === 404) {
            this.erro = 'O login ainda nÃ£o estÃ¡ disponÃ­vel no servidor.';
          } else if (erro.status === 401) {
            this.erro = 'E-mail ou senha incorretos.';
          } else if (erro.status === 0) {
            this.erro = 'NÃ£o foi possÃ­vel conectar ao servidor. Tente novamente.';
          } else {
            this.erro = erro.error?.mensagem || 'NÃ£o foi possÃ­vel entrar. Tente novamente.';
          }
        }
      });
  }
}


