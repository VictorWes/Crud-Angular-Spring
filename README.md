# CRUD Angular + Spring

Sistema completo de gerenciamento de cursos desenvolvido com Angular e Spring Boot, implementando um CRUD (Create, Read, Update, Delete) com interface moderna e responsiva.

## 📋 Sobre o Projeto

Este projeto é uma aplicação full-stack que permite gerenciar cursos e suas respectivas aulas. A aplicação foi desenvolvida com foco em boas práticas de desenvolvimento, arquitetura modular e experiência do usuário.

### Funcionalidades

- ✅ **Listagem de Cursos**: Visualize todos os cursos cadastrados com informações detalhadas
- ✅ **Cadastro de Cursos**: Adicione novos cursos com nome, categoria e aulas
- ✅ **Edição de Cursos**: Atualize informações de cursos existentes
- ✅ **Exclusão de Cursos**: Remova cursos com confirmação de segurança
- ✅ **Gerenciamento de Aulas**: Adicione, edite e remova aulas de cada curso
- ✅ **Validação de Formulários**: Validação completa dos dados de entrada
- ✅ **Tratamento de Erros**: Sistema robusto de tratamento e exibição de erros
- ✅ **Interface Responsiva**: Design adaptável para diferentes dispositivos

## 🛠️ Tecnologias Utilizadas

### Frontend

- **Angular 19.2**: Framework principal
- **Angular Material**: Componentes de UI modernos e responsivos
- **TypeScript 5.7**: Linguagem de programação
- **RxJS 7.8**: Programação reativa
- **SCSS**: Pré-processador CSS para estilização

### Ferramentas de Desenvolvimento

- **Angular CLI 19.2**: Interface de linha de comando
- **Karma + Jasmine**: Framework de testes unitários
- **Proxy Configuration**: Configuração de proxy para integração com backend

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── courses/                    # Módulo principal de cursos
│   │   ├── components/            # Componentes reutilizáveis
│   │   │   └── courses-list/      # Lista de cursos
│   │   ├── container/             # Containers de página
│   │   │   ├── courses/           # Página principal
│   │   │   └── course-form/       # Formulário de curso
│   │   ├── guards/                # Guards e resolvers
│   │   │   └── course.resolver.ts # Resolver para carregar dados
│   │   ├── model/                 # Modelos de dados
│   │   │   ├── course.ts          # Interface de Curso
│   │   │   └── lesson.ts          # Interface de Aula
│   │   └── services/              # Serviços
│   │       └── courses.service.ts # Service de cursos
│   └── shared/                     # Módulo compartilhado
│       ├── app-material/          # Configuração do Material
│       ├── components/            # Componentes compartilhados
│       │   ├── confirmation-dialog/ # Diálogo de confirmação
│       │   └── error-dialog/      # Diálogo de erro
│       ├── form/                  # Utilitários de formulário
│       └── pipes/                 # Pipes customizados
│           └── category.pipe.ts   # Pipe para categorias
└── assets/                        # Recursos estáticos
    └── courses.json              # Dados mock
```

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Angular CLI instalado globalmente

```bash
npm install -g @angular/cli
```

### Instalação

1. Clone o repositório
2. Instale as dependências:

```bash
npm install
```

### Servidor de Desenvolvimento

Para iniciar o servidor local de desenvolvimento:

```bash
npm start
```

ou

```bash
ng serve
```

Acesse `http://localhost:4200/` no navegador. A aplicação recarregará automaticamente sempre que você modificar qualquer arquivo fonte.

**Nota**: O comando `npm start` inicia o servidor com configuração de proxy habilitada para se comunicar com o backend Spring Boot.

## 🔧 Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento com proxy
- `npm run build` - Compila o projeto para produção
- `npm test` - Executa os testes unitários
- `npm run watch` - Compila em modo watch para desenvolvimento

## 🏗️ Build

Para compilar o projeto para produção:

```bash
ng build
```

Os arquivos compilados serão armazenados no diretório `dist/`. Por padrão, o build de produção otimiza a aplicação para performance e velocidade.

### Arquitetura

- **Lazy Loading**: Módulos carregados sob demanda
- **Reactive Forms**: Formulários reativos com validação
- **Guards e Resolvers**: Proteção de rotas e pré-carregamento de dados
- **Services**: Camada de serviço para comunicação com API
- **Pipes Customizados**: Transformação de dados na view

### Material Design

- Componentes do Angular Material para interface consistente
- Temas personalizáveis
- Design responsivo e acessível

### Boas Práticas

- Tipagem forte com TypeScript
- Componentização e reutilização de código
- Separação de responsabilidades
- Tratamento adequado de erros
- Código limpo e documentado
