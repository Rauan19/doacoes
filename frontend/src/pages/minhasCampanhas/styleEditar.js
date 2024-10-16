// EditarCampanhaStyle.js
import styled from 'styled-components';

export const Formulario = styled.form`
  display: flex;
  color: white;
  flex-direction: column;
  margin: 20px;
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

export const TextArea = styled.textarea`
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const InputFile = styled.input`
  margin-bottom: 16px;
`;

export const Button = styled.button`
  padding: 10px;
  background-color: #6D54CF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;



export const Container = styled.main`
width:100%;
height: 100vh;
font-family: Arial, Helvetica, sans-serif;
display: flex;
align-items: center;
justify-content: center;

`