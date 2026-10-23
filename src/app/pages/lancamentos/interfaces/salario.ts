export interface HistoricoSalario {
  valor: number;
  mesInicio: string;
}

export interface Salario {
  _id?: string;
  usuarioId?: string;
  diaRecebimento: number;
  historicoValores: HistoricoSalario[];
  ativo?: boolean;
  createdAt?: string;
  updatedAt?: string;
}