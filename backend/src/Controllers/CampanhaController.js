// src/controllers/campanhaController.js
import Campanha from '../models/campanha';
import cloudinary from '../config/cloudNary';
import fs from 'fs'; // Para excluir a imagem local após o upload

export const criarCampanha = async (req, res) => {
    const { titulo, descricao, valorMeta, access_token } = req.body;
    const { usuarioId } = req.params;

    // Verifica se os campos obrigatórios estão preenchidos
    if (!titulo || !descricao || !usuarioId) {
        return res.status(400).json("Título, descrição e usuário ID são obrigatórios.");
    }

    if (!access_token) {
        return res.status(400).json("Access_token obrigatório");
    }

    try {
        // Verifica se uma imagem foi enviada
        if (!req.file) {
            return res.status(400).json("Uma imagem é obrigatória.");
        }

        const imagemPath = req.file.path; // Caminho da imagem temporária

        // Faz o upload da imagem para o Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(imagemPath);

        // Exclui a imagem local após o upload
        fs.unlinkSync(imagemPath);

        const novaCampanha = await Campanha.create({
            titulo,
            descricao,
            imagem: uploadResponse.secure_url, // URL da imagem armazenada no Cloudinary
            usuarioId,
            valorMeta,
            valorArrecadado: 0,
            access_token,
        });

        // Log para verificar a nova campanha criada
        console.log("Nova campanha criada:", novaCampanha);

        return res.status(201).json(novaCampanha);
    } catch (error) {
        // Log para capturar o erro
        console.error("Erro ao criar campanha:", error);
        return res.status(500).json({ error: error.message });
    }
};


export const TodasDoacoes = async (req, res) => {
    try {
        const MOstrarTudo = await Campanha.find()

        if(!MOstrarTudo) {
           return res.status(404).json("Não existe campanha")
        }
        return res.status(200).json({MOstrarTudo})
    } catch (error) {
        return res.status(500).json({err: error.message})
    }
}

export const allCampanhaporUserId = async (req, res) => {
    const {usuarioId} = req.params
    try {
        const CampanhaDoUser = await Campanha.find({usuarioId})

        if(!CampanhaDoUser) {
          return res.status(404),json("Você ainda não tem campanhas q percente a você ")
        }

        return res.status(200).json({CampanhaDoUser})
    } catch (error) {
        return res.status(500).json({err: error.message})
    }
}

export const DeletarCampanha = async(req, res) => {
    const {id} = req.params
    try {
        const campanha = await Campanha.findByIdAndDelete(id)
        if(!campanha) {
            return res.status(404).json({ message: "Campanha não encontrada." }); 
        }
        return res.status(200).json({ message: "Campanha deletada com sucesso." });
    } catch (error) {

        return res.status(500).json({err: error.message})
        
    }

}

export const editarCampanha = async (req, res) => {
    const { id } = req.params; // ID da campanha
    const { titulo, descricao, valorMeta, access_token } = req.body; // Dados da campanha
    const imagem = req.file ? `/uploads/${req.file.filename}` : null; // Nova imagem, se enviada
  
    // Verifica se o token de acesso foi fornecido
    if (!access_token) {
      return res.status(400).json({ mensagem: "Access_token obrigatório" });
    }
  
    try {
      // Cria um objeto com os dados para atualização
      const dadosAtualizados = {
        titulo,
        descricao,
        valorMeta,
        ...(imagem && { imagem }), // Adiciona a imagem apenas se ela for enviada
      };
  
      // Atualiza a campanha e retorna a campanha atualizada
      const campanhaAtualizada = await Campanha.findByIdAndUpdate(
        id,
        dadosAtualizados,
        { new: true } // Retorna o documento atualizado
      );
  
      // Verifica se a campanha foi encontrada
      if (!campanhaAtualizada) {
        return res.status(404).json({ mensagem: "Campanha não encontrada" });
      }
  
      // Responde com a campanha atualizada
      return res.status(200).json({ mensagem: "Campanha atualizada com sucesso", campanha: campanhaAtualizada });
    } catch (error) {
      // Retorna erro caso algo dê errado
      return res.status(500).json({ err: error.message });
    }
  };
  