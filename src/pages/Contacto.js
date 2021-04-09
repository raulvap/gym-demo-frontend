import React from "react";
import { Helmet } from "react-helmet";
import Contacto from "../components/Web/Contacto";
import { dataParroquia } from "../utils/dataVariables";

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Información | {dataParroquia}</title>
        <meta
          name='información'
          content='Información de Horarios y de Contacto'
          data-react-helmet='true'
        />
      </Helmet>
      <div>
        <Contacto />
      </div>
    </>
  );
}
