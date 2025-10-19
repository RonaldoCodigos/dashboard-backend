const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); 

// <-- MUDANÇA: Importa o "molde" que acabamos de criar
const Transaction = require('./models/Transaction.js'); 

const app = express();

// === CONFIGURAÇÕES (Middlewares) ===
app.use(cors());
app.use(express.json());
// ===================================

const PORT = process.env.PORT || 3002;

// <-- MUDANÇA: O banco de dados falso foi APAGADO!
// Não precisamos mais dele.


// === ROTAS DA NOSSA API ===
app.get('/', (req, res) => {
  res.send('API do Dashboard Financeiro funcionando! 🚀');
});

// <-- MUDANÇA: Rota GET agora busca no MongoDB
app.get('/api/transactions', async (req, res) => {
  try {
    // Usa o "molde" para encontrar TODAS as transações no banco
    const transactions = await Transaction.find();
    res.json(transactions); // Envia o resultado
  } catch (err) {
    console.error('Erro ao buscar transações:', err);
    res.status(500).json({ error: 'Erro ao buscar transações' });
  }
});

// <-- MUDANÇA: Rota POST agora salva no MongoDB
app.post('/api/transactions', async (req, res) => {
  try {
    // 1. Pega os dados do body (description, amount, type)
    const { description, amount, type } = req.body;

    // 2. Cria uma nova transação usando o "molde"
    const newTransaction = new Transaction({
      description,
      amount,
      type
    });

    // 3. Salva a nova transação no banco de dados
    const savedTransaction = await newTransaction.save();

    // 4. Envia a transação salva de volta como resposta
    res.status(201).json(savedTransaction);
  } catch (err) {
    console.error('Erro ao salvar transação:', err);
    res.status(500).json({ error: 'Erro ao salvar transação' });
  }
});
// ==========================


// === CONEXÃO COM O BANCO DE DADOS ===
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Conectado ao MongoDB Atlas com sucesso!');
    app.listen(PORT, () => {
      console.log(`Servidor rodando com sucesso em http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erro ao conectar ao MongoDB Atlas:', err);
  });

  // Rota DELETE: Deletar uma transação
// (Ex: http://localhost:3002/api/transactions/671...id...b93)
app.delete('/api/transactions/:id', async (req, res) => {
  try {
    // 1. Pega o ID que veio na URL (ex: :id)
    const { id } = req.params;

    // 2. Procura no banco pela transação com esse ID e a deleta
    // (Nota: findByIdAndDelete precisa de um ID válido do MongoDB)
    const deletedTransaction = await Transaction.findByIdAndDelete(id);

    // 3. Se não encontrar, avisa o front-end
    if (!deletedTransaction) {
      return res.status(404).json({ error: 'Transação não encontrada' });
    }

    // 4. Se der certo, envia uma mensagem de sucesso
    res.json({ message: 'Transação deletada com sucesso' });
  } catch (err) {
    console.error('Erro ao deletar transação:', err);
    res.status(500).json({ error: 'Erro ao deletar transação' });
  }
});