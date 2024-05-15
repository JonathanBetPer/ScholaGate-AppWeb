import Header from "../components/Header";
import styled from "styled-components";
import UserCard from "../components/UserCard";
import TablaReportes from "../components/TablaReportes";
import TablaUsuarios from "../components/TablaUsuarios";
import dayjs from "dayjs";
import { getReportes } from "../services/authService";
import { getUsers } from "../services/authService";
import React, { useState, useEffect } from "react";
import { getUsuarioActual } from "../services/authService";

const TablaReportesStyled = styled.div`
  padding-bottom: 20px;
`;

const TablaUsuariosStyled = styled.div`
  padding-top: 20px;
`;

const columnsAlumnos = [
  {
    header: "Alumno",
    accessorKey: "id",
  },

  {
    header: "Profesor",
    accessorKey: "name",
  },
  {
    header: "Tipo",
    accessorKey: "lastname",
  },
  {
    header: "Motivo",
    accessorKey: "email",
  },
  {
    header: "Fecha",
    accessorKey: "country",
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

const HomePage = () => {
  const [reportes, setReportes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    getUsuarioActual()
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error obteniendo el usuario actual:", error);
      });

    getReportes()
      .then((data) => {
        setReportes(data);
      })
      .catch((error) => {
        console.error("Error obteniendo los reportes:", error);
      });

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
      <UserCard />
      <TablaReportesStyled>
        <TablaReportes data={reportes} columns={columnsAlumnos} />
      </TablaReportesStyled>
      <TablaUsuariosStyled>
        <TablaUsuarios data={usuarios} columns={columnsUsuarios} />
      </TablaUsuariosStyled>
    </Container>
  );
};

export default HomePage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
