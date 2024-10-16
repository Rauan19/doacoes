import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Usuario } from '../models/user.MOdels'; // Verifique o caminho do modelo do usuário

dotenv.config();

// Configuração do transportador do Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Seu email do Gmail
    pass: process.env.EMAIL_PASS, // Sua senha ou senha de app
  },
});

// Função para enviar e-mail de redefinição de senha
export const enviarEmailRedefinicao = async (req, res) => {
  const { email } = req.body;

  try {
    // Verificar se o usuário existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // Gerar um token de redefinição de senha válido por 1 hora
    const token = jwt.sign({ userId: usuario._id }, process.env.TOKEN_CODE, {
      expiresIn: '1h',
    });

    // Criar o link de redefinição de senha
    const link = `https://doacoes-ashen.vercel.app/redefinir-senha/${token}`;

    // Configurar o conteúdo do e-mail
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Redefinição de Senha',
      text: `Você solicitou uma redefinição de senha. Clique no link a seguir para redefinir sua senha: ${link}`,
    };

    // Enviar o e-mail
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'E-mail de redefinição de senha enviado com sucesso.' });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    res.status(500).json({ message: 'Erro ao enviar e-mail.' });
  }
};

// Função para redefinir a senha
export const redefinirSenha = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    // Verificar se o token é válido
    const decoded = jwt.verify(token, process.env.TOKEN_CODE);
    const usuarioId = decoded.userId;

    // Encontrar o usuário pelo ID
    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // Criptografar a nova senha
    const hashedSenha = await bcrypt.hash(password, 10);

    // Atualizar a senha no banco de dados
    usuario.password = hashedSenha;
    await usuario.save();

    res.status(200).json({ message: 'Senha redefinida com sucesso.' });
  } catch (error) {
    console.error('Erro ao redefinir a senha:', error);
    res.status(500).json({ message: 'Erro ao redefinir a senha.' });
  }
};
