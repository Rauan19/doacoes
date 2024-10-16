import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

export const MeuBanco = async () => {
  try {
    // Verifica se a URL do banco está presente nas variáveis de ambiente
    if (!process.env.DB_URL) {
      throw new Error("A variável de ambiente DB_URL não está definida.");
    }

    // Conectando ao banco de dados
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Banco conectado com sucesso!");
  } catch (err) {
    console.error("Erro ao conectar no banco de dados:", err);
  }
};
