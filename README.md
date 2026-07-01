## Fitnnes-backend-api

![Node.js](https://img.shields.io/badge/node.js-24-green)
![TypeScript](https://img.shields.io/badge/typescript-5-blue)
![Fastify](https://img.shields.io/badge/fastify-5-black)

API backend para gestão de treinos desenvolvida durante o Bootcamp Full Stack Club. Fornece endpoints para autenticação, gerenciamento de planos de treino, registro de exercícios, histórico de sessões e um assistente de IA para montagem de treinos. Projetada para ser modular, testável e pronta para deploy via Docker.

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

---

## Features

- Autenticação com sessões (Better-Auth) via Google OAuth
- Gerenciamento de planos de treino, dias e exercícios
- Registro e tracking de sessões de treino
- Estatísticas de consistência do usuário
- Assistente de IA (chat) que cria planos de treino personalizados via tool-calling
- Documentação da API via Swagger/OpenAPI e Scalar UI
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

Requer **Node.js 24.x** e **pnpm 10.30.0** (ambos obrigatórios via `engine-strict`, conforme `package.json`).

```bash
git clone https://github.com/ViniciusSavianDeArruda/Fitnnes-backend-api.git
cd Fitnnes-backend-api
pnpm install

# sobe o Postgres localmente via Docker
docker compose up -d

# configure o .env (veja seção abaixo) antes de continuar
cp .env.example .env

# aplica as migrations no banco
pnpm exec prisma migrate dev

# inicia o servidor com hot-reload
pnpm dev
```

O servidor sobe em `http://localhost:8081` (porta padrão). Docs interativas em `/docs`, spec OpenAPI em `/swagger.json`.

Scripts disponíveis:

- `pnpm dev` — inicia o servidor com `tsx --watch src/index.ts`
- `pnpm run build` — gera o Prisma client e compila o TypeScript

---

## Configuração (.env)

Copie o arquivo de exemplo e preencha com suas credenciais:

```bash
cp .env.example .env
```

Variáveis (definidas e validadas em `src/lib/env.ts`):

| Variável | Obrigatória | Descrição |
| --- | --- | --- |
| `PORT` | Não (default: `8081`) | Porta do servidor. **Precisa bater com o redirect URI cadastrado no Google Cloud Console** |
| `DATABASE_URL` | Sim | Conexão Postgres (`postgresql://...`) |
| `BETTER_AUTH_SECRET` | Sim | Chave secreta para sessões do BetterAuth |
| `API_BASE_URL` | Não (default: `http://localhost:8081`) | URL pública da própria API, usada pelo BetterAuth |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Sim | Credenciais OAuth do [Google Cloud Console](https://console.cloud.google.com/) |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Sim | Chave do Gemini ([AI Studio](https://aistudio.google.com/apikey)) — exigida pelo schema de env, mas não usada pelas rotas de IA atualmente (elas usam `OPENAI_API_KEY`) |
| `OPENAI_API_KEY` | Não | Chave da OpenAI — usada pelo modelo `gpt-4o-mini` no chat de IA (`src/routes/ai.ts`) |
| `WEB_APP_BASE_URL` | Sim | URL do frontend, usada para CORS e `trustedOrigins` do BetterAuth |
| `NODE_ENV` | Não (default: `development`) | `development` \| `production` \| `test` |

> No Google Cloud Console, o redirect URI autorizado precisa ser exatamente `{API_BASE_URL}/api/auth/callback/google`.

---

## Endpoints principais

| Método | Rota | Descrição |
| ------ | ---- | --------- |
| GET | `/home/:date` | Dados da home para uma data |
| GET | `/me` | Dados de treino do usuário autenticado |
| PUT | `/me` | Atualiza dados de treino do usuário |
| GET | `/stats` | Estatísticas de consistência do usuário |
| GET | `/workout-plans` | Lista os planos de treino |
| POST | `/workout-plans` | Cria um novo plano de treino |
| GET | `/workout-plans/:workoutPlanId` | Detalha um plano de treino |
| GET | `/workout-plans/:workoutPlanId/days/:workoutDayId` | Detalha um dia de treino |
| POST | `/workout-plans/:workoutPlanId/days/:workoutDayId/sessions` | Inicia uma sessão de treino |
| PATCH | `/workout-plans/:workoutPlanId/days/:workoutDayId/sessions/:sessionId` | Atualiza uma sessão de treino |
| POST | `/ai` | Chat com o personal trainer de IA (streaming) |
| GET/POST | `/api/auth/*` | Rotas do BetterAuth (login, sessão, callback OAuth) |

Todos os endpoints usam validação via Zod (`fastify-type-provider-zod`) e aplicam autenticação via `auth.api.getSession()` quando necessário. Lista completa e testável em `/docs`.

---

## Execução com Docker

O `docker-compose.yml` sobe **apenas o Postgres** (usado no desenvolvimento local, veja [Instalação e execução](#instalação-e-execução)). O `Dockerfile` builda a API em si, para deploy:

```bash
docker build -t fitnnes-backend-api .
docker run -p 8081:8081 --env-file .env fitnnes-backend-api
```

---

## Contribuição

1. Fork e crie uma branch: `git checkout -b feat/minha-feature`
2. Mantenha commits claros (Conventional Commits)
3. Rode o lint antes de abrir o PR (ainda não há testes automatizados configurados):

```bash
pnpm exec eslint .
```

4. Abra um PR descrevendo mudanças e contexto.

---

## Roadmap

- Melhorar cobertura de testes automatizados
- Implementar autenticação multifator
- Adicionar integração com dispositivos vestíveis
- Melhorar observabilidade e logging

---

> Projeto em evolução — contribuições e feedback são bem-vindos.
