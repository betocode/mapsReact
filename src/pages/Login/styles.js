import styled from "styled-components";

export const LoginBg = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #2193b0;
  background: -webkit-linear-gradient(to right, #6dd5ed, #2193b0);
  background: linear-gradient(to right, #6dd5ed, #2193b0);
`;

export const LoginContainer = styled.div`
  width: 30rem;
  height: 30rem;
  background-color: #fff;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
`;

export const ButtonContainer = styled.div`
  flex-direction: row;
  align-items: space-between;
  justify-content: space-between;
  width: 100%;
`;
