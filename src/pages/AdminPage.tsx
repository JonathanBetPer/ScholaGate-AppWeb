import Header from "../components/Header";
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { getUsuarioActual } from "../services/authService";
import { getAlumnos } from "../services/authService";
import { getUsers } from "../services/authService";
import TablaUsuarios from "../components/TablaUsuarios";
import TablaAlumnos from "../components/TablaAlumnos";
const TablaAlumnosStyled = styled.div`
  padding-top: 20px;
`;

const columnsAlumnos = [
  {
    header: <div style={{ textAlign: "center" }}>id</div>,
    accessorKey: "id",
  },

  {
    header: <div style={{ textAlign: "center" }}>idGrupo</div>,
    accessorKey: "name",
  },
  {
    header: <div style={{ textAlign: "center" }}>nombre</div>,
    accessorKey: "lastname",
  },
  {
    header: <div style={{ textAlign: "center" }}>Fecha Nacimiento</div>,
    accessorKey: "email",
  },
  {
    header: <div style={{ textAlign: "center" }}>Foto</div>,
    accessorKey: "country",
  },
  {
    header: <div style={{ textAlign: "center" }}>Editar</div>,
    accessorKey: "edit",
  },
];

const columnsUsuarios = [
  {
    header: "id",
    accessorKey: "id",
  },

  {
    header: "Nombre",
    accessorKey: "name",
  },
  {
    header: "Correo",
    accessorKey: "lastname",
  },
  {
    header: "Rol",
    accessorKey: "email",
  },
  {
    header: "Seleccionar",
    id: "select",
    Cell: ({ row }) => (
      <button
        onClick={() => setSelectedUser(row.original)}
        style={{ display: "block", opacity: 1 }}
      >
        Seleccionar
      </button>
    ),
  },
];

const AdminPage = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    getAlumnos()
      .then((data) => {
        setAlumnos(data);
      })
      .catch((error) => {
        console.error("Error obteniendo los reportes:", error);
      });
  }, []);

  useEffect(() => {
    getUsers()
      .then((data) => {
        setUsuarios(data);
      })
      .catch((error) => {
        console.error("Error obteniendo los usuarios:", error);
      });
  }, []);

  return (
    <Container>
      <Header />
      <TablaAlumnosStyled>
        <TablaAlumnos data={alumnos} columns={columnsAlumnos} />
      </TablaAlumnosStyled>
      <TablaAlumnosStyled>
        <TablaUsuarios data={usuarios} columns={columnsUsuarios} />
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
