import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { columns } from "../data/gridData";
import { Box, Button, Paper } from "@mui/material";

import { getUsersRequest } from "../api/api";
import { useEffect } from "react";
import { useState } from "react";

import * as XLSX from "xlsx";

export default function Tabla() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    geItems();
  }, []);

  async function geItems() {
    try {
      const response = await getUsersRequest();

      if (response.ok) {
        console.log("Tabla Recuperada");

        const json = await response.json();
        const rowsWithIds = json.rows.map((row, index) => ({
          id: index,
          ...row,
        }));
        setRows(rowsWithIds);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDownload(e) {
    e.preventDefault();

    try {
      const response = await getUsersRequest();

      if (response.ok) {
        console.log("Tabla Recuperada par Descargar");

        const json = await response.json();

        // Convertir datos a formato de hoja de cálculo
        const ws = XLSX.utils.json_to_sheet(json.rows);

        // Crear un libro de trabajo
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

        // Guardar el libro de trabajo como archivo Excel
        XLSX.writeFile(wb, "data.xlsx");
      }
    } catch (error) {}
  }

  return (
    <>
      <Box
        component={Paper}
        elevation={10}
        sx={{
          width: "100%",
          mxl: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 10,
        }}
      >
        <DataGrid
          checkboxSelection
          rows={rows}
          columns={columns}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 3 === 0 ? "even" : "odd"
          }
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[10, 25, 50]}
          disableColumnResize
          style={{ backgroundColor: "white", color: "black", width: "100%" }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, width: "50%", mx: "auto" }}
          onClick={handleDownload}
        >
          Descargar
        </Button>
      </Box>
    </>
  );
}
