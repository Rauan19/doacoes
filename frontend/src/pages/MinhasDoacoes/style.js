import styled from 'styled-components';

export const Titulo = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  height: 50px;
  position: relative;
  top: 60px;
  padding-top: 20px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 26px;
  background: linear-gradient(5deg, #e92063, #52a997);
  color: #fff;
  font-weight: bold;
`;
export const ModalContainer = styled.div`
  position: fixed;
  font-family:Arial, Helvetica, sans-serif;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; // Certifique-se de que o modal fique acima de outros componentes
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 500px;
  position: relative; // Para o botão de fechar
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rebeccapurple;
  padding: 4px;
  color: white;
  border: none;
  font-size: 16px;
  cursor: pointer;
`;

export const ContainerDoacoes = styled.div`
  display: flex;
  gap: 10px;
  overflow-y: auto;
  height:79vh;
  justify-content: center;
  padding:5px;
  flex-wrap: wrap ;
  background-color:  #e92063;
  

  @media (max-width: 768px) {
    
    padding: 1rem;
  }
`;

export const CardDoacao = styled.div`
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  margin-top:20px;
  overflow: hidden;
  height: 49vh;
  font-family: Arial, Helvetica, sans-serif;
  width: 380px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s;

  div{
    width: 90%;
    gap: 5px;
    height: 27vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &:hover {
    transform: scale(1.03);
  }
`;

export const ImagemDoacao = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

export const NomeCampanha = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin: 1rem 0 0.5rem;
  text-align: center;
`;

export const ValorDoado = styled.p`
  font-size: 1.2rem;
  color: #6D54CF;
  font-weight: bold;
  margin: 0.5rem 0;
  color: green;
`;

export const DescricaoDoacao = styled.p`
  color: #666;
  font-size: 1rem;
  text-align: center;
  padding: 0 1rem;
`;

export const Button = styled.button`
  margin: 1rem;
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

export const Voltar = styled.div`
 display: flex;
  height: 40px;
  background:none;
  font-size: 19px;
  color: white;
  margin-top: 30px;
  cursor: pointer;
  width: 100%;
  border: none;
 position: relative;
  top: 20px;
  left: 20px;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;

  &:hover {
    color: #5643bd;
  }
  .Link{
    display: flex;
    color: white;
    text-decoration: none;

    &:hover{
      color: #5643bd;
    }

    .ico{
      &:hover{
      color: #5643bd;
    }
    }
  }

  &:hover {
    color: #5643bd;
  }
`

export const ContainerLoading = styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: center;
height: 90vh;

`
