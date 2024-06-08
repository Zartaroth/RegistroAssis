import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Button, Paper } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import Formulario from "./Formulario";
import { useState } from "react";

export default function Home() {
  const [table, setTable] = useState(false);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          backgroundColor: "#222",
          p: 10,
          m: 0,
        }}
      >
        <Box
          component={Paper}
          elevation={10}
          sx={{
            width: "50%",
            mxl: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 10,
          }}
        >
          <Formulario />
        </Box>
        <Button
          component={Link}
          to={table ? "/" : "table"}
          replace
          onClick={() => setTable(!table)}
          variant="contained"
          fullWidth
          sx={{ p: 2, width: "auto", my: 2 }}
        >
          <ExpandMoreIcon />
        </Button>

        <Outlet />
      </Box>
    </>
  );
}
