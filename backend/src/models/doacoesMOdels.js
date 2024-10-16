// src/models/Doacao.js
import mongoose from 'mongoose';

const doacaoSchema = new mongoose.Schema({
  campanhaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campanha',
    required: true,
  },
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
  valor: {
    type: Number,
    required: true,
  },
  pagamentoId: {  // Campo para armazenar o ID do pagamento do Mercado Pago
    type: String,
    required: false,
  },
  email:{
    type: String
  },
  status: {
    type: String,
    enum: ['pendente', 'aprovada', 'recusada'],
    default: 'pendente',
  },
}, { timestamps: true });

const Doacao = mongoose.model('Doacao', doacaoSchema);
export default Doacao;
