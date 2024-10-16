import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { Formulario, Label, Input, TextArea, Button, InputFile, Container } from './styleEditar';
import { Commet } from 'react-loading-indicators';

const session = JSON.parse(localStorage.getItem("doacao"));

const EditarCampanha = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Estado de carregamento para todas as chamadas API
  const [campanha, setCampanha] = useState({
    titulo: '',
    descricao: '',
    valorMeta: '',
    access_token: '',
    imagem: null,
  });

  const buscarCampanha = async () => {
    setLoading(true); // Ativa o loading antes da chamada API
    try {
      const response = await api.get(`/campanha/${id}`, {
        headers: {
          Authorization: `Bearer ${session.token}`
        }
      });
      setCampanha(response.data);
    } catch (error) {
      console.error("Erro ao buscar campanha:", error);
    } finally {
      setLoading(false); // Desativa o loading após a resposta
    }
  };

  useEffect(() => {
    buscarCampanha();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCampanha((prevCampanha) => ({ ...prevCampanha, [name]: value }));
  };

  const handleFileChange = (e) => {
    setCampanha((prevCampanha) => ({ ...prevCampanha, imagem: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Ativa o loading antes da chamada API de atualização

    const formData = new FormData();
    formData.append('titulo', campanha.titulo);
    formData.append('descricao', campanha.descricao);
    formData.append('valorMeta', campanha.valorMeta);
    formData.append('access_token', campanha.access_token);
    if (campanha.imagem) {
      formData.append('imagem', campanha.imagem);
    }

    try {
      await api.put(`/campanha/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${session.token}`
        },
      });
      alert('Campanha atualizada com sucesso!');
      navigate('/');
    } catch (error) {
      console.error('Erro ao atualizar campanha:', error);
      alert('Erro ao atualizar campanha');
    } finally {
      setLoading(false); // Desativa o loading após a resposta
    }
  };

  return (
    <Container>
      {loading ? (
        <Commet color="#6D54CF" size="large" /> // Indicador de carregamento
      ) : (
        <Formulario onSubmit={handleSubmit}>
          <Label>Título</Label>
          <Input type="text" name="titulo" value={campanha.titulo} onChange={handleChange} placeholder='Digite o titulo' required />
          
          <Label>Descrição</Label>
          <TextArea name="descricao" rows="4" value={campanha.descricao} onChange={handleChange} placeholder='Descrição' required/>
          
          <Label>Valor da Meta</Label>
          <Input type="number" name="valorMeta" value={campanha.valorMeta} onChange={handleChange} placeholder='Valor de Meta' required />

          <Label>Acesso Token</Label>
          <Input type="text" name="access_token" value={campanha.access_token} onChange={handleChange} placeholder='Digite seu acess_token Mercado pago' required />
          
          <Label>Imagem da Campanha</Label>
          <InputFile type="file" accept="image/*" onChange={handleFileChange}  />
          
          <Button type="submit" disabled={loading}>
            {loading ? <Commet color="white" size="small" /> : 'Atualizar Campanha'}
          </Button>
        </Formulario>
      )}
    </Container>
  );
};

export default EditarCampanha;
