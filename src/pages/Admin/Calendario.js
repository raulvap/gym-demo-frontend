import React, { useState, useEffect } from "react";

import { Helmet } from "react-helmet";

// --- API ---
import { getCalendarioApi } from "../../api/calendario";

// --- Component ---
import CalendarioComponent from "../../components/Admin/Calendario";

export default function Calendario() {
  const [calendario, setCalendarios] = useState([]);
  const [reloadCalendario, setReloadCalendario] = useState(false);

  useEffect(() => {
    getCalendarioApi().then((response) => {
      setCalendarios(response.calendario);
      setReloadCalendario(false);
    });
  }, [reloadCalendario]);

  return (
    <>
      <Helmet>
        <title>Admin | Calendario de Eventos</title>
        <meta
          name='admin-calendario-eventos'
          content='Admin | Calendario de Eventos'
          data-react-helmet='true'
        />
      </Helmet>
      <div>
        <CalendarioComponent
          calendario={calendario}
          setReloadCalendario={setReloadCalendario}
        />
      </div>
    </>
  );
}
