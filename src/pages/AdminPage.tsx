import Header from "../components/Header";
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { getUsuarioActual } from "../services/authService";
import { getAlumnos } from "../services/authService";
import TablaAlumnos from "../components/TablaAlumnos";

const TablaAlumnosStyled = styled.div`
  padding-top: 20px;
`;

const columnsAlumnos = [
  {
    header: "id",
    accessorKey: "id",
  },

  {
    header: "idGrupo",
    accessorKey: "name",
  },
  {
    header: "nombre",
    accessorKey: "lastname",
  },
  {
    header: "Fecha Nacimiento",
    accessorKey: "email",
  },
  {
    header: "Foto",
    accessorKey: "country",
  },
];

const AdminPage = () => {
  const [alumnos, setAlumnos] = useState([]);

  useEffect(() => {
    getAlumnos()
      .then((data) => {
        setAlumnos(data);
      })
      .catch((error) => {
        console.error("Error obteniendo los reportes:", error);
      });
  }, []);

  return (
    <Container>
      <Header />
      <TablaAlumnosStyled>
        <TablaAlumnos data={alumnos} columns={columnsAlumnos} />
      </TablaAlumnosStyled>
    </Container>
  );
};

export default AdminPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem; // Ajusta este valor según tus necesidades
`;
