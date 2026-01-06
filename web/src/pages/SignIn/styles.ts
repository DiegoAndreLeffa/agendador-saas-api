import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center; // Centraliza vertical
  justify-content: center; // Centraliza horizontal
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center;

  width: 100%;
  max-width: 400px;
  background: #232129; // Um pouco mais escuro que o fundo
  padding: 40px;
  border-radius: 10px;

  form {
    margin: 40px 0;
    width: 300px;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 10px;

    h1 {
      margin-bottom: 24px;
    }

    input {
      background: #232129;
      border-radius: 10px;
      border: 2px solid #232129;
      padding: 16px;
      width: 100%;
      color: #f4ede8;
      background: #121214; /* Fundo do input */

      &::placeholder {
        color: #666360;
      }
    }

    button {
      background: #ff9000; /* Laranja destaque */
      height: 56px;
      border-radius: 10px;
      border: 0;
      padding: 0 16px;
      color: #312e38;
      width: 100%;
      font-weight: 500;
      margin-top: 16px;
      transition: background-color 0.2s;

      &:hover {
        background: #cc7300;
      }
    }
  }
`;