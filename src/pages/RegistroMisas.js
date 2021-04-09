import React from "react";
import { Helmet } from "react-helmet";
import RegistroMisas from "../components/Web/RegistroMisa";

import { dataParroquia } from "../utils/dataVariables";

export default function RegistroMisasPage() {
  return (
    <>
      <Helmet>
        <title>Registro para Misas | {dataParroquia}</title>
        <meta
          name='registro-exitoso'
          content='Registro para asistir a Misa'
          data-react-helmet='true'
        />
      </Helmet>
      <div>
        <RegistroMisas />
      </div>
    </>
  );
}
