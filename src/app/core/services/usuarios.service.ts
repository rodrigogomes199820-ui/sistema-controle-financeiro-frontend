
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Usuario {
  id: string;
  nome: string;
  email: string;
}

export interface RespostaUsuario {
  message: string;
  usuario: Usuario;
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
private readonly apiUrl = `${environment.apiUrl}/usuarios`;

  constructor(private http: HttpClient) {}

  buscarUsuarioAtual(): Observable<RespostaUsuario> {
    return this.http.get<RespostaUsuario>(
      `${this.apiUrl}/me`
    );
  }
}
