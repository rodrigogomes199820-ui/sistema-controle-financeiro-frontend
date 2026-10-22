
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { CadastroDados } from '../../features/auth/interfaces/cadastro-dados.interface';
import { LoginDados } from '../../features/auth/interfaces/login-dados.interface';
import {
  RespostaAuth,
  UsuarioAuth
} from '../../features/auth/interfaces/resposta-auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private readonly apiUrl = `${environment.apiUrl}/auth`;

  private readonly usuarioAtualSubject =
    new BehaviorSubject<UsuarioAuth | null>(this.recuperarUsuario());

  readonly usuarioAtual$: Observable<UsuarioAuth | null> =
    this.usuarioAtualSubject.asObservable();

  constructor(private http: HttpClient) {}

  cadastrar(dados: CadastroDados): Observable<RespostaAuth> {
    return this.http.post<RespostaAuth>(
      `${this.apiUrl}/register`,
      dados
    );
  }

  login(dados: LoginDados): Observable<RespostaAuth> {
    return this.http.post<RespostaAuth>(
      `${this.apiUrl}/login`,
      dados
    );
  }

  definirUsuarioAtual(usuario: UsuarioAuth | undefined): boolean {
    if (!usuario?.id || !usuario.nome || !usuario.email) {
      return false;
    }

    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuarioAtualSubject.next(usuario);

    return true;
  }

  encerrarSessao(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.usuarioAtualSubject.next(null);
  }

  mensagemDeErro(erro: unknown, contexto: string): string {
    if (erro instanceof HttpErrorResponse) {
      const mensagemApi = erro.error?.message;

      if (typeof mensagemApi === 'string' && mensagemApi.trim()) {
        return mensagemApi;
      }

      if (erro.status === 0) {
        return 'Não foi possível conectar ao servidor. Verifique se o backend está em execução.';
      }

      if (erro.status === 401) {
        return 'E-mail ou senha inválidos.';
      }

      if (erro.status === 409) {
        return 'Este e-mail já está cadastrado.';
      }

      if (erro.status >= 500) {
        return 'Ocorreu um erro no servidor. Tente novamente.';
      }
    }

    return contexto === 'cadastro'
      ? 'Não foi possível concluir o cadastro.'
      : 'Não foi possível realizar o login.';
  }

  private recuperarUsuario(): UsuarioAuth | null {
    try {
      const salvo = localStorage.getItem('usuario');

      if (!salvo) {
        return null;
      }

      const usuario: unknown = JSON.parse(salvo);

      if (
        typeof usuario === 'object' &&
        usuario !== null &&
        'id' in usuario &&
        'nome' in usuario &&
        'email' in usuario &&
        typeof usuario.id === 'string' &&
        typeof usuario.nome === 'string' &&
        typeof usuario.email === 'string'
      ) {
        return {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email
        };
      }

      return null;
    } catch {
      return null;
    }
  }
}
