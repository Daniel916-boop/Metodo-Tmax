// server.js
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, 'tasks.json');

// Middlewares
app.use(cors()); // Permite que o frontend acesse este servidor
app.use(express.json()); // Permite que o servidor entenda JSON nas requisições

// Função para ler os dados do arquivo JSON
const readTasksFromFile = () => {
    if (!fs.existsSync(DB_FILE)) {
        return {}; // Retorna um objeto vazio se o arquivo não existir
    }
    try {
        const data = fs.readFileSync(DB_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Erro ao ler arquivo de tarefas:', error);
        return {};
    }
};

// Função para escrever os dados no arquivo
const writeTasksToFile = (tasks) => {
    try {
        fs.writeFileSync(DB_FILE, JSON.stringify(tasks, null, 2));
        console.log('Tarefas salvas com sucesso!');
    } catch (error) {
        console.error('Erro ao salvar tarefas:', error);
        throw error;
    }
};

// --- ROTAS DA API ---

// Rota GET para buscar todas as tarefas
app.get('/api/tasks', (req, res) => {
    try {
        const tasks = readTasksFromFile();
        res.json(tasks);
    } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao buscar tarefas.' });
    }
});

// Rota POST para salvar/atualizar todas as tarefas
app.post('/api/tasks', (req, res) => {
    try {
        const tasks = req.body;
        if (!tasks || typeof tasks !== 'object') {
            return res.status(400).json({ message: 'Dados de tarefa inválidos.' });
        }
        writeTasksToFile(tasks);
        res.status(200).json({ message: 'Tarefas salvas com sucesso!' });
    } catch (error) {
        console.error('Erro ao salvar tarefas:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao salvar tarefas.' });
    }
});

// Rota GET para buscar tarefas de uma data específica
app.get('/api/tasks/:date', (req, res) => {
    try {
        const { date } = req.params;
        const tasks = readTasksFromFile();
        const dayTasks = tasks[date] || { tasks: [], isCompleted: false };
        res.json(dayTasks);
    } catch (error) {
        console.error('Erro ao buscar tarefas da data:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao buscar tarefas da data.' });
    }
});

// Rota PUT para atualizar tarefas de uma data específica
app.put('/api/tasks/:date', (req, res) => {
    try {
        const { date } = req.params;
        const dayData = req.body;
        
        if (!dayData || typeof dayData !== 'object') {
            return res.status(400).json({ message: 'Dados de tarefa inválidos.' });
        }
        
        const tasks = readTasksFromFile();
        tasks[date] = dayData;
        writeTasksToFile(tasks);
        
        res.status(200).json({ message: 'Tarefas da data atualizadas com sucesso!' });
    } catch (error) {
        console.error('Erro ao atualizar tarefas da data:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao atualizar tarefas da data.' });
    }
});

// Rota DELETE para deletar tarefas de uma data específica
app.delete('/api/tasks/:date', (req, res) => {
    try {
        const { date } = req.params;
        const tasks = readTasksFromFile();
        
        if (tasks[date]) {
            delete tasks[date];
            writeTasksToFile(tasks);
            res.status(200).json({ message: 'Tarefas da data deletadas com sucesso!' });
        } else {
            res.status(404).json({ message: 'Nenhuma tarefa encontrada para esta data.' });
        }
    } catch (error) {
        console.error('Erro ao deletar tarefas da data:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao deletar tarefas da data.' });
    }
});

// Rota para servir arquivos estáticos (frontend)
app.use(express.static(path.join(__dirname, '../frontend')));

// Rota catch-all para SPA (Single Page Application)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Inicia o servidor
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`Para acessar externamente, use: http://0.0.0.0:${PORT}`);
});

// Tratamento de erros não capturados
process.on('uncaughtException', (error) => {
    console.error('Erro não capturado:', error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Promise rejeitada não tratada:', reason);
    process.exit(1);
});

