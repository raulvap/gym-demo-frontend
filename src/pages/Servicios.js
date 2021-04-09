import React from "react";
import { Helmet } from "react-helmet";
import ServiciosComponent from "../components/Web/Servicios";
import { dataParroquia } from "../utils/dataVariables";

export default function Servicios() {
  return (
    <>
      <Helmet>
        <title>Servicios | {dataParroquia}</title>
        <meta
          name='servicios'
          content='Servicios de la Parroquia'
          data-react-helmet='true'
        />
      </Helmet>
      <div>
        <ServiciosComponent />
      </div>
    </>
  );
}
