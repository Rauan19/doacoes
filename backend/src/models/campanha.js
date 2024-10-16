// src/models/Campanha.js
import mongoose from 'mongoose';

const campanhaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  valorMeta: {  
    type: Number,
    required: true,
  },
  valorArrecadado: { 
    type: Number,
    default: 0,  
  },
  imagem: {
    type: String,
    required: true,
  },
  access_token:{
    type: String,
    required: true,
  },
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
}, { timestamps: true });

const Campanha = mongoose.model('Campanha', campanhaSchema);
export default Campanha;
