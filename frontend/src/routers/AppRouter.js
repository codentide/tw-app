import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../components/gui/Header";
import Genero from "../components/generos/Genero";
import Productora from "../components/productoras/Productora";
import Spinner from "../components/gui/Spinner";
import NotFound from "../components/gui/NotFound";

export default function AppRouter() {
  return (
    <>
      {" "}
      <Header></Header>
      <Routes>
        <Route path="/generos" element={<Genero />} />
        <Route path="/productoras" element={<Productora />} />
        <Route path="/home" element={<Spinner />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
