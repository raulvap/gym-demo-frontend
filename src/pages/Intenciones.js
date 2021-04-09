import React from "react";
import { Helmet } from "react-helmet";
import Intenciones from "../components/Web/Intenciones";
import Donativos from "../components/Web/Intenciones/Donativos";

export default function Donativo() {
  return (
    <>
      <Helmet>
        <title>Intenciones | Donativos</title>
        <meta
          name='blog'
          content='Intenciones | Donativos'
          data-react-helmet='true'
        />
      </Helmet>
      <div>
        <Intenciones />
        <Donativos />
      </div>
    </>
  );
}
