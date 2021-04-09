import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet";

// --- API ---

import { getAvisoApi } from "../../api/aviso";

// --- Componente ---
// import HorariosComponent from "../../components/Admin/Horarios";
import AvisosComponent from "../../components/Admin/Avisos";
import { Empty, Alert, notification } from "antd";

export default function Aviso() {
  const { user } = useAuth();
  const [aviso, setAviso] = useState([]);
  //   const [countHorarios, setCountHorarios] = useState(0);
  const [reloadAviso, setReloadAviso] = useState(false);

  useEffect(() => {
    getAvisoApi().then((response) => {
      if (response.code !== 200) {
        notification["warning"]({ message: response.message });
      } else {
        setAviso(response.aviso);
      }
    });
    setReloadAviso(false);
  }, [reloadAviso]);

  if (user.role === "colaborador externo") {
    return (
      <div className='no-autorizado'>
        <Alert
          message='Solo los Administradores y Editores pueden modificar los avisos en el Panel
          de Administración'
          type='error'
          showIcon
        />
        <p>
          Tu perfil está configurado cómo:{"  "}
          <strong>{user.role.toUpperCase()}</strong>
        </p>

        <Empty />
      </div>
    );
  } else {
    return (
      <>
        <Helmet>
          <title>Admin | Avisos</title>
          <meta
            name='admin-avisos'
            content='Admin | Avisos'
            data-react-helmet='true'
          />
        </Helmet>
        <div>
          {!aviso ? (
            <Empty />
          ) : (
            <AvisosComponent
              aviso={aviso}
              setReloadAviso={setReloadAviso}
              // countAvisos={countAvisos}
            />
          )}
        </div>
      </>
    );
  }
}
