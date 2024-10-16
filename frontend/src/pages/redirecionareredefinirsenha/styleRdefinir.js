// src/components/RedefinirSenhaFormStyle.js
import styled from 'styled-components';

export const Formulario = styled.form`
  display: flex;
  flex-direction: column;
  margin: 20px;
  background-color: white;
  width: 70%;
  height: 20vh;
  font-family: Arial, Helvetica, sans-serif;
  padding:40px;
  border-radius: 10px;
  justify-content: center;
  max-width: 400px; /* Limitar a largura do formulário */
   /* Centralizar o formulário */
`;

export const Label = styled.label`
  margin-bottom: 8px;
  font-weight: bold;
`;

export const Input = styled.input`
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Button = styled.button`
  padding: 10px;
  background-color:  #6D54CF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  
`;


export const ContainerSenhaTOken = styled.main`
font-family: Arial, Helvetica, sans-serif;
width: 100%;
height: 100vh;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;

h2{
    margin-top: 50px;
    color: white;
}
`
