# Fitnnes-backend-api

![Node.js](https://img.shields.io/badge/node.js-20-green)
![TypeScript](https://img.shields.io/badge/typescript-5-blue)
![Fastify](https://img.shields.io/badge/fastify-backend-black)
![License](https://img.shields.io/badge/license-MIT-green)

Fitnnes-backend-api é uma API backend para um sistema de gestão de treinos, desenvolvida durante o Bootcamp Full Stack Club. Este projeto me proporcionou uma experiência real com uma aplicação completa, abrangendo desde autenticação até integração de banco de dados, testes automatizados e arquitetura modular. Além de ser uma referência prática para estudos, é uma base que pode ser expandida e adaptada para outros contextos.

---

## Features

- User authentication with sessions
- Workout plan management
- Exercise tracking
- Workout session history
- Data validation with Zod
- Modular architecture
- Docker support

---

## Sobre o Projeto

Este projeto foi iniciado como parte do Bootcamp do Full Stack Club, trazendo a oportunidade de vivenciar o desenvolvimento de uma solução backend completa, voltada para desafios do mundo real. Experimentei todo o ciclo de aprendizado: definição de requisitos, modelagem de banco, organização de módulos, fluxos de autenticação, validação de dados, testes automatizados e deploy com Docker.

O Fitnnes-backend-api foi projetado para:
- Atender aos requisitos de uma aplicação real de treinos
- Explorar tecnologias modernas e padrões de mercado em Node.js
- Servir como base para futuras evoluções e aprofundar meus estudos em backend

Durante o desenvolvimento, enfrentei e aprendi com desafios como padronização de código, segurança, modularidade, integração e testes. O projeto reflete as melhores práticas e pode ser facilmente integrado ou expandido, seja para aplicações web, mobile ou outros sistemas.

---

## Motivação e Visão

O objetivo principal deste projeto foi criar uma API robusta, escalável e segura, pronta para ser consumida por aplicações front-end e mobile.
Além de consolidar conhecimentos do Bootcamp, busquei aplicar conceitos práticos, validar aprendizados e criar uma referência técnica que, além de atender a casos reais, também pudesse servir como ponto de partida para estudos futuros e projetos profissionais.

---

## Tecnologias Utilizadas

- **TypeScript**: Tipagem estática e segurança.
- **Fastify**: Framework HTTP rápido e moderno.
- **Prisma ORM**: Modelagem e queries no PostgreSQL.
- **PostgreSQL**: Banco de dados relacional.
- **Better-Auth**: Autenticação baseada em sessões.
- **Zod**: Validação de dados.
- **ESLint & Prettier**: Padronização e formatação de código.
- **Docker**: Containerização e deploy.
- **dayjs**: Manipulação de datas.
- **dotenv**: Configuração de ambiente.
- **OpenAI**: Integração com IA generativa.

---

## Arquitetura Principal

O projeto segue uma arquitetura em camadas, separando responsabilidades:

- **Rotas** (`src/routes/`): Definição dos endpoints e validação de dados.
- **Use Cases** (`src/usecases/`): Lógica de negócio e interação com o banco.
- **Schemas** (`src/schemas/`): Validação de requests/responses com Zod.
- **Erros** (`src/errors/`): Classes de erro customizadas.
- **Lib** (`src/lib/`): Infraestrutura (Prisma, autenticação, env).
- **Generated** (`src/generated/`): Prisma client gerado.

---

## Estrutura do Projeto

```
Fitnnes-backend-api/
├── .claude/           # Regras e instruções do projeto
├── docs/              # Documentação e prompts
├── prisma/            # Schema e migrations do banco
├── src/
│   ├── errors/        # Classes de erro customizadas
│   ├── generated/     # Prisma client gerado
│   ├── lib/           # Infraestrutura (Prisma, auth, env)
│   ├── routes/        # Endpoints e validação de dados
│   ├── schemas/       # Schemas Zod para requests/responses
│   ├── usecases/      # Lógica de negócio
│   └── index.ts       # Entry point da aplicação
├── tasks/             # Desafios e tarefas do bootcamp
├── Dockerfile         # Containerização
├── docker-compose.yml # Orquestração de containers
├── package.json       # Configuração de dependências
├── README.md          # Documentação principal
```

---

## Banco de Dados

Banco de dados relacional PostgreSQL, com modelagens escaláveis via Prisma:

- User: Usuários da plataforma
- WorkoutPlan: Planos de treino
- Session: Sessão individual de treino
- Exercise: Exercícios registrados
- Log: Auditoria de ações

---

## Autenticação

Utiliza Better-Auth com sessões persistidas no banco (Prisma). O fluxo:
- Usuário faz login (rota `/users/login`)
- Sessão gerada e armazenada
- Middleware protege endpoints que requerem autenticação
- Permissões customizáveis conforme necessidade

---

## Principais Endpoints

| Método | Rota              | Descrição                 |
| ------ | ----------------- | ------------------------- |
| POST   | `/users/register` | Cadastro de usuário       |
| POST   | `/users/login`    | Login/autenticação        |
| GET    | `/workout-plans`  | Listar planos de treino   |
| POST   | `/workout-plans`  | Criar novo plano          |
| GET    | `/sessions/:id`   | Detalhar sessão de treino |
| POST   | `/exercises`      | Registrar exercício       |

Todos os endpoints com validação rigorosa via Zod e autenticação/autorizações conforme necessidade.

---

## Repositórios do Projeto

Este projeto faz parte de um ecossistema com dois repositórios principais:

- **Backend (API):** [Fitnnes-backend-api](https://github.com/seu-usuario/fitnnes-backend-api)
- **Frontend (Web App):** [Fitnnes-frontend](https://github.com/seu-usuario/fitnnes-frontend)

O backend fornece toda a lógica, autenticação, persistência e endpoints REST. O frontend consome essa API, entrega a interface web, autenticação, visualização de treinos, estatísticas e integração com dispositivos.

Para rodar o sistema completo, clone ambos os repositórios e siga as instruções de cada README.

---

## Instalação e Execução

1. Clone o repositório
   ```bash
   git clone https://github.com/ViniciusSavianDeArruda/Fitnnes-backend-api.git
   cd Fitnnes-backend-api
   ```

2. Instale as dependências
   ```bash
   npm install
   ```

3. Configure o arquivo `.env`
   - Copie o `.env.example` para `.env`
   - Preencha dados do banco (Postgres), chave de sessão, etc.

4. Rode as migrations
   ```bash
   npx prisma migrate dev
   ```

5. Inicie o servidor
   ```bash
   npm run dev
   ```
   O backend estará disponível em `http://localhost:3000`.

---

## Docker

Para rodar em ambiente padronizado:
1. Build
   ```bash
   docker build -t fitnnes-backend-api .
   ```
2. Run
   ```bash
   docker run -p 3000:3000 --env-file .env fitnnes-backend-api
   ```

---

## Exemplos de Uso

Cadastro
```json
POST /users/register
{
  "name": "Maria",
  "email": "maria@email.com",
  "password": "senha123"
}
```

Login
```json
POST /users/login
{
  "email": "maria@email.com",
  "password": "senha123"
}
```

Criar Plano de Treino
```json
POST /workout-plans
{
  "userId": 1,
  "title": "Plano verão",
  "description": "Treino para definição muscular"
}
```

---

## Convenções

- Código em TypeScript estrito
- Commit semântico e limpo
- Nomes de arquivos em kebab-case
- Validação obrigatória dos dados via Zod
- Lint automático com ESLint e Prettier

---

## Como contribuir

Contribuições são bem-vindas! Para colaborar:

1. Fork este repositório e crie uma branch para sua feature ou correção.
2. Siga o padrão de commits [Conventional Commits](https://www.conventionalcommits.org/).
3. Rode os testes e lint antes de abrir um PR:
   ```bash
   pnpm exec eslint .
   pnpm test
   ```
4. Abra um Pull Request detalhando sua proposta.
5. Use issues para sugestões, bugs ou dúvidas.

### Padrões
- Código limpo, modular e tipado.
- Testes automatizados para novas features.
- Documentação clara das mudanças.

---

## Roadmap

- [ ] Melhorar cobertura de testes automatizados
- [ ] Implementar autenticação multifator
- [ ] Adicionar endpoints para integração com dispositivos vestíveis
- [ ] Refatorar tratamento de erros para maior robustez
- [ ] Criar dashboard de observabilidade/logs
- [ ] Evoluir integração com IA para sugestões de treino

---

## Licença

Este projeto está sob licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

> Este projeto está em evolução contínua conforme vou estudando, aprendendo novas tecnologias e aprimorando boas práticas de desenvolvimento.
