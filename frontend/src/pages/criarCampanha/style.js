import styled from "styled-components";

export const Container = styled.div`
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  overflow-y: auto;
  color: white;
  height: 95vh;
  padding: 5px;
  font-family: Arial, Helvetica, sans-serif;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  h2{
    margin-bottom:10px;
  }
  @media (max-width: 768px) {
    padding: 15px;
    max-width: 90%;
  }
  div{
    width: 100%;
    display: flex;
    nav{
        display: flex;
    }
    h2{
        font-size: 20px;

    }

    &:hover{
        color: #5643bd;
    }
  }
`;

export const Form = styled.form`
  display: flex;
  margin-top: 8px;
  justify-content: center;
  flex-direction: column;
  gap: 8px;

  @media (max-width: 768px) {
    gap: 8px;
    
  }
`;

export const Label = styled.label`
  font-size: 16px;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const Input = styled.input`
  padding: 4px;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 16px;

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 14px;
  }
`;

export const TextArea = styled.textarea`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 16px;
  resize: vertical;

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 14px;
  }
`;

export const FileInput = styled.input`
  padding: 10px;
  font-size: 16px;

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 14px;
  }
`;

export const Button = styled.button`
  padding: 12px;
  background-color: #6d54cf;
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #5643bd;
  }

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 14px;
  }
`;
