import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Salario } from '../interfaces/salario';

export interface DadosSalario {
  valor: number | null;
  diaRecebimento: number | null;
  mesInicio: string;
}

export interface RespostaSalario {
  message: string;
  salario: Salario;
}

@Injectable({
  providedIn: 'root'
})
export class SalarioService {
  private readonly apiUrl = `${environment.apiUrl}/salario`;

  constructor(private http: HttpClient) {}

  cadastrarSalario(dados: DadosSalario): Observable<RespostaSalario> {
    return this.http.post<RespostaSalario>(this.apiUrl, dados);
  }

  consultarSalario(): Observable<{ salario: Salario }> {
    return this.http.get<{ salario: Salario }>(this.apiUrl);
  }
}