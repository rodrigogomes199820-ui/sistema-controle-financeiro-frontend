import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface UsuarioAtual {
  id: string;
  nome: string;
  email: string;
}

export interface CadastroResponse {
  mensagem?: string;
}

export interface LoginResponse {
  mensagem?: string;
  usuario: UsuarioAtual;
}

export interface VerificacaoEmailResponse {
  mensagem?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl =  'https://sistema-controle-financeiro-backend-dzg6.onrender.com/api/auth';
  private readonly usuarioAtualSubject = new BehaviorSubject<UsuarioAtual | null>(null);
  readonly usuarioAtual$ = this.usuarioAtualSubject.asObservable();

  constructor(private http: HttpClient) {}

  cadastrar(dados: {
    nome: string;
    email: string;
    senha: string;
  }): Observable<CadastroResponse> {
    return this.http.post<CadastroResponse>(`${this.apiUrl}/register`, dados);
  }

  login(dados: { email: string; senha: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, dados);
  }

  definirUsuarioAtual(usuario: UsuarioAtual): void {
    this.usuarioAtualSubject.next(usuario);
  }

  encerrarSessao(): void {
    this.usuarioAtualSubject.next(null);
  }

  verificarEmail(dados: { email: string; codigo: string }): Observable<VerificacaoEmailResponse> {
    return this.http.post<VerificacaoEmailResponse>(`${this.apiUrl}/verify-email`, dados);
  }

  reenviarCodigo(email: string): Observable<VerificacaoEmailResponse> {
    return this.http.post<VerificacaoEmailResponse>(`${this.apiUrl}/resend-code`, { email });
  }
}
