import { useNavigate } from 'react-router-dom';
import { ContainerCampanhas, Titulo, CardCampanha, ImagemCampanha, NomeCampanha, Button, BotaoVoltar, ProgressContainer, ProgressBar, Modal, ModalContent } from './style';
import { IoArrowBackCircle } from "react-icons/io5";
import api from '../../api/api';
import { useEffect, useState } from 'react';
import { Commet } from 'react-loading-indicators';
import { ContainerLoading } from '../MinhasDoacoes/style';

const MinhasCampanhas = () => {
  const navigate = useNavigate();
  const [minhascampanhas, setMinhasCampanhas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [campanhaSelecionada, setCampanhaSelecionada] = useState(null);
  const [loading, setLoading] = useState(false); // Estado de carregamento
  const session = JSON.parse(localStorage.getItem("doacao"));
  
  const minhasCampanhas = async () => {
    setLoading(true); // Ativa o loading ao buscar campanhas
    try {
      const usuarioId = session?.id;
      if (!usuarioId) {
        console.error("ID do usuário não encontrado");
        return;
      }

      const response = await api.get(`/campanha/${usuarioId}`, {
        headers: {
          Authorization: `Bearer ${session.token}`
        }
      });
     
      if (response) {
        setMinhasCampanhas(response.data.CampanhaDoUser);
      }
    } catch (error) {
      console.error("Erro ao buscar campanhas:", error);
    } finally {
      setLoading(false); // Desativa o loading após a resposta
    }
  };

  const formatarValor = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  };

  const calcularPorcentagem = (arrecadado, meta) => {
    return ((arrecadado / meta) * 100).toFixed(2);
  };

  const abrirModal = (campanha) => {
    setCampanhaSelecionada(campanha);
    setModalVisible(true);
  };

  const fecharModal = () => {
    setModalVisible(false);
    setCampanhaSelecionada(null);
  };

  const DeletarMinhaCampanha = async (id) => {
    setLoading(true); // Ativa o loading ao deletar campanha
    try {
      await api.delete(`/campanha/${id}`, {
        headers: {
          Authorization: `Bearer ${session.token}`
        }
      });
      alert("Campanha excluída com sucesso");
      minhasCampanhas(); // Recarrega as campanhas
    } catch (error) {
      alert("Erro ao excluir campanha");
      console.error(error.message);
    } finally {
      setLoading(false); // Desativa o loading após a resposta
    }
  };

  useEffect(() => {
    minhasCampanhas();
  }, []);

  return (
    <>
      <Titulo>Minhas Campanhas</Titulo>
      <BotaoVoltar onClick={() => navigate("/")}>
        <IoArrowBackCircle size="24px" style={{ marginRight: '5px' }} />
        Voltar
      </BotaoVoltar>
      
      {loading ? (
      <ContainerLoading>
        <Commet color="#6D54CF" size="large" /> 
      </ContainerLoading>
      ) : (
        <ContainerCampanhas>
          {minhascampanhas.length > 0 ? (
            minhascampanhas.map((campanha) => (
              <CardCampanha key={campanha._id}>
                <ImagemCampanha src={`https://doacoes.onrender.com${campanha.imagem}`} alt={campanha.nome} />
                <NomeCampanha>{campanha.titulo}</NomeCampanha>
                <h3>Meta: {formatarValor(campanha.valorMeta)}</h3>
                <p>Arrecadado: {formatarValor(campanha.valorArrecadado)}</p>
                <ProgressContainer>
                  <ProgressBar style={{
                    width: `${calcularPorcentagem(campanha.valorArrecadado, campanha.valorMeta)}%`
                  }}/>
                </ProgressContainer>
                <p>{calcularPorcentagem(campanha.valorArrecadado, campanha.valorMeta)}% arrecadado</p>

                <div>
                  <Button onClick={() => abrirModal(campanha)}>Ver Detalhes</Button>
                  <nav>
                    <Button onClick={() => DeletarMinhaCampanha(campanha._id)}>Excluir</Button>
                    <Button onClick={() => navigate(`/editar-campanha/${campanha._id}`)}>Editar</Button>
                  </nav>
                </div>
              </CardCampanha>
            ))
          ) : (
            <p>Você ainda não possui campanhas.</p>
          )}
        </ContainerCampanhas>
      )}

      {modalVisible && campanhaSelecionada && (
        <Modal>
          <ModalContent>
            <h2>{campanhaSelecionada.titulo}</h2>
            <ImagemCampanha src={`https://doacoes.onrender.com${campanhaSelecionada.imagem}`} alt={campanhaSelecionada.titulo} />
            <p>{campanhaSelecionada.descricao}</p>
            <Button onClick={fecharModal}>Fechar</Button>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default MinhasCampanhas;
