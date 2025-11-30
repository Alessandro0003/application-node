# Application Node

API REST para gerenciamento de cursos e matrículas, construída com Fastify, TypeScript e Drizzle ORM.

## 🚀 Funcionalidades

### Autenticação
- **POST /auth/sessions** - Login de usuários com geração de JWT

### Usuários
- **POST /users** - Cadastro de novos usuários (estudantes ou gerentes)
- **GET /users** - Listagem de todos os usuários
- **GET /users/:id** - Busca de usuário específico por ID

### Cursos
- **POST /courses** - Criação de cursos (apenas gerentes autenticados)
- **GET /courses** - Listagem pública de cursos
- **GET /courses/:id** - Detalhes de curso específico (requer autenticação)

### Matrículas
- **POST /enrollments** - Matrícula de usuário em curso

## 🏗️ Arquitetura

O projeto segue uma **arquitetura modular em camadas**, organizada da seguinte forma:

```
src/
├── modules/           # Módulos de domínio
│   ├── auth/         # Autenticação
│   ├── users/        # Usuários
│   ├── courses/      # Cursos
│   └── enrollments/  # Matrículas
│       ├── controllers/  # Camada de apresentação (HTTP handlers)
│       ├── services/     # Camada de lógica de negócio
│       ├── repository/   # Camada de acesso a dados
│       ├── db/           # Schema do banco de dados
│       └── routes/       # Definição de rotas
├── middleware/       # Middlewares compartilhados (autenticação, autorização)
├── database/         # Configuração do banco e schemas centralizados
├── config/           # Configurações da aplicação
└── utils/            # Funções utilitárias
```

### Princípios Aplicados

- **Separação de responsabilidades**: Cada camada tem uma responsabilidade clara
- **Modularização por domínio**: Funcionalidades isoladas por módulos
- **Repository Pattern**: Abstração da camada de dados
- **Dependency Injection**: Injeção de dependências via Fastify plugins
- **Type Safety**: TypeScript end-to-end com validação via Zod

## 🛠️ Tecnologias

- **Fastify** - Framework web
- **TypeScript** - Linguagem
- **Drizzle ORM** - ORM para PostgreSQL
- **Zod** - Validação de schemas
- **JWT** - Autenticação
- **Argon2** - Hash de senhas
- **Vitest** - Testes
- **Swagger** - Documentação da API

## 📋 Pré-requisitos

- Node.js
- PostgreSQL
- Docker (opcional)

## 🔧 Instalação

```bash
npm install
```

## ⚙️ Configuração

Configure as variáveis de ambiente nos arquivos `.env` e `.env.test`

## 🎮 Comandos

```bash
# Desenvolvimento
npm run dev

# Testes
npm test
npm run test:watch
npm run test:coverage

# Banco de dados
npm run db:generate    # Gerar migrations
npm run db:migrate     # Aplicar migrations
npm run db:studio      # Interface visual do banco
```

## 📖 Documentação

Acesse `/docs` após iniciar o servidor para visualizar a documentação Swagger completa da API.

## 👥 Controle de Acesso

- **Estudantes**: Podem visualizar cursos e fazer matrículas
- **Gerentes**: Podem criar e gerenciar cursos

## 🔐 Segurança

- Senhas criptografadas com Argon2
- Autenticação via JWT
- Validação de dados com Zod
- Controle de roles (RBAC)

## 🚦 CI/CD

### Integração Contínua (CI)

O projeto utiliza **GitHub Actions** para executar testes E2E automaticamente em cada push ou pull request.

**Pipeline de testes** (`.github/workflows/tests-e2e.yml`):
- Provisionamento automático de PostgreSQL em container
- Instalação de dependências com cache
- Execução completa da suite de testes E2E
- Ambiente isolado para cada execução

Os testes são executados com:
- Node.js 22
- PostgreSQL 13 Alpine
- Banco de dados dedicado para testes (`app_node_test`)
- Healthcheck automático do banco antes dos testes

### Deploy Contínuo (CD)

O deploy da aplicação é realizado na plataforma **Fly.io** com as seguintes características:

**Configuração** (`fly.toml`):
- Região: São Paulo (GRU)
- Porta interna: 3333
- HTTPS forçado
- Auto-scaling com mínimo de 0 máquinas
- Memória: 1GB por máquina

**Processo de deploy**:
```bash
# Deploy manual
fly deploy

# Logs em tempo real
fly logs

# Status da aplicação
fly status
```

**Release automático**:
- Migrations do banco são aplicadas automaticamente antes do deploy
- Comando de release: `npm run db:migrate`
- Zero downtime durante atualizações

**Variáveis de ambiente**:
Configure os secrets no Fly.io:
```bash
fly secrets set DATABASE_URL="sua-connection-string"
fly secrets set JWT_SECRET="seu-secret"
```
