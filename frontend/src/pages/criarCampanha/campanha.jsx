import { useState } from "react";
import { Container, Form, Input, TextArea, Button, Label, FileInput } from "./style";
import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { Commet } from 'react-loading-indicators';

export const CriarCampanha = () => {
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valorMeta, setValorMeta] = useState("");
  const [imagem, setImagem] = useState(null);
  const [access_token, setAccessToken] = useState(""); 
  const [loading, setLoading] = useState(false);
  const session = JSON.parse(localStorage.getItem("doacao"));
  const usuarioId = session?.id;

  const handleImageChange = (e) => {
    setImagem(e.target.files[0]);
  };

  const handleLearnMoreClick = () => {
    window.open("https://youtu.be/ctwqHp1H0-0?si=6lDMWzTGiiowItz9", "_blank");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("descricao", descricao);
    formData.append("valorMeta", valorMeta);
    formData.append("imagem", imagem);
    formData.append("access_token", access_token);

    try {
      await api.post(
        `/campanhas/${usuarioId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${session.token}`
          },
        }
      );
      alert("Criado com sucesso");
      navigate("/");
    } catch (error) {
      console.error("Erro ao criar campanha:", error.message);
      alert("Erro ao criar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <Commet color="#3f51b5" size={32} />
        </div>
      ) : (
        <>
          <h2>Criar Nova Campanha</h2>
          <div>
            <nav onClick={() => navigate("/")}>
              <IoArrowBackCircle size="24px" style={{ marginRight: '5px' }} />
              <h2>Voltar</h2>  
            </nav>
          </div>
          <Form onSubmit={handleSubmit}>
            <Label>Título</Label>
            <Input 
              type="text" 
              value={titulo} 
              onChange={(e) => setTitulo(e.target.value)} 
              placeholder="Digite o Título da campanha"
              required 
            />
            
            <Label>Descrição</Label>
            <TextArea 
              value={descricao} 
              onChange={(e) => setDescricao(e.target.value)} 
              placeholder="Digite a descrição"
              required 
            />
            
            <Label>Valor Meta</Label>
            <Input 
              type="number" 
              value={valorMeta} 
              onChange={(e) => setValorMeta(e.target.value)} 
              placeholder="Digite o valor de meta"
              required 
            />
            
            <Label>Upload de Imagem</Label>
            <FileInput 
              type="file" 
              onChange={handleImageChange} 
              required 
            />

            <Label>Access Token do Mercado Pago</Label>
            <Input 
              type="text" 
              value={access_token} 
              onChange={(e) => setAccessToken(e.target.value)} 
              placeholder="Digite seu token do Mercado Pago"
              required 
            />
            <a href="#" onClick={handleLearnMoreClick} target="_blank" rel="noopener noreferrer">
              Como conseguir o Access Token?
            </a>
            
            <Button type="submit">Criar Campanha</Button>
          </Form>
        </>
      )}
    </Container>
  );
};
