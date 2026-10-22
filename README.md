# Sistema Financeiro — Frontend

Aplicação frontend do Sistema Financeiro, desenvolvida com Angular e TypeScript. Responsável pela interface de usuário, autenticação e comunicação com a API do sistema.

## Tecnologias

- Angular
- TypeScript
- Angular Material
- SCSS
- RxJS
- Angular HttpClient

## Funcionalidades

- Cadastro de usuários.
- Login e autenticação.
- Consulta dos dados do usuário autenticado.
- Navegação entre as áreas da aplicação.
- Comunicação com o backend por meio de uma API REST.

> As funcionalidades de lançamentos financeiros poderão ser documentadas à medida que forem implementadas.

## Arquitetura

O frontend utiliza serviços Angular para separar as chamadas HTTP da apresentação da interface.

- **AuthService:** realiza as operações de cadastro e login e mantém o estado do usuário na aplicação.
- **UsuariosService:** consulta os dados do usuário autenticado.
- **AuthInterceptor:** adiciona o token de autenticação às requisições protegidas, conforme a configuração do projeto.
- **AppRoutingModule:** organiza a navegação entre as páginas.

## Requisitos

- Node.js e npm.
- Backend configurado e em execução para utilizar os recursos que dependem da API.

## Instalação

Clone o repositório e entre na pasta do frontend:

```bash
git clone <URL_DO_REPOSITORIO>
cd sistema-frontend/web
npm install
```

## Configuração da API

Configure a URL base do backend nos arquivos de ambiente do Angular.

Desenvolvimento local:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000'
};
```

Em produção, configure `apiUrl` com o endereço público da API. Não inclua tokens, senhas ou credenciais nesses arquivos.

## Executar localmente

```bash
npm start
```

A aplicação normalmente estará disponível em `http://localhost:4200`.

O backend deve estar em execução para que as requisições à API funcionem.

## Build de produção

```bash
npx ng build --configuration production
```

Os arquivos compilados são gerados no diretório configurado em `angular.json`. Publique esses arquivos em um serviço de hospedagem compatível com aplicações frontend estáticas.

## Segurança

- Não armazene credenciais ou segredos no repositório.
- Utilize HTTPS na comunicação com a API publicada.
- Configure o backend para aceitar apenas as origens necessárias.
- Trate tokens de autenticação como informações privadas.

## Estado do projeto

O frontend possui autenticação e integração com a API para consultar os dados do usuário autenticado. Outras funcionalidades serão incorporadas conforme a evolução do sistema.
