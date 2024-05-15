import Header from "../components/Header";
import styled from "styled-components";
import { Formulario } from "../components/Formulario";

const PasswordPage = () => {
  return (
    <Container>
      <Header />
      <FormContainer>
        <Formulario />
      </FormContainer>
    </Container>
  );
};

export default PasswordPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;
