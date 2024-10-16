import { useEffect, useState } from 'react';
import api from '../../api/api';
import { ContainerDoacoes, Titulo, CardDoacao, ImagemDoacao, ValorDoado, DescricaoDoacao, Button, Voltar, ModalContainer, ModalContent, CloseButton , ContainerLoading} from './style';
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { Commet } from 'react-loading-indicators';

const MinhasDoacoes = () => {
  const [doacoes, setDoacao] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [modalOpen, setModalOpen] = useState(false);
  const [doacaoSelecionada, setDoacaoSelecionada] = useState(null);
  const session = JSON.parse(localStorage.getItem("doacao"));
  const usuarioId = session?.id;

  const Minhasdoacoes = async () => {
    setLoading(true);
    try {
      const response = await api(`/doacoes/campanha/${usuarioId}`, {
        headers: {
          Authorization: `Bearer ${session?.token}`
        }
      });
      if (response.data) {
        setDoacao(response.data);
      }
    } catch (error) {
      console.error({ err: error.message });
      alert("Erro ao mostrar suas doações");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Minhasdoacoes();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pago':
        return 'green';
      case 'pendente':
        return 'orange';
      default:
        return 'grey';
    }
  };

  const handleOpenModal = (doacao) => {
    setDoacaoSelecionada(doacao);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setDoacaoSelecionada(null);
  };

  return (
    <>
      <Titulo>Minhas Doações</Titulo>
      <Voltar>
        <Link to="/" className='Link'>
          <IoArrowBackCircleSharp color='white' className='ico' />
          Voltar
        </Link>
      </Voltar>

      {loading ? (
        <ContainerLoading>
          <Commet color="#6D54CF" size="large" /> 
        </ContainerLoading>
        // Exibe o indicador de carregamento
      ) : (
        <ContainerDoacoes>
          {doacoes.map((doacao) => (
            <CardDoacao key={doacao?._id}>
              <ImagemDoacao src={`http://localhost:4005${doacao?.campanhaId?.imagem || ''}`} alt={doacao?.campanhaId?.titulo || 'Imagem indisponível'} />
              <div>
                <h4>{doacao?.campanhaId?.titulo || 'Título indisponível'}</h4>
                <h4 style={{ color: getStatusColor(doacao?.status) }}>Status: {doacao?.status || 'Desconhecido'}</h4>
                <ValorDoado>R$:{doacao?.valor || '0.00'}</ValorDoado>
                <Button onClick={() => handleOpenModal(doacao)}>Ver Detalhes</Button>
              </div>
            </CardDoacao>
          ))}
        </ContainerDoacoes>
      )}

      {modalOpen && (
        <ModalContainer>
          <ModalContent>
            <CloseButton onClick={handleCloseModal}>Fechar</CloseButton>
            <h2>{doacaoSelecionada?.campanhaId?.titulo || 'Título indisponível'}</h2>
            <ImagemDoacao src={`http://localhost:4005${doacaoSelecionada?.campanhaId?.imagem || ''}`} alt={doacaoSelecionada?.campanhaId?.titulo || 'Imagem indisponível'} />
            <p>Descrição: {doacaoSelecionada?.campanhaId?.descricao || 'Descrição indisponível'}</p>
            <p>Email: {doacaoSelecionada?.usuarioId?.email || 'Email indisponível'}</p>
            <h3>Status: {doacaoSelecionada?.status || 'Desconhecido'}</h3>
            <ValorDoado>R$:{doacaoSelecionada?.valor || '0.00'}</ValorDoado>
            <DescricaoDoacao>{doacaoSelecionada?.descricao || 'Descrição indisponível'}</DescricaoDoacao>
          </ModalContent>
        </ModalContainer>
      )}
    </>
  );
};

export default MinhasDoacoes;
