# Calendário Anual de Tarefas - Aplicação Full-Stack

Uma aplicação web completa para gerenciamento de tarefas com visualização anual, desenvolvida com Node.js no backend e JavaScript vanilla no frontend.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Arquitetura](#arquitetura)
- [Instalação](#instalação)
- [Como Usar](#como-usar)
- [API Endpoints](#api-endpoints)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Desenvolvimento](#desenvolvimento)
- [Solução de Problemas](#solução-de-problemas)

## 🎯 Visão Geral

O Calendário Anual de Tarefas é uma aplicação web que permite aos usuários visualizar um ano inteiro em uma única tela e gerenciar suas tarefas diárias de forma intuitiva. A aplicação oferece uma interface limpa e responsiva, com funcionalidades avançadas como arrastar e soltar, cópia de tarefas entre dias, e marcação de dias como concluídos.

### Principais Características

- **Visualização Anual Completa**: Veja todos os 12 meses do ano em uma única tela
- **Gestão Semanal Detalhada**: Clique em qualquer dia para ver a semana completa com detalhes das tarefas
- **Persistência de Dados**: Todas as informações são salvas automaticamente no servidor
- **Interface Responsiva**: Funciona perfeitamente em desktop e dispositivos móveis
- **Funcionalidades Avançadas**: Arrastar e soltar, copiar/colar tarefas, divisão de tarefas

## ✨ Funcionalidades

### Gestão de Tarefas
- ✅ Adicionar tarefas com horário de início e fim
- ✅ Definir título, descrição e cor personalizada para cada tarefa
- ✅ Editar tarefas existentes inline
- ✅ Excluir tarefas individualmente
- ✅ Reordenar tarefas por arrastar e soltar
- ✅ Dividir tarefas longas em múltiplas atividades

### Organização Temporal
- 📅 Visualização anual com todos os meses
- 📅 Navegação entre anos (anterior/próximo)
- 📅 Visualização semanal detalhada
- 📅 Marcação visual de dias com tarefas
- 📅 Marcação de dias como concluídos

### Produtividade
- 📋 Copiar tarefas de um dia para outro
- 📋 Colar tarefas em múltiplos dias
- 📋 Ordenação automática por horário
- 📋 Cores personalizáveis para categorização
- 📋 Interface intuitiva e responsiva

## 🏗️ Arquitetura

A aplicação segue uma arquitetura cliente-servidor simples e eficiente:

### Backend (Node.js + Express)
- **Servidor HTTP**: Express.js para servir a API REST
- **Armazenamento**: Arquivo JSON para persistência de dados
- **CORS**: Configurado para permitir requisições do frontend
- **Rotas RESTful**: Endpoints para CRUD completo das tarefas

### Frontend (HTML + CSS + JavaScript)
- **Interface Responsiva**: CSS Grid e Flexbox para layouts adaptativos
- **JavaScript Vanilla**: Sem dependências externas, código limpo e performático
- **Comunicação Assíncrona**: Fetch API para comunicação com o backend
- **Gerenciamento de Estado**: Estado local sincronizado com o servidor

### Fluxo de Dados
1. **Carregamento**: Frontend busca dados do servidor via GET /api/tasks
2. **Modificações**: Usuário interage com a interface
3. **Sincronização**: Mudanças são enviadas automaticamente via POST /api/tasks
4. **Persistência**: Servidor salva dados no arquivo JSON

## 🚀 Instalação

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm (geralmente incluído com Node.js)

### Passo a Passo

1. **Extrair o projeto**:
   ```bash
   unzip calendar_app.zip
   cd calendar_app
   ```

2. **Instalar dependências do backend**:
   ```bash
   cd backend
   npm install
   ```

3. **Iniciar o servidor**:
   ```bash
   npm start
   ```

4. **Acessar a aplicação**:
   Abra seu navegador e acesse: `http://localhost:3000`

### Instalação para Desenvolvimento

Se você quiser modificar o código:

```bash
cd backend
npm install nodemon --save-dev
npm run dev  # Inicia com auto-reload
```

## 📖 Como Usar

### Navegação Básica

1. **Visualização Anual**:
   - A tela inicial mostra todos os 12 meses do ano atual
   - Use os botões "< Ano Anterior" e "Próximo Ano >" para navegar entre anos
   - Dias com tarefas aparecem com borda verde
   - Dias concluídos mostram um ✓ verde

2. **Visualização Semanal**:
   - Clique em qualquer dia para ver a semana completa
   - A semana selecionada fica destacada em azul
   - O dia clicado fica destacado em azul escuro

### Gerenciamento de Tarefas

#### Adicionar Nova Tarefa
1. Na visualização semanal, localize o cartão do dia desejado
2. Preencha os campos:
   - **Início**: Horário de início (opcional)
   - **Fim**: Horário de término (opcional)
   - **Título**: Nome da tarefa (obrigatório)
   - **Cor**: Selecione uma cor para categorização
   - **Descrição**: Detalhes adicionais (opcional)
3. Clique em "Adicionar"

#### Editar Tarefa Existente
1. Clique no botão "Editar" (amarelo) na tarefa
2. Modifique os campos desejados
3. Clique em "Salvar"

#### Reordenar Tarefas
- Arraste uma tarefa pelo ícone ⠿ para reposicioná-la
- As tarefas são automaticamente ordenadas por horário

#### Dividir Tarefas
1. Clique no botão "+" (verde) na tarefa
2. Informe o horário de divisão
3. Uma nova tarefa será criada com o tempo restante

#### Copiar e Colar Tarefas
1. Clique em "Copiar" no dia de origem
2. Navegue para o dia de destino
3. Clique em "Colar"

#### Marcar Dia como Concluído
- Clique no botão "Concluir Dia" no cabeçalho do cartão
- O dia ficará marcado com ✓ verde
- Para desmarcar, clique em "Desmarcar"

## 🔌 API Endpoints

### GET /api/tasks
Retorna todas as tarefas armazenadas.

**Resposta**:
```json
{
  "2024-01-15": {
    "tasks": [
      {
        "startTime": "09:00",
        "endTime": "10:30",
        "title": "Reunião de equipe",
        "description": "Discussão sobre projeto",
        "color": "#1E90FF"
      }
    ],
    "isCompleted": false
  }
}
```

### POST /api/tasks
Salva/atualiza todas as tarefas.

**Corpo da Requisição**:
```json
{
  "2024-01-15": {
    "tasks": [...],
    "isCompleted": false
  }
}
```

### GET /api/tasks/:date
Retorna tarefas de uma data específica.

**Exemplo**: `GET /api/tasks/2024-01-15`

### PUT /api/tasks/:date
Atualiza tarefas de uma data específica.

### DELETE /api/tasks/:date
Remove todas as tarefas de uma data específica.

## 📁 Estrutura do Projeto

```
calendar_app/
├── backend/
│   ├── server.js          # Servidor Express principal
│   ├── package.json       # Dependências e scripts
│   ├── .gitignore        # Arquivos ignorados pelo Git
│   └── tasks.json        # Dados das tarefas (criado automaticamente)
├── frontend/
│   └── index.html        # Interface do usuário
└── README.md             # Esta documentação
```

### Arquivos Principais

#### backend/server.js
Servidor Express que:
- Configura middlewares (CORS, JSON parsing)
- Define rotas da API REST
- Gerencia persistência em arquivo JSON
- Serve arquivos estáticos do frontend

#### frontend/index.html
Aplicação single-page que inclui:
- HTML estrutural com grid responsivo
- CSS para estilização e responsividade
- JavaScript para lógica de negócio e comunicação com API

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js**: Runtime JavaScript para servidor
- **Express.js**: Framework web minimalista e flexível
- **CORS**: Middleware para Cross-Origin Resource Sharing
- **File System (fs)**: Módulo nativo para manipulação de arquivos

### Frontend
- **HTML5**: Estrutura semântica da aplicação
- **CSS3**: Estilização com Grid, Flexbox e responsividade
- **JavaScript ES6+**: Lógica de negócio com async/await e fetch
- **Drag and Drop API**: Para reordenação de tarefas

### Ferramentas de Desenvolvimento
- **npm**: Gerenciador de pacotes
- **nodemon**: Auto-reload durante desenvolvimento
- **Git**: Controle de versão (configurado com .gitignore)

## 💻 Desenvolvimento

### Estrutura do Código Frontend

#### Variáveis Globais
```javascript
const API_URL = '/api/tasks';           // URL base da API
let tasks = {};                         // Estado local das tarefas
let clipboard = null;                   // Tarefas copiadas
let draggedItem = null;                 // Item sendo arrastado
```

#### Funções Principais
- `loadTasksFromServer()`: Carrega dados do servidor
- `saveTasksToServer()`: Sincroniza estado local com servidor
- `renderYearGrid()`: Renderiza visualização anual
- `renderWeeklyTasks()`: Renderiza visualização semanal
- `renderTasks()`: Renderiza lista de tarefas de um dia

#### Padrões de Código
- Funções assíncronas para comunicação com API
- Tratamento de erros com try/catch
- Feedback visual para o usuário
- Código modular e reutilizável

### Adicionando Novas Funcionalidades

#### Exemplo: Nova Rota de API
```javascript
// No server.js
app.get('/api/tasks/summary', (req, res) => {
    const tasks = readTasksFromFile();
    const summary = {
        totalDays: Object.keys(tasks).length,
        completedDays: Object.values(tasks).filter(day => day.isCompleted).length
    };
    res.json(summary);
});
```

#### Exemplo: Nova Funcionalidade Frontend
```javascript
// Função para estatísticas
async function showStatistics() {
    try {
        const response = await fetch('/api/tasks/summary');
        const summary = await response.json();
        alert(`Total de dias com tarefas: ${summary.totalDays}\nDias concluídos: ${summary.completedDays}`);
    } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);
    }
}
```

## 🔧 Solução de Problemas

### Problemas Comuns

#### Servidor não inicia
**Erro**: `Error: listen EADDRINUSE :::3000`
**Solução**: A porta 3000 já está em uso. Mate o processo ou use outra porta:
```bash
# Encontrar processo na porta 3000
lsof -ti:3000
# Matar processo
kill -9 <PID>
# Ou usar porta diferente
PORT=3001 npm start
```

#### Tarefas não salvam
**Sintomas**: Mudanças não persistem após recarregar página
**Possíveis causas**:
1. Servidor não está rodando
2. Problemas de permissão no arquivo tasks.json
3. Erro de rede

**Soluções**:
```bash
# Verificar se servidor está rodando
curl http://localhost:3000/api/tasks

# Verificar permissões
ls -la backend/tasks.json
chmod 666 backend/tasks.json

# Verificar logs do servidor
# (mensagens aparecem no terminal onde rodou npm start)
```

#### Interface não carrega
**Sintomas**: Página em branco ou erro 404
**Soluções**:
1. Verificar se está acessando `http://localhost:3000` (não 3001 ou outra porta)
2. Verificar se o arquivo `frontend/index.html` existe
3. Verificar console do navegador (F12) para erros JavaScript

#### Problemas de CORS
**Erro**: `Access to fetch at 'http://localhost:3000/api/tasks' from origin 'null' has been blocked by CORS policy`
**Solução**: Certifique-se de acessar via `http://localhost:3000`, não abrindo o arquivo HTML diretamente

### Logs e Debugging

#### Logs do Servidor
O servidor mostra logs importantes no terminal:
```
Servidor rodando em http://localhost:3000
Tarefas salvas com sucesso!
Erro ao ler arquivo de tarefas: [detalhes do erro]
```

#### Logs do Frontend
Abra o Console do Desenvolvedor (F12) para ver:
```javascript
console.log('Tarefas carregadas do servidor:', tasks);
console.error('Erro ao salvar tarefas no servidor:', error);
```

### Backup e Recuperação

#### Fazer Backup
```bash
cp backend/tasks.json backup_tasks_$(date +%Y%m%d).json
```

#### Restaurar Backup
```bash
cp backup_tasks_20240115.json backend/tasks.json
```

#### Reset Completo
```bash
rm backend/tasks.json
# Reiniciar servidor - um novo arquivo vazio será criado
```

---

**Desenvolvido por Manus AI** - Uma solução completa para gerenciamento de tarefas com foco na produtividade e usabilidade.

