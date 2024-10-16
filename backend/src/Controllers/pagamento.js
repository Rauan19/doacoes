import { MercadoPagoConfig, Preference } from 'mercadopago';
import Doacao from '../models/doacoesMOdels'; // Verifique se o caminho do modelo está correto
import dotenv from 'dotenv';
import Campanha from '../models/campanha';

dotenv.config();

// Função para criar o pagamento
export const criarPagamento = async (req, res) => {
    const { valor, campanhaId, usuarioId } = req.body;

    // Verifica se todos os dados necessários estão presentes
    if (!valor || !campanhaId || !usuarioId) {
        return res.status(400).json({ error: 'Valores, campanhaId e usuarioId são obrigatórios.' });
    }

    // Buscando a campanha
    const campanha = await Campanha.findById(campanhaId);
    if (!campanha) {
        return res.status(404).json({ error: 'Campanha não encontrada.' });
    }

    // Configuração do Mercado Pago
    const client = new MercadoPagoConfig({
        accessToken: campanha.access_token // Use a variável de ambiente para o token
    });

    try {
        // Criar a doação no banco de dados
        const novaDoacao = new Doacao({
            valor,
            campanhaId,
            usuarioId,
            status: 'pendente', // Status inicial
        });

        await novaDoacao.save(); // Salva a nova doação

        // Criar a preferência de pagamento
        const preference = new Preference(client);
        const preferenceData = {
            items: [
                {
                    title: 'Doação para Campanha',
                    description: 'Doação destinada à campanha de arrecadação',
                    category_id: 'donations',
                    quantity: 1,
                    currency_id: 'BRL',
                    unit_price: Number(valor), // Certifique-se de que o valor seja numérico
                },
            ],
            payer: {
                first_name: 'Rauan', // Nome do comprador
                last_name: 'Neves', // Sobrenome do comprador
            },
            back_urls: {
                success: 'https://doacoes.onrender.com/sucesso',
                failure: 'https://doacoes.onrender.com/falha',
                pending: 'https://doacoes.onrender.com/pendente',
            },
            auto_return: 'approved',
            external_reference: novaDoacao._id.toString(), // Converte o ID da doação para string
            notification_url: "https://doacoes.onrender.com/notfication/webhook"
        };

        // Criando a preferência
        const response = await preference.create({ body: preferenceData });

        // Atualizar a doação com o ID do pagamento, se necessário
        novaDoacao.pagamentoId = response.id; // Supondo que você tenha um campo pagamentoId em Doacao
        await novaDoacao.save();

        // Enviar o link de pagamento de volta para o cliente
        return res.status(201).json({ init_point: response.init_point });
    } catch (error) {
        console.error('Erro ao criar pagamento:', error);
        return res.status(500).json({ error: error.message });
    }
};


// Função para tratar notificações de pagamento
export const notificacaoPagamento = async (req, res) => {
    const { id, topic } = req.query;

    if (topic === 'payment') {
        try {
           
            const payment = await axios.get(`https://api.mercadopago.com/v1/payments/${id}`, {
                headers: {
                    Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}` // Token de acesso do Mercado Pago
                }
            });

            console.log('Detalhes do pagamento:', payment.body)

            // Verifique se o pagamento está realmente aprovado
            if (payment.data.status === 'approved') {
                // Use o external_reference para encontrar a doação relacionada
                const doacaoId = payment.data.external_reference;

                // Atualiza o status da doação
             const resultado =  await Doacao.findOneAndUpdate(
                    { _id: doacaoId },
                    { status: "pago" },
                    {new: true}// Atualiza o status para 'pago'
                );
            
             console.log('Doação atualizada:', resultado);
             console.log("Dados do payment", payment)

            
             const campanhaId = resultado.campanhaId;

             // Atualizar diretamente o valor arrecadado da campanha usando findByIdAndUpdate
             const campanhaAtualizada = await Campanha.findByIdAndUpdate(
                 campanhaId,
                 { $inc: { valorArrecadado: resultado.valor } }, // Incrementa o valor arrecadado
                 { new: true } // Retorna o documento atualizado
             );

             if (!campanhaAtualizada) {
                 console.error('Erro: Campanha não encontrada.');
                 return res.status(404).json({ message: 'Campanha não encontrada' });
             }

             console.log('Campanha atualizada com novo valor total arrecadado:', campanhaAtualizada.valorArrecadado);
            }
            
            res.status(200).json({ message: 'Notificação recebida' });
        } catch (error) {
            console.error('Erro ao processar a notificação:', error);
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(400).json({ message: 'Notificação inválida' });
    }
};

  


