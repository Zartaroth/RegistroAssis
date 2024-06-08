import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";

export const columns = [
  { field: "CodigoCIP", headerName: "Código CIP", width: 90 },
  { field: "TipoDoc", headerName: "Tipo de Documento", width: 180 },
  { field: "DocIdentidad", headerName: "Documento de Identidad", width: 90 },
  { field: "Nombres", headerName: "Nombres", width: 300 },
  { field: "Capitulo", headerName: "Capítulo", width: 120 },
  { field: "Asociacion", headerName: "Asociación", width: 100 },
  { field: "Inscrito", headerName: "Inscrito", width: 70 },
  { field: "Sede", headerName: "Sede", width: 70 },
  { field: "Ticket", headerName: "Ticket", width: 90 },
  { field: "Asistio", headerName: "¿Asistió?", width: 100 },
  { field: "HoraAsistencia", headerName: "Hora de Asistencia", width: 100 },
  { field: "FechaAsistencia", headerName: "Fecha de Asistencia", width: 150 },
];
