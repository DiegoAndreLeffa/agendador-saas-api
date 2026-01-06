import styled from 'styled-components';

export const Container = styled.div``;

export const Header = styled.header`
  padding: 32px 0;
  background: #28262e;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  > h1 {
    font-size: 24px;
    line-height: 28px;
    margin-left: 20px; 
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;
    color: #999591;
    &:hover { color: #f4ede8; }
  }
`;

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
`;

export const Calendar = styled.aside`
  width: 380px;
  .rdp {
    --rdp-cell-size: 40px;
    --rdp-accent-color: #ff9000;
    --rdp-background-color: #3e3b47;
    margin: 0;
  }
  /* Estilização básica do DayPicker para ficar dark */
  .rdp-day_selected:not([aria-disabled="true"]) { 
    background-color: var(--rdp-accent-color); 
    font-weight: bold;
    color: #232129;
  }
  .rdp-day:hover:not([aria-disabled="true"]) {
    background-color: #3e3b47;
  }
`;

export const Schedule = styled.div`
  flex: 1;
  margin-left: 120px;

  h1 {
    font-size: 36px;
  }

  p {
    margin-top: 8px;
    color: #ff9000;
    display: flex;
    align-items: center;
    font-weight: 500;
    
    span {
      display: flex;
      align-items: center;
    }
    
    span + span::before {
      content: '';
      width: 1px;
      height: 12px;
      background: #ff9000;
      margin: 0 8px;
    }
  }
`;

export const Section = styled.section`
  margin-top: 48px;

  > strong {
    color: #999591;
    font-size: 20px;
    line-height: 26px;
    border-bottom: 1px solid #3e3b47;
    display: block;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }
`;

export const Appointment = styled.div`
  display: flex;
  align-items: center;

  & + div {
    margin-top: 16px;
  }

  span {
    margin-left: auto;
    display: flex;
    align-items: center;
    color: #f4ede8;
    width: 70px;
  }

  div {
    flex: 1;
    background: #3e3b47;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-left: 24px;

    strong {
      color: #fff;
      font-size: 20px;
    }

    /* Foto do cliente (vamos usar um placeholder por enquanto) */
    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      margin-right: 16px;
    }
  }
`;