import styled from "styled-components";

export const ComponetHeader = styled.header`
  background-color: #6D54CF;
  width: 100%;
  height: 65px;
  position: fixed;
  z-index: 4;
  display: flex;
  align-items: center;
  font-family: Arial, Helvetica, sans-serif;
  justify-content: space-around; /* Alterado para space-between para o menu */
   /* Adicionado para controle de posição do menu */

  div {
    display: flex;
    color: white;
    gap: 15px;
  }
  
  nav {
    display: flex;
    gap: 18px;
    align-items: center;
    transition: all 0.3s ease; /* Para suavizar a transição */
    font-family: Arial, Helvetica, sans-serif;
    /* Para esconder o nav em mobile */
    @media (max-width: 768px) {
      display: none; /* Esconde o nav por padrão em mobile */
      flex-direction: column; /* Para exibir em coluna quando aberto */
      position: absolute; /* Para posicionar o nav em relação ao header */
      background-color: #6D54CF; /* Cor de fundo do menu */
      top: 65px; /* Abaixo do header */
      right: 0; /* Alinhado à direita */
      padding: 10px;
      z-index: 10; /* Para sobrepor outros elementos */
    }
  }

  nav.open {
    display: flex; /* Exibe o nav quando a classe "open" é aplicada */
  }

  .menu-icon {
    display: none; /* Ocultar por padrão */
    
    @media (max-width: 768px) {
      display: flex; /* Exibir no mobile */
      color: white;
      cursor: pointer;
    }
  }

  p {
    color: white;
    cursor: pointer;
  }

  h2 {
    cursor: pointer;
    padding: 6px;
    border-radius: 5px;
    background-color: #e92063;
    font-size: 15px;
    display: flex;
    gap: 4px;
  }
`;
