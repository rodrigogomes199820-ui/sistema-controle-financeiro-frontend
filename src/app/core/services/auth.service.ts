import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, TimeoutError, timeout } from 'rxjs';

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
  usuario?: unknown;
}

export interface VerificacaoEmailResponse {
  mensagem?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'https://sistema-controle-financeiro-backend-dzg6.onrender.com/api/auth';
  private readonly requestTimeoutMs = 30_000;
  private readonly usuarioAtualSubject = new BehaviorSubject<UsuarioAtual | null>(null);
  readonly usuarioAtual$ = this.usuarioAtualSubject.asObservable();

  get usuarioAtual(): UsuarioAtual | null {
    return this.usuarioAtualSubject.value;
  }

  constructor(private http: HttpClient) {}

  cadastrar(dados: {
    nome: string;
    email: string;
    senha: string;
  }): Observable<CadastroResponse> {
    return this.post<CadastroResponse>('/register', dados);
  }

  login(dados: { email: string; senha: string }): Observable<LoginResponse> {
    return this.post<LoginResponse>('/login', dados);
  }

  definirUsuarioAtual(usuario: unknown): boolean {
    if (!this.usuarioValido(usuario)) return false;

    this.usuarioAtualSubject.next(usuario);
    return true;
  }

  encerrarSessao(): void {
    this.usuarioAtualSubject.next(null);
  }

  verificarEmail(dados: { email: string; codigo: string }): Observable<VerificacaoEmailResponse> {
    return this.post<VerificacaoEmailResponse>('/verify-email', dados);
  }

  reenviarCodigo(email: string): Observable<VerificacaoEmailResponse> {
    return this.post<VerificacaoEmailResponse>('/resend-code', { email });
  }

  mensagemDeErro(error: unknown, operacao: 'cadastro' | 'login' | 'verificacao' | 'reenvio'): string {
    if (error instanceof TimeoutError || this.temNome(error, 'TimeoutError')) {
      return `A API não respondeu em ${this.requestTimeoutMs / 1000} segundos. Tente novamente.`;
    }

    const mensagemApi = this.extrairMensagemApi(error);
    if (mensagemApi) return mensagemApi;

    if (!(error instanceof HttpErrorResponse)) {
      return 'Ocorreu um erro inesperado ao comunicar com a API.';
    }

    if (error.status === 0) {
      return 'Nenhuma resposta HTTP foi recebida. Verifique a conexão e o CORS da API; isso não confirma que a senha esteja incorreta.';
    }

    switch (error.status) {
      case 400:
        return 'A API recusou os dados enviados (HTTP 400). Confira os campos e tente novamente.';
      case 401:
        return operacao === 'login'
          ? 'A API rejeitou a autenticação (HTTP 401). Confira as credenciais e os requisitos da conta.'
          : 'A API exige autenticação para esta operação (HTTP 401).';
      case 403:
        return 'A API recusou esta operação por falta de permissão (HTTP 403).';
      case 404:
        return 'A rota solicitada não foi encontrada na API (HTTP 404).';
      case 409:
        return operacao === 'cadastro'
          ? 'A API informou um conflito no cadastro (HTTP 409). O e-mail pode já estar cadastrado.'
          : 'A API informou um conflito ao processar a solicitação (HTTP 409).';
      case 429:
        return 'A API recebeu muitas tentativas. Aguarde um pouco antes de tentar novamente (HTTP 429).';
      case 502:
      case 503:
        return `A API está temporariamente indisponível (HTTP ${error.status}). Tente novamente mais tarde.`;
      default:
        return error.status >= 500
          ? `A API encontrou um erro interno (HTTP ${error.status}). Tente novamente mais tarde.`
          : `A solicitação falhou com HTTP ${error.status}.`;
    }
  }

  private post<T>(path: string, payload: unknown): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}${path}`, payload)
      .pipe(timeout({ first: this.requestTimeoutMs }));
  }

  private usuarioValido(value: unknown): value is UsuarioAtual {
    if (!value || typeof value !== 'object') return false;

    const usuario = value as Partial<UsuarioAtual>;
    return typeof usuario.id === 'string' && usuario.id.trim().length > 0
      && typeof usuario.nome === 'string' && usuario.nome.trim().length > 0
      && typeof usuario.email === 'string' && usuario.email.trim().length > 0;
  }

  private extrairMensagemApi(error: unknown): string | null {
    if (!(error instanceof HttpErrorResponse)) return null;

    const body: unknown = error.error;
    if (typeof body === 'string' && body.trim()) return body.trim();
    if (!body || typeof body !== 'object') return null;

    const data = body as { mensagem?: unknown; message?: unknown };
    if (typeof data.mensagem === 'string' && data.mensagem.trim()) return data.mensagem.trim();
    if (typeof data.message === 'string' && data.message.trim()) return data.message.trim();
    return null;
  }

  private temNome(error: unknown, name: string): boolean {
    return !!error && typeof error === 'object' && 'name' in error && error.name === name;
  }
}
