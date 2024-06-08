import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Formulario from "./pages/Formulario";
import Tabla from "./components/Tabla";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="table" element={<Tabla />} />
      </Route>
    </Routes>
  );
}

export default App;
