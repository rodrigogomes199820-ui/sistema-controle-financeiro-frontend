import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-verificar-email',
  templateUrl: './verificar-email.component.html',
  styleUrls: ['./verificar-email.component.scss']
})
export class VerificarEmailComponent implements OnInit {
  carregando = false;
  reenviando = false;
  mensagem = '';
  erro = '';

  formulario = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    codigo: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const email = this.route.snapshot.queryParamMap.get('email');
    if (email) {
      this.formulario.controls.email.setValue(email);
    }
  }

  verificar(): void {
    if (this.formulario.invalid || this.carregando) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.carregando = true;
    this.mensagem = '';
    this.erro = '';

    this.authService.verificarEmail(this.formulario.getRawValue())
      .pipe(finalize(() => this.carregando = false))
      .subscribe({
        next: (resposta) => {
          this.mensagem = resposta.mensagem || 'E-mail verificado com sucesso. Você já pode entrar.';
          void this.router.navigate(['/login'], { queryParams: { email: this.formulario.controls.email.value } });
        },
        error: (erro) => {
          this.erro = erro.status === 404
            ? 'A confirmação de e-mail ainda não está disponível no servidor.'
            : erro.error?.mensagem || 'Não foi possível verificar o e-mail. Confira o código e tente novamente.';
        }
      });
  }

  reenviarCodigo(): void {
    const controleEmail = this.formulario.controls.email;
    controleEmail.markAsTouched();
    if (controleEmail.invalid || this.reenviando) return;

    this.reenviando = true;
    this.mensagem = '';
    this.erro = '';

    this.authService.reenviarCodigo(controleEmail.value)
      .pipe(finalize(() => this.reenviando = false))
      .subscribe({
        next: (resposta) => {
          this.mensagem = resposta.mensagem || 'Se o e-mail estiver cadastrado, enviaremos um novo código.';
        },
        error: (erro) => {
          this.erro = erro.status === 404
            ? 'O reenvio do código ainda não está disponível no servidor.'
            : erro.error?.mensagem || 'Não foi possível reenviar o código. Tente novamente.';
        }
      });
  }
}
