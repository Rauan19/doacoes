import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../../api/api";
import {
  Frase,
  ContainerCampanha,
  NomeCampanha,
  CampanhasContainer,
  CampanhaCard,
  ImagemCampanha,
  TituloCampanha,
  Button,
  ModalOverlay,
  ModalContent,
  ProgressContainer,
  ProgressBar,
} from "./style";
import { Commet } from 'react-loading-indicators';

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

export const PageHome = () => {
  const navigate = useNavigate();
  const [campanhas, setCampanhas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDetalhesOpen, setModalDetalhesOpen] = useState(false);
  const [selectedCampanha, setSelectedCampanha] = useState(null);
  const [valorDoacao, setValorDoacao] = useState("");
  const [error, setError] = useState("");

  const session = JSON.parse(localStorage.getItem("doacao"));
  const usuarioId = session?.id;

  const allCampanha = async () => {
    try {
      const response = await api.get("/allcampanha");
      setCampanhas(response.data.MOstrarTudo);
    } catch (error) {
      console.error("Erro ao buscar campanhas:", error.message);
      alert("Erro ao mostrar todas as campanhas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    allCampanha();
  }, []);

  const formatarValor = (valor) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };

  const calcularPorcentagem = (arrecadado, meta) => {
    return ((arrecadado / meta) * 100).toFixed(2);
  };

  const abrirDoacaoModal = (campanha) => {
    if(!session?.token) {
        navigate('/login')
        return
    }
    setSelectedCampanha(campanha);
    setModalOpen(true);
  };

  const abrirDetalhesModal = (campanha) => {
    setSelectedCampanha(campanha);
    setModalDetalhesOpen(true);
  };

  const IrparaCriarCampanha = () => {
    if(!session?.token) {
      navigate("/login")
    }
    navigate("/criarcampanha")
  }

  const fecharModal = () => {
    setModalOpen(false);
    setSelectedCampanha(null);
    setValorDoacao("");
    setError("");
  };

  const fecharDetalhesModal = () => {
    setModalDetalhesOpen(false);
    setSelectedCampanha(null);
  };

  const validarValorDoacao = (valor) => {
    const valorNumerico = parseFloat(valor);
    return !isNaN(valorNumerico) && valorNumerico > 0;
  };

  const criarDoacao = async () => {
    if (!validarValorDoacao(valorDoacao)) {
      setError("Por favor, insira um valor válido para a doação.");
      return;
    }

    try {
      const campanhaId = selectedCampanha._id;
      await api.post("/doacoes", {
        valor: parseFloat(valorDoacao),
        campanhaId: campanhaId,
        usuarioId: usuarioId,
      }, {
        headers: {
          Authorization: `Bearer ${session.token}`
        }
      });
      alert("Doação criada");
      await criarPagamento();
    } catch (err) {
      setError(`Erro ao tentar registrar a doação: ${err.response?.data?.message || err.message}`);
    }
  };

  const criarPagamento = async () => {
    try {
      const respostaPagamento = await api.post("/criarpagamento", {
        valor: parseFloat(valorDoacao),
        campanhaId: selectedCampanha._id,
        usuarioId: usuarioId,
      }, {
        headers: {
          Authorization: `Bearer ${session.token}`
        }
      });

      alert("Pagamento criado");
      window.location.href = respostaPagamento.data.init_point;
    } catch (err) {
      setError(`Erro ao tentar processar o pagamento: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <Commet color="#3f51b5" size={32} />
        </div>
      ) : (
        <>
          <Frase>
            <h1>Bem-vindo ao DoeAqui</h1>
            <p>Faça a diferença hoje! Doe para causas que importam.</p>
            <button onClick={IrparaCriarCampanha}>Criar Campanha</button>
          </Frase>

          <ContainerCampanha>
            <NomeCampanha>
              <h2>
                Cam<span>panhas</span>
              </h2>
            </NomeCampanha>
            <CampanhasContainer>
              {campanhas.length > 0 ? (
                campanhas.map((campanha) => (
                  <CampanhaCard key={campanha._id}>
                    <ImagemCampanha
                      src={campanha.imagem ? `https://doacoes.onrender.com${campanha.imagem}` : "URL_DE_IMAGEM_PADRAO"}
                      alt={`${campanha.titulo} - Imagem principal`}
                    />
                    <TituloCampanha>{campanha.titulo}</TituloCampanha>
                    <h4>Meta: {formatarValor(campanha.valorMeta)}</h4>
                    <p>Arrecadado: {formatarValor(campanha.valorArrecadado)}</p>
                    <ProgressContainer>
                      <ProgressBar style={{ width: `${calcularPorcentagem(campanha.valorArrecadado, campanha.valorMeta)}%` }} />
                    </ProgressContainer>
                    <p>{calcularPorcentagem(campanha.valorArrecadado, campanha.valorMeta)}% arrecadado</p>
                    <div>
                      <Button onClick={() => abrirDoacaoModal(campanha)}>Doar</Button>
                      <Button onClick={() => abrirDetalhesModal(campanha)}>Ver Detalhes</Button>
                    </div>
                  </CampanhaCard>
                ))
              ) : (
                <p>Não tem campanha</p>
              )}
            </CampanhasContainer>
          </ContainerCampanha>

          {modalOpen && (
            <ModalOverlay>
              <ModalContent>
                <button onClick={fecharModal}>Fechar</button>
                {selectedCampanha && (
                  <>
                    <h2>Doar para {selectedCampanha.titulo}</h2>
                    <Input
                      type="number"
                      value={valorDoacao}
                      onChange={(e) => setValorDoacao(e.target.value)}
                      placeholder="Digite o valor da doação"
                    />
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    <div>
                      <Button onClick={criarDoacao}>Continuar Pagamento</Button>
                    </div>
                  </>
                )}
              </ModalContent>
            </ModalOverlay>
          )}

          {modalDetalhesOpen && (
            <ModalOverlay>
              <ModalContent>
                <button onClick={fecharDetalhesModal}>Fechar</button>
                {selectedCampanha && (
                  <>
                    <h2>{selectedCampanha.titulo}</h2>
                    <p>{selectedCampanha.descricao}</p>
                    <p>Meta: {formatarValor(selectedCampanha.valorMeta)}</p>
                    <p>Arrecadado: {formatarValor(selectedCampanha.valorArrecadado)}</p>
                  </>
                )}
              </ModalContent>
            </ModalOverlay>
          )}
        </>
      )}
    </>
  );
};
