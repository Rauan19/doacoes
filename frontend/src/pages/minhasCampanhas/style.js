import styled from 'styled-components';

export const Titulo = styled.h2`
  font-size: 26px;
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
  color: #fff;
  background: linear-gradient(135deg, #bbdefb, #90caf9);
  padding: 15px 0;
  margin-top: 0;
  font-weight: bold;
`;

export const BotaoVoltar = styled.button`
  display: flex;
  align-items: center;
  font-size: 19px;
  color: white;
  background: none;
  border: none;
  cursor: pointer;
  margin: 30px 0 0 20px;
  font-weight: bold;
  transition: color 0.3s;

  &:hover {
    color: #5643bd;
  }
`;

/* Estilo da barra de progresso */
export const ProgressContainer = styled.div`
  width: 90%;
  background-color: #e0e0e0;
  border-radius: 8px;
  height: 15px;
  margin-top: 10px;
`;

export const ProgressBar = styled.div`
  width: 0;
  height: 100%;
  background-color: rebeccapurple;
  transition: width 0.4s ease;
`;

export const ContainerCampanhas = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-family: Arial, Helvetica, sans-serif;
  justify-content: center;
  gap: 1.5rem;
  padding: 2rem;
  height: 80vh;
  overflow-y: auto;
  background-color: #e92063;

  @media (max-width: 768px) {
    padding: 1rem;
    gap: 1rem;
  }
`;

export const CardCampanha = styled.div`
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  width: 310px;
  height: 340px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.03);
  }

  h3 {
    color: green;
    font-weight: 700;
  }

  p {
    color: rebeccapurple;
    font-weight: 700;
  }

  div {
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin-top: auto;

    nav {
      display: flex;
      gap: 10px;
    }
  }
`;

export const ImagemCampanha = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
`;

export const NomeCampanha = styled.h4`
  font-size: 1.4rem;
  color: #333;
  text-align: center;
  margin: 0.5rem 0;
`;

export const DescricaoCampanha = styled.p`
  color: #666;
  font-size: 1rem;
  text-align: center;
  padding: 0 1rem;
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  max-width: 500px;
  width: 90%;

  h2 {
    margin-bottom: 10px;
  }

  p {
    margin: 10px 0;
  }
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #6D54CF;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #5643bd;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;
