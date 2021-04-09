import React, { useState, useEffect } from "react";

import { Helmet } from "react-helmet";

// --- API ---
import { getComunidadesApi } from "../../api/comunidad";

// --- Component ---
import ComunidadesComponent from "../../components/Admin/Comunidades";

export default function Comunidades() {
  const [comunidades, setComunidades] = useState([]);
  const [reloadComunidades, setReloadComunidades] = useState(false);

  useEffect(() => {
    getComunidadesApi().then((response) => {
      setComunidades(response.comunidad);
      setReloadComunidades(false);
    });
  }, [reloadComunidades]);

  return (
    <>
      <Helmet>
        <title>Admin | Comunidades Parroquiales</title>
        <meta
          name='admin-comunidades'
          content='Admin | Comunidades'
          data-react-helmet='true'
        />
      </Helmet>
      <div>
        <ComunidadesComponent
          comunidades={comunidades}
          setReloadComunidades={setReloadComunidades}
        />
      </div>
    </>
  );
}
