import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {
  carregando = false;
  erro = '';

  formulario = this.fb.nonNullable.group({
    nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(120)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(254)]],
    senha: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(72)]]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  cadastrar(): void {
    if (this.formulario.invalid || this.carregando) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.carregando = true;
    this.erro = '';

    this.authService.cadastrar(this.formulario.getRawValue())
      .pipe(finalize(() => this.carregando = false))
      .subscribe({
        next: () => {
          void this.router.navigate(['/login'], {
            queryParams: {
              email: this.formulario.controls.email.value,
              cadastro: 'sucesso'
            }
          });
        },
        error: (erro) => {
          this.erro = this.authService.mensagemDeErro(erro, 'cadastro');
        }
      });
  }
}
