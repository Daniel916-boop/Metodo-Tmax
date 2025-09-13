# Backend - Calendário de Tarefas

## 📋 Visão Geral

Este é o backend da aplicação Calendário de Tarefas, desenvolvido em Node.js com Express.js. Ele fornece uma API REST para gerenciar tarefas e serve os arquivos estáticos do frontend.

## 🏗️ Arquitetura

### Componentes Principais

1. **Servidor Express**: Gerencia requisições HTTP e serve a API
2. **Sistema de Arquivos**: Persiste dados em arquivo JSON
3. **Middleware CORS**: Permite requisições cross-origin
4. **Servir Estáticos**: Serve arquivos do frontend

### Estrutura de Dados

```json
{
  "YYYY-MM-DD": {
    "tasks": [
      {
        "startTime": "HH:MM",
        "endTime": "HH:MM", 
        "title": "string",
        "description": "string",
        "color": "#HEXCOLOR"
      }
    ],
    "isCompleted": boolean
  }
}
```

## 🔌 API Endpoints

### Tarefas Gerais

#### `GET /api/tasks`
Retorna todas as tarefas de todos os dias.

**Resposta de Sucesso (200)**:
```json
{
  "2024-01-15": {
    "tasks": [...],
    "isCompleted": false
  },
  "2024-01-16": {
    "tasks": [...],
    "isCompleted": true
  }
}
```

#### `POST /api/tasks`
Salva/substitui todas as tarefas.

**Corpo da Requisição**:
```json
{
  "2024-01-15": {
    "tasks": [...],
    "isCompleted": false
  }
}
```

**Respostas**:
- **200**: `{"message": "Tarefas salvas com sucesso!"}`
- **400**: `{"message": "Dados de tarefa inválidos."}`
- **500**: `{"message": "Erro interno do servidor ao salvar tarefas."}`

### Tarefas por Data

#### `GET /api/tasks/:date`
Retorna tarefas de uma data específica.

**Parâmetros**:
- `date`: Data no formato YYYY-MM-DD

**Exemplo**: `GET /api/tasks/2024-01-15`

**Resposta de Sucesso (200)**:
```json
{
  "tasks": [
    {
      "startTime": "09:00",
      "endTime": "10:30",
      "title": "Reunião",
      "description": "Reunião de equipe",
      "color": "#1E90FF"
    }
  ],
  "isCompleted": false
}
```

#### `PUT /api/tasks/:date`
Atualiza tarefas de uma data específica.

**Corpo da Requisição**:
```json
{
  "tasks": [...],
  "isCompleted": false
}
```

#### `DELETE /api/tasks/:date`
Remove todas as tarefas de uma data específica.

**Respostas**:
- **200**: `{"message": "Tarefas da data deletadas com sucesso!"}`
- **404**: `{"message": "Nenhuma tarefa encontrada para esta data."}`

## 🗂️ Gerenciamento de Dados

### Arquivo de Dados
- **Localização**: `./tasks.json`
- **Formato**: JSON válido
- **Criação**: Automática se não existir
- **Backup**: Recomendado fazer backup regular

### Funções de Persistência

#### `readTasksFromFile()`
- Lê dados do arquivo JSON
- Retorna objeto vazio se arquivo não existir
- Trata erros de parsing JSON

#### `writeTasksToFile(tasks)`
- Escreve dados no arquivo JSON
- Formata JSON com indentação (2 espaços)
- Loga sucesso/erro no console

## ⚙️ Configuração

### Variáveis de Ambiente

```bash
PORT=3000                    # Porta do servidor (padrão: 3000)
NODE_ENV=development         # Ambiente (development/production)
```

### Scripts NPM

```json
{
  "start": "node server.js",           # Produção
  "dev": "nodemon server.js"           # Desenvolvimento
}
```

## 🔒 Segurança

### Medidas Implementadas
- **CORS**: Configurado para permitir todas as origens
- **JSON Parsing**: Limitado a requisições válidas
- **Error Handling**: Tratamento de erros não capturados
- **Input Validation**: Validação básica de dados

### Considerações para Produção
- Implementar autenticação/autorização
- Configurar CORS para origens específicas
- Adicionar rate limiting
- Usar banco de dados real
- Implementar logs estruturados
- Adicionar monitoramento

## 🚀 Deploy

### Desenvolvimento Local
```bash
npm install
npm run dev  # Com auto-reload
```

### Produção
```bash
npm install --production
npm start
```

### Docker (Opcional)
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 📊 Monitoramento

### Logs do Servidor
O servidor registra:
- Inicialização na porta especificada
- Operações de leitura/escrita de arquivos
- Erros de parsing JSON
- Erros não capturados

### Exemplo de Logs
```
Servidor rodando em http://localhost:3000
Para acessar externamente, use: http://0.0.0.0:3000
Tarefas salvas com sucesso!
Erro ao ler arquivo de tarefas: SyntaxError: Unexpected token...
```

## 🔧 Troubleshooting

### Problemas Comuns

#### Arquivo tasks.json corrompido
```bash
# Backup do arquivo atual
mv tasks.json tasks.json.backup

# Criar arquivo vazio válido
echo '{}' > tasks.json

# Reiniciar servidor
npm start
```

#### Erro de permissão
```bash
# Verificar permissões
ls -la tasks.json

# Corrigir permissões (Linux/Mac)
chmod 666 tasks.json
```

#### Porta ocupada
```bash
# Encontrar processo
lsof -ti:3000

# Matar processo
kill -9 <PID>

# Ou usar porta diferente
PORT=3001 npm start
```

## 🔄 Extensões Futuras

### Melhorias Sugeridas
1. **Banco de Dados**: PostgreSQL ou MongoDB
2. **Autenticação**: JWT ou OAuth
3. **Cache**: Redis para performance
4. **Validação**: Joi ou Yup para validação robusta
5. **Testes**: Jest para testes unitários
6. **API Docs**: Swagger/OpenAPI
7. **Rate Limiting**: Express-rate-limit
8. **Logs**: Winston para logs estruturados

### Exemplo de Extensão - Autenticação
```javascript
// middleware/auth.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.sendStatus(401);
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
```

---

**Desenvolvido por Manus AI** - Backend robusto e escalável para gerenciamento de tarefas.

