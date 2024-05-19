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
import React, { useEffect, useState, useRef } from "react";
import { getAlumnos } from "../services/authService"; // Asegúrate de reemplazar esto con la ruta correcta a authservice
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import styled from "styled-components";
import { deleteAlumnoById } from "../services/authService";
import { TextField, Select, MenuItem } from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import { Box } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Grid } from "@material-ui/core";
import { updateAlumnoById } from "../services/authService";
import { createAlumno } from "../services/authService";
import Papa from "papaparse";
import { createVariosAlumnos } from "../services/authService";
const Button2 = styled.button`
  background-color: #539bf5;
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

function TablaAlumnos({ data, columns }) {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = React.useState(false);
  const [alumnos, setAlumnos] = useState([]);
  const [selectedAlumno, setSelectedAlumno] = useState(null);
  const [alumno, setAlumno] = useState(null);
  const [grupos, setGrupos] = useState("SEC 1º ESO A (Mañana)"); // Reemplaza esto con el valor que quieras
  const [gruposTotales, setGruposTotales] = useState([]);
  const [grupoIdMap, setGrupoIdMap] = useState({});
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [editingAlumno, setEditingAlumno] = useState(null);
  const [fechaSeleccionada, cambiarFecha] = useState<Date | null>(new Date());
  const [nombre, setNombre] = useState("");
  const [grupo, setGrupo] = useState("");
  const [fechaNueva, setFecha] = useState(null);
  const fileInput = useRef(null);
  const [localNombre, setLocalNombre] = useState(nombre);
  const [lastImport, setLastImport] = useState(Date.now());


  useEffect(() => {
    setLocalNombre(nombre);
  }, [nombre]);

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
  }, [lastImport]);

  useEffect(() => {
    getGrupos().then((data) => {
      setGrupos(data);
    });
  }, []);

  useEffect(() => {
    const fetchGrupos = async () => {
      const gruposData = await getGrupos();
      setGruposTotales(Object.values(gruposData));
    };

    fetchGrupos();
  }, []);

  useEffect(() => {
    const newGrupoIdMap = {};
    gruposTotales.forEach((grupo) => {
      newGrupoIdMap[grupo.nombre] = grupo.idGrupo;
    });
    setGrupoIdMap(newGrupoIdMap);
  }, [gruposTotales]);

  useEffect(() => {
    if (selectedAlumno !== null) {
      getAlumnoById(selectedAlumno).then((data) => {
        setAlumno(data);
      });
    }
  }, [selectedAlumno]);

  const handleRowClick = (alumno) => {
    if (alumno === undefined) {
      return;
    }

    setSelectedAlumno(alumno);
    handleClickOpen();
  };

  useEffect(() => {
    if (editingAlumno) {
      setNombre(editingAlumno.nombre);
      setGrupo(editingAlumno.idGrupo);
      setFecha(editingAlumno.fecha);
      setOpenEditDialog(true); // Abre el diálogo de edición aquí
    }
  }, [editingAlumno]);

  const handleOpenEditDialog = (alumno) => {
    setEditingAlumno(alumno); // Asume que setEditingAlumno es la función para establecer el alumno que se está editando
    setOpenEditDialog(true); // Abre el diálogo de edición
  };

  const handleOpenCreateDialog = () => {
    setEditingAlumno(alumno); // Asume que setEditingAlumno es la función para establecer el alumno que se está editando
    setOpenCreateDialog(true); // Abre el diálogo de edición
  };

  const handleCloseCreateDialog = () => {
    setEditingAlumno(null); // Limpia el alumno que se está editando
    setOpenCreateDialog(false); // Cierra el diálogo de edición
  };

  const handleCloseEditDialog = () => {
    setEditingAlumno(null); // Limpia el alumno que se está editando
    setOpenEditDialog(false); // Cierra el diálogo de edición
  };
  const handleImport = () => {
    if (!fileInput.current) {
      console.error('fileInput.current es null o undefined');
      return;
    }
  
    const file = fileInput.current.files[0];
  
    if (!file) {
      console.error('No se seleccionó ningún archivo');
      return;
    }
  
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: function (results) {
        if (!results.data || results.data.length === 0) {
          console.error('No se encontraron datos en el archivo');
          return;
        }
    
        console.log("Resultados de la importación:", results.data);
        // Convertir los resultados a JSON
        const json = JSON.stringify(results.data, null, 2);
        console.log(json);
    
        // Llamar a createVariosAlumnos con el JSON
        createVariosAlumnos(json)
          .then(() => {
            // Recargar los datos de los alumnos después de que la importación se complete con éxito
            getAlumnos();
            setLastImport(Date.now());

          })
          .catch((error) => {
            // Manejar cualquier error que ocurra durante la importación
            console.error('Error durante la importación:', error);
          });
      },
    });
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
      <div style={{ marginBottom: '20px' }}>
        {/* ... */}
        <input type="file" ref={fileInput} style={{ display: 'none' }} />
        <Button2
        onClick={handleOpenCreateDialog} // Asume que handleOpenCreateDialog es la función que abre el diálogo de creación
        color="primary"
        style={{ margin: "0 8px" }}
      >
        Crear Alumno
      </Button2>
        <Button2
  onClick={() => fileInput.current.click()}
  color="primary"
  style={{ margin: "0 8px" }}
>
  Seleccionar archivo
</Button2>
<Button2
  onClick={handleImport}
  color="primary"
  style={{ margin: "0 8px" }}
>
  Importar
</Button2>

      </div>



      {openCreateDialog && (
        <Dialog open={openCreateDialog} onClose={handleCloseCreateDialog}>
          <DialogTitle style={{ textAlign: "center" }}>
            Crear alumno
          </DialogTitle>
          <DialogContent>
            <Grid container direction="column" spacing={3}>
              <Grid item>
                <TextField
                  label="Nombre"
                  value={nombre} // Usa 'value' en lugar de 'defaultValue'
                  onChange={(e) => setNombre(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DatePicker
                    format="dd/MM/yyyy"
                    value={fechaSeleccionada}
                    onChange={cambiarFecha}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item>
                <Select
                  label="Grupo"
                  value={grupo} // Usa el estado grupo como el valor del Select
                  onChange={(e) => setGrupo(e.target.value)}
                  fullWidth
                >
                  {gruposTotales.map((nombreGrupo) => (
                    <MenuItem value={nombreGrupo}>{nombreGrupo}</MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button2 onClick={handleCloseCreateDialog} color="primary">
              Cancelar
            </Button2>
            <Button2
              onClick={async () => {
                const grupos = await getGrupos(); // Obtiene el hashmap de grupos
                const idGrupoSeleccionado = Object.keys(grupos).find(
                  (key) => grupos[key] === grupo,
                );

                if (idGrupoSeleccionado) {
                  const result = await createAlumno(
                    nombre,
                    fechaSeleccionada,
                    idGrupoSeleccionado, // Pasa el idGrupo en lugar del nombre del grupo
                    "",
                  );

                  // Actualiza el alumno en la lista

                  if (result) {
                    // Recarga los datos de los alumnos después de crear un nuevo alumno
                    getAlumnos().then((data) => {
                      setAlumnos(data);
                    });
                  }
                } else {
                  console.log(`No se encontró un grupo con el nombre ${grupo}`);
                }
                handleCloseCreateDialog();
              }}
              color="primary"
              style={{ margin: "0 8px" }}
            >
              Guardar
            </Button2>{" "}
          </DialogActions>
        </Dialog>
      )}

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
              <td style={{ textAlign: "center" }}>{alumno.id}</td>
              <td style={{ textAlign: "center" }}>{alumno.idGrupo}</td>
              <td style={{ textAlign: "center" }}>{alumno.nombre}</td>
              <td style={{ textAlign: "center" }}>{alumno.fechaNac}</td>
              <td
                style={{
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img src={fotoperfilAlumno} alt="Foto de perfil del alumno" />
              </td>
              <td style={{ textAlign: "center" }}>
                <Button2
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    handleRowClick(alumno.id);
                  }}
                >
                  <img src={editarFoto} alt="Foto de perfil del alumno" />
                </Button2>
              </td>
            </tr>
          ))}
          <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle
              id="responsive-dialog-title"
              style={{ textAlign: "center" }}
            >
              {"Gestionar alumno"}
            </DialogTitle>
            <DialogContent>
              <>
                {alumno ? (
                  <div style={{ color: "#768390" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "20px",
                      }}
                    >
                      <img src={fotoperfilAlumno} alt={alumno.nombre} />
                    </div>
                    <p
                      className="mb-3 inline-flex text-xl font-extrabold text-black"
                      style={{
                        color: alumno.nombre ? "#539BF5" : "#FFF",
                        display: "flex",
                        justifyContent: "center",
                        fontWeight: "bold",
                        fontSize: 25,
                        alignItems: "center",
                        margin: "0 auto 20px auto",
                        textDecoration: "none",
                      }}
                    >
                      {alumno.nombre}
                    </p>
                    <p
                      className="mb-3 inline-flex text-xl font-extrabold text-black"
                      style={{
                        color: "#768390" || "#539BF5",
                        display: "flex",
                        justifyContent: "center",
                        fontWeight: "bold",
                        marginTop: "20px",
                      }}
                    >
                      Fecha de nacimiento: {alumno.fechaNac}
                    </p>

                    <div>
                      {nombreDelGrupo ? (
                        <p style={{ textAlign: "center" }}>
                          El alumno {alumno.nombre} pertenece al grupo:{" "}
                          {nombreDelGrupo}
                        </p>
                      ) : (
                        <p style={{ textAlign: "center" }}>
                          Cargando nombre del grupo...
                        </p>
                      )}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        marginTop: "20px",
                      }}
                    >
                      <Button2
                        onClick={() => {
                          deleteAlumnoById(alumno.id);
                          setAlumnos(
                            alumnos.filter(
                              (alumnoActual) => alumnoActual.id !== alumno.id,
                            ),
                          );
                          handleClose();
                        }}
                      >
                        Eliminar alumno
                      </Button2>

                      <Button2 onClick={() => handleOpenEditDialog(alumno)}>
                        Editar alumno
                      </Button2>

                      {editingAlumno && (
                        <Dialog
                          open={openEditDialog}
                          onClose={handleCloseEditDialog}
                        >
                          <DialogTitle style={{ textAlign: "center" }}>
                            Editar alumno
                          </DialogTitle>
                          <DialogContent>
                            <Grid container direction="column" spacing={3}>
                              <Grid item>
                                <TextField
                                  label="Nombre"
                                  value={nombre} // Usa 'value' en lugar de 'defaultValue'
                                  onChange={(e) => setNombre(e.target.value)}
                                  fullWidth
                                />
                              </Grid>
                              <Grid item>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                  <DatePicker
                                    format="dd/MM/yyyy"
                                    value={fechaSeleccionada}
                                    onChange={cambiarFecha}
                                    renderInput={(props) => (
                                      <TextField {...props} />
                                    )}
                                  />
                                </MuiPickersUtilsProvider>
                              </Grid>
                              <Grid item>
                                <Select
                                  label="Grupo"
                                  value={grupo} // Usa el estado grupo como el valor del Select
                                  onChange={(e) => setGrupo(e.target.value)}
                                  fullWidth
                                >
                                  {gruposTotales.map((nombreGrupo) => (
                                    <MenuItem value={nombreGrupo}>
                                      {nombreGrupo}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </Grid>
                            </Grid>
                          </DialogContent>
                          <DialogActions style={{ justifyContent: "center" }}>
                            <Button2
                              onClick={async () => {
                                const grupos = await getGrupos(); // Obtiene el hashmap de grupos
                                const idGrupoSeleccionado = Object.keys(
                                  grupos,
                                ).find((key) => grupos[key] === grupo);

                                if (idGrupoSeleccionado) {
                                  const result = await updateAlumnoById(
                                    editingAlumno.id,
                                    nombre,
                                    fechaSeleccionada,
                                    idGrupoSeleccionado, // Pasa el idGrupo en lugar del nombre del grupo
                                    "",
                                  );
                                  if (result) {
                                    // Actualiza el alumno en la lista
                                    setAlumnos(
                                      alumnos.map((alumnoActual) =>
                                        alumnoActual.id === alumno.id
                                          ? result
                                          : alumnoActual,
                                      ),
                                    );
                                  }
                                } else {
                                  console.log(
                                    `No se encontró un grupo con el nombre ${grupo}`,
                                  );
                                }

                                handleCloseEditDialog();
                                handleClose();
                              }}
                              color="primary"
                              style={{ margin: "0 8px" }}
                            >
                              Guardar
                            </Button2>
                            <Button2
                              onClick={handleCloseEditDialog} // Asume que setOpenDialog2 es la función para cambiar el estado openDialog2
                              color="primary"
                              style={{ margin: "0 8px" }}
                            >
                              Cerrar
                            </Button2>
                          </DialogActions>
                        </Dialog>
                      )}
                    </div>
                  </div>
                ) : (
                  <p>Alumno no encontrado</p>
                )}
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
