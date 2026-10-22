
export interface UsuarioAuth {
  id: string;
  nome: string;
  email: string;
}

export interface RespostaAuth {
  message: string;
  token?: string;
  usuario?: UsuarioAuth;
}
