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
    header: <div style={{ textAlign: 'center' }}>id</div>,
    accessorKey: "id",
  },

  {
    header: <div style={{ textAlign: 'center' }}>idGrupo</div>,
    accessorKey: "name",
  },
  {
    header: <div style={{ textAlign: 'center' }}>nombre</div>,
    accessorKey: "lastname",
  },
  {
    header: <div style={{ textAlign: 'center' }}>Fecha Nacimiento</div>,
    accessorKey: "email",
  },
  {
    header: <div style={{ textAlign: 'center' }}>Foto</div>,
    accessorKey: "country",
  },
  {
    header: <div style={{ textAlign: 'center' }}>Editar</div>,
    accessorKey: "edit",
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
