import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import "../styles/TableReportes.css";
import fotoperfilAlumno from "../images/fotoperfilAlumno.png";
import editarFoto from "../images/editar.png";
import { getAlumnoById, getGrupos } from "../services/authService";
import React, { useEffect, useState } from "react";
import { getAlumnos } from "../services/authService"; // Asegúrate de reemplazar esto con la ruta correcta a authservice
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import styled from "styled-components";
import { deleteAlumnoById } from "../services/authService";

function TablaAlumnos({ data, columns }) {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = React.useState(false);
  const [alumnos, setAlumnos] = useState([]);
  const [selectedAlumno, setSelectedAlumno] = useState(null);
  const [alumno, setAlumno] = useState(null);
  const [grupos, setGrupos] = useState([]);

  const Button = styled.button`
  background-color: #539BF5;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: transform 0.3s ease;

  &:active {
    transform: scale(0.9);
  }
`;


let nombreDelGrupo;
if (alumno) {
  nombreDelGrupo = grupos[alumno.idGrupo];
}







  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  

  useEffect(() => {
    getAlumnos().then((data) => {
      setAlumnos(data);
    });
  }, []);

  useEffect(() => {
    getGrupos().then((data) => {
      setGrupos(data);
    });
  }, []);


  useEffect(() => {
    if (selectedAlumno !== null) {
      getAlumnoById(selectedAlumno).then((data) => {
        setAlumno(data);
      });
    }
  }, [selectedAlumno]);

  const handleRowClick = (alumno) => {
    if (alumno === undefined) {
      console.log('Alumno es undefined');
      return;
    }
  
    setSelectedAlumno(alumno);
    handleClickOpen();
  };

  

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <div style={{ margin: "40px" }}>
      <div
        style={{
          textAlign: "center",
          marginBottom: "20px",
          fontWeight: "bold",
          fontSize: "24px",
        }}
      >
        <h1>Lista de alumnos</h1>
      </div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : (
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}

                      {
                        { asc: "⬆️", desc: "⬇️" }[
                          header.column.getIsSorted() ?? null
                        ]
                      }
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
        {alumnos.map((alumno) => (
  <tr key={alumno.id}>
    <td style={{ textAlign: 'center' }}>{alumno.id}</td>
    <td style={{ textAlign: 'center' }}>{alumno.idGrupo}</td>
    <td style={{ textAlign: 'center' }}>{alumno.nombre}</td>
    <td style={{ textAlign: 'center' }}>{alumno.fechaNac}</td>
    <td style={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
      <img src={fotoperfilAlumno} alt="Foto de perfil del alumno" />
    </td>
    <td style={{ textAlign: 'center' }}>
      <Button variant="outlined" color="primary"   onClick={() => {
    handleRowClick(alumno.id);
  }}
>
        <img src={editarFoto} alt="Foto de perfil del alumno" />
      </Button>
    </td>
  </tr>
))}
<Dialog
  fullScreen={fullScreen}
  open={open}
  onClose={handleClose}
  aria-labelledby="responsive-dialog-title"
>
<DialogTitle id="responsive-dialog-title" style={{ textAlign: 'center' }}>{"Gestionar alumno"}</DialogTitle>
<DialogContent>
  
    <>
        {
            alumno ? (
                <div style={{ color: "#768390" }}>
                          {console.log(alumno)}
                          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
  <img src={fotoperfilAlumno} alt={alumno.nombre} />
</div>
<p className='text-black font-extrabold text-xl mb-3 inline-flex'
    style={{
        color: alumno.nombre ? "#539BF5" : "#FFF",
        display: "flex",
        justifyContent: "center",
        fontWeight: "bold",
        fontSize: 25,
        alignItems: "center",
        margin: "0 auto 20px auto",
        textDecoration: "none"
    }}>
    {alumno.nombre}
</p>
<p className='text-black font-extrabold text-xl mb-3 inline-flex'
    style={{
        color: "#768390" || "#539BF5", display: "flex",
        justifyContent: "center",
        fontWeight: "bold",
        marginTop: '20px'
    }}>
    Fecha de nacimiento: {alumno.fechaNac}
</p>

<div>
{nombreDelGrupo ? (
      <p style={{ textAlign: 'center' }}>
        El alumno {alumno.nombre} pertenece al grupo: {nombreDelGrupo}
      </p>
    ) : (
      <p style={{ textAlign: 'center' }}>
        El nombre del grupo para el alumno {alumno.nombre} es undefined.
      </p>
    )}
</div>

<div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
<Button onClick={() => {
  deleteAlumnoById(alumno.id);
  setAlumnos(alumnos.filter(alumnoActual => alumnoActual.id !== alumno.id));
  handleClose();
}}>
  Eliminar alumno
</Button>

  <Button>
    Editar alumno
  </Button>
</div>



</div>
) : (
    <p>Alumno no encontrado</p>
)
}
</>

</DialogContent>
  <DialogActions>
    <Button autoFocus onClick={handleClose} color="primary">
      Cerrar
    </Button>
  </DialogActions>
</Dialog>
</tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((footer) => (
                <th key={footer.id}>
                  {flexRender(
                    footer.column.columnDef.footer,
                    footer.getContext(),
                  )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
}



export default TablaAlumnos;
