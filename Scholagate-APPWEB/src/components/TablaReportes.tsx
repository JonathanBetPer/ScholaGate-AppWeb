import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

import "../styles/TableReportes.css";

import React, { useEffect, useState } from "react";
import { getReportes } from "../services/authService"; // Asegúrate de reemplazar esto con la ruta correcta a authservice

function TablaReportes({ data, columns }) {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  const [reportes, setReportes] = useState([]);

  useEffect(() => {
    getReportes().then((data) => {
      setReportes(data);
    });
  }, []);

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
    <div>
      <input
        type="text"
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
      />

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
          {reportes.map((reporte) => (
            <tr key={reporte.id}>
              <td>{reporte.idAlumno}</td>
              <td>{reporte.idUsuario}</td>
              <td>{reporte.tipo}</td>
              <td>{reporte.motivo}</td>
              <td>{reporte.fecha}</td>
            </tr>
          ))}
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

      <button onClick={() => table.setPageIndex(0)}>Primer Pagina</button>
      <button onClick={() => table.previousPage()}>Pagina Anterior</button>
      <button onClick={() => table.nextPage()}>Pagina Siguiente</button>
      <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
        Ultima Pagina
      </button>
    </div>
  );
}

export default TablaReportes;
