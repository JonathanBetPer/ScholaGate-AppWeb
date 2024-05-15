import React from "react";
import LogInCard from "../components/LogInCard";
import Header from "../components/Header";
import styled from "styled-components";

const LogInPage = () => {
  return (
    <Container>
      <Header />
      <LogInCard />
    </Container>
  );
};

export default LogInPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem; // Ajusta este valor según tus necesidades
`;
