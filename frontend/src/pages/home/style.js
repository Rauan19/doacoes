import styled from "styled-components";

export const Frase = styled.div`
  position: relative;
  top: 50px;
  width: 100%;
  height: 30vh;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 20px;

  button {
    padding: 9px 9px;
    font-weight: 600;
    border: none;
    margin-top: 10px;
    font-family: Arial, Helvetica, sans-serif;
    cursor: pointer;
    border-radius: 7px;
    background-color: #6d54cf;
  }

  @media (max-width: 768px) {
    height: 30vh;
    font-size: 14px;

    
    button {

      padding: 7px 14px;
      font-size: 14px;
    }
  }
`;

export const ContainerCampanha = styled.div`
  width: 100%;
 overflow-y:auto;
  position: relative;
  top: 30px;
  height:70vh;
  
  

  
`;

export const NomeCampanha = styled.h2`
  color: white;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 32px;
  display:flex;
  justify-content: center;
  @media (max-width: 768px) {
    font-size: 28px;
  }

  h2{
    font-size:28px;
    

    span{
        color: #6d54cf;
    }

  }
`;

export const CampanhasContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: #e92063;
  justify-content: center;
  gap: 20px;
  
  padding: 20px;
`;

export const CampanhaCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  width: 310px;
  font-family: Arial, Helvetica, sans-serif;
  padding: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  h4{
    color: green;
  }

  div{
    display: flex;
    gap: 20px;
  }
  p{
    color:  #5643bd;
  }
`;

export const ImagemCampanha = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
`;

export const TituloCampanha = styled.h3`
  font-size: 1.25rem;
  margin: 10px 0;
  color: #333;
`;

export const DescricaoCampanha = styled.p`
  color: #666;
  font-size: 1rem;
  margin-bottom: 20px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: #6d54cf;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #5643bd;
  }
`;


export const ModalOverlay = styled.div`
  position: fixed;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 700;
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

/* Estilo da barra de progresso */
export const ProgressContainer = styled.div`
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  height: 8px;
  margin-top: 8px;
`;

export const ProgressBar = styled.div`
  background-color: rebeccapurple;
  height: 100%;
  transition: width 0.4s ease;
`;


export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
  position: relative;

  h2 {
    margin-top: 0;
  }

  button {
    position: relative;
    padding: 5px;
    color: white;
    font-weight: 700;
    border-radius: 7px;
    background-color:#6d54cf ;
    border: none;
   
    right: 10px;
  }
`;
