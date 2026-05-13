## Fitnnes-backend-api

![Node.js](https://img.shields.io/badge/node.js-24-green)
![TypeScript](https://img.shields.io/badge/typescript-5-blue)
![Fastify](https://img.shields.io/badge/fastify-5-black)
![License](https://img.shields.io/badge/license-MIT-green)

API backend para gestão de treinos desenvolvida durante o Bootcamp Full Stack Club. Fornece endpoints para autenticação, gerenciamento de planos de treino, registro de exercícios e histórico de sessões. Projetada para ser modular, testável e pronta para deploy via Docker.

**Status:** Em desenvolvimento

---

## Sumário

- [Features](#features)
- [Tecnologias](#tecnologias)
- [Arquitetura](#arquitetura)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação e execução](#instalação-e-execução)
- [Configuração (.env)](#configuração-env)
- [Endpoints principais](#endpoints-principais)
- [Execução com Docker](#execução-com-docker)
- [Contribuição](#contribuição)
- [Roadmap](#roadmap)
- [Licença](#licença)

---

## Features

- Autenticação com sessões (Better-Auth)
- Gerenciamento de planos de treino
- Registro e tracking de exercícios
- Histórico e sessões de treino
- Validação de entrada com Zod
- Arquitetura modular e testável
- Suporte a execução via Docker

---

## Tecnologias

- Node.js 24 (ver `engines` em `package.json`)
- TypeScript 5
- Fastify 5
- Prisma ORM (Postgres)
- Better-Auth (sessões)
- Zod (validação)
- dayjs, dotenv, pino-pretty

---

## Arquitetura

Arquitetura em camadas com responsabilidades separadas:

- `src/routes/` — definição de rotas e validação
- `src/usecases/` — lógica de negócio
- `src/schemas/` — schemas Zod para requests/responses
- `src/errors/` — erros customizados
- `src/lib/` — infra (Prisma, auth, env)
- `src/generated/` — Prisma client gerado

---

## Estrutura do projeto

```text
Fitnnes-backend-api/
├── .claude/           # regras e instruções do projeto
├── docs/              # documentação e prompts
├── prisma/            # schema e migrations do banco
├── src/
│   ├── errors/
│   ├── generated/
│   ├── lib/
│   ├── routes/
│   ├── schemas/
│   ├── usecases/
│   └── index.ts
├── tasks/
├── Dockerfile
├── docker-compose.yml
├── package.json
└── README.md
```

---

## Instalação e execução

Recomendo `pnpm` (projetado para usar `pnpm` conforme `packageManager`):

```bash
git clone https://github.com/ViniciusSavianDeArruda/Fitnnes-backend-api.git
cd Fitnnes-backend-api
pnpm install
pnpm run dev
```

Script de desenvolvimento:

- `pnpm run dev` — inicia o servidor com `tsx --watch src/index.ts`
- `pnpm run build` — gera o Prisma client e compila o TypeScript

---

## Configuração (.env)

Copie o arquivo de exemplo e preencha com suas credenciais:

```bash
cp .env.example .env
# definir DATABASE_URL, SESSION_SECRET, etc.
```

Variáveis importantes:

- `DATABASE_URL` — conexão Postgres
- `SESSION_SECRET` — chave para sessões

---

## Endpoints principais

| Método | Rota | Descrição |
| ------ | ---- | --------- |
| POST | `/users/register` | Cadastro de usuário |
| POST | `/users/login` | Login / geração de sessão |
| GET  | `/workout-plans` | Listar planos de treino |
| POST | `/workout-plans` | Criar novo plano |
| GET  | `/sessions/:id` | Detalhar sessão de treino |
| POST | `/exercises` | Registrar exercício |

Todos os endpoints usam validação via Zod e aplicam autenticação quando necessário.

---

## Execução com Docker

Build e run:

```bash
docker build -t fitnnes-backend-api .
docker run -p 3000:3000 --env-file .env fitnnes-backend-api
```

Ou via `docker-compose` quando disponível:

```bash
docker compose up --build
```

---

## Contribuição

1. Fork e crie uma branch: `git checkout -b feat/minha-feature`
2. Mantenha commits claros (Conventional Commits)
3. Rode lint/testes antes de PR:

```bash
pnpm exec eslint .
pnpm test
```

4. Abra um PR descrevendo mudanças e contexto.

---

## Roadmap

- Melhorar cobertura de testes automatizados
- Implementar autenticação multifator
- Adicionar integração com dispositivos vestíveis
- Melhorar observabilidade e logging

---

## Licença

MIT — veja o arquivo `LICENSE`.

---

> Projeto em evolução — contribuições e feedback são bem-vindos.
