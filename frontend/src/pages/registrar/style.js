import styled from 'styled-components';

export const StyledContainer = styled.div`
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg,  #bbdefb);
  font-family: Arial, Helvetica, sans-serif;
  padding: 1rem;
`;

export const StyledCard = styled.div`
  width: 100%;
  max-width: 400px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`;

export const StyledCardHeader = styled.div`
  text-align: center;
  margin-bottom: 1rem;
  p {
    color: #666;
    font-size: 14px;
  }
`;

export const StyledCardTitle = styled.h1`
  font-size: 24px;
  color:  #6D54CF;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

export const StyledCardContent = styled.div`
  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .input-group {
    position: relative;
  }
  .input-icon {
    position: relative;
    svg {
      position: absolute;
      left: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      color: #666;
    }
  }
`;

export const StyledInput = styled.input`
  width: 90%;
  padding: 0.75rem;
  padding-left: 2.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  &:focus {
    border-color: #2196f3;
    outline: none;
  }
`;

export const StyledButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color:  #6D54CF;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: rosybrown;
  }
`;

export const StyledCardFooter = styled.div`
  text-align: center;
  margin-top: 1rem;
  p {
    font-size: 14px;
    a {
      color:  #6D54CF;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;
