# Guia de Instalação Rápida

## 🚀 Instalação em 3 Passos

### 1. Preparar o Ambiente
Certifique-se de ter o Node.js instalado:
```bash
node --version  # Deve mostrar v14.0.0 ou superior
npm --version   # Deve mostrar 6.0.0 ou superior
```

Se não tiver o Node.js, baixe em: https://nodejs.org/

### 2. Instalar e Executar
```bash
# Extrair o projeto
unzip calendar_app.zip
cd calendar_app

# Instalar dependências
cd backend
npm install

# Iniciar o servidor
npm start
```

### 3. Acessar a Aplicação
Abra seu navegador e acesse: **http://localhost:3000**

## ✅ Verificação da Instalação

Se tudo estiver funcionando, você verá:
- ✅ Calendário anual com 12 meses
- ✅ Possibilidade de clicar em qualquer dia
- ✅ Interface responsiva e limpa

## 🔧 Comandos Úteis

```bash
# Parar o servidor
Ctrl + C (no terminal onde está rodando)

# Reiniciar o servidor
npm start

# Modo desenvolvimento (auto-reload)
npm run dev
```

## 🆘 Problemas?

### Porta 3000 ocupada?
```bash
# Use outra porta
PORT=3001 npm start
# Acesse: http://localhost:3001
```

### Erro de permissão?
```bash
# No Windows (como Administrador)
npm install

# No Linux/Mac
sudo npm install
```

### Não consegue acessar?
- Verifique se digitou corretamente: `http://localhost:3000`
- Não abra o arquivo HTML diretamente
- Certifique-se que o servidor está rodando (deve mostrar "Servidor rodando em...")

## 📞 Suporte

Se ainda tiver problemas, verifique o arquivo `README.md` para documentação completa ou consulte a seção "Solução de Problemas".

