import React from "react";
import { Helmet } from "react-helmet";
import { dataParroquia } from "../utils/dataVariables";
import CalendarioComp from "../components/Web/Calendario";

export default function Calendario() {
  return (
    <>
      <Helmet>
        <title>Próximos Eventos | {dataParroquia}</title>
        <meta
          name='calendario'
          content='Próximos Eventos de la Parroquia'
          data-react-helmet='true'
        />
      </Helmet>
      <CalendarioComp />
    </>
  );
}
