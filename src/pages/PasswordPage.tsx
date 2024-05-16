import Header from "../components/Header";
import styled from "styled-components";
import { Formulario } from "../components/Formulario";
import { CardContraseñaCambiada } from "../components/CardContraseñaCambiada"; // Asegúrate de importar este componente
import React, { useState } from "react";
const PasswordPage = () => {
  const [isPasswordSet, setIsPasswordSet] = useState(false); // Asegúrate de tener este estado

  return (
    <Container>
      <Header />
      <FormContainer>
        {isPasswordSet ? (
          <CardContraseñaCambiada />
        ) : (
          <Formulario setIsPasswordSet={setIsPasswordSet} />
        )}
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
