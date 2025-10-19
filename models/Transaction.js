const mongoose = require('mongoose');

// 1. O "Molde" (Schema)
// Define a estrutura que todo documento de transação terá
const TransactionSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true // O campo é obrigatório
  },
  amount: {
    type: Number,
    required: true // O campo é obrigatório
  },
  type: {
    type: String, // Será "entrada" ou "saída"
    required: true
  },
  date: {
    type: Date,
    default: Date.now // Se não for informado, usa a data atual
  }
});

// 2. O "Modelo" (Model)
// Cria o modelo 'Transaction' baseado no Schema
// É o 'Transaction' que usaremos para criar, ler, atualizar e deletar dados
const Transaction = mongoose.model('Transaction', TransactionSchema);

// 3. Exporta o Modelo
module.exports = Transaction;