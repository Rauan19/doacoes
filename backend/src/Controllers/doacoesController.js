import Doacao from "../models/doacoesMOdels";
import Campanha from "../models/campanha";



export const criarDoacao = async (req, res) => {
    const { valor, campanhaId, usuarioId, pagamentoId, status } = req.body;

    try {
        const doacao = await Doacao.create({
            valor,
            campanhaId,
            usuarioId,
            pagamentoId,
            status: status || 'pendente'
        });

        // Atualizar valor arrecadado na campanha
        await Campanha.findByIdAndUpdate(campanhaId, { $inc: { valorArrecadado: valor } });

        return res.status(201).json({ doacao });
    } catch (error) {
        return res.status(500).json({ err: error.message });
    }
};


export const todasDoacoesPorCampanha = async (req, res) => {
    const { usuarioId } = req.params;
    try {
        const doacoes = await Doacao.find({usuarioId}).populate('usuarioId').populate('campanhaId');
        return res.status(200).json(doacoes);
    } catch (error) {
        return res.status(500).json({ err: error.message });
    }
};
