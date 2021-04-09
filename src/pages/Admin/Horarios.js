import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet";

// --- API ---
import { getHorarioApi } from "../../api/horarios";

// --- Componente ---
import HorariosComponent from "../../components/Admin/Horarios";
import { Empty, Alert } from "antd";

export default function Horarios() {
  const { user } = useAuth();
  const [horario, setHorario] = useState([]);
  const [countHorarios, setCountHorarios] = useState(0);
  const [reloadHorario, setReloadHorario] = useState(false);

  useEffect(() => {
    getHorarioApi().then((response) => {
      setHorario(response.horario);
      setCountHorarios(0);
      response.horario.forEach((item) => {
        if (item.active) {
          setCountHorarios((countHorarios) => countHorarios + 1);
        }
      });
    });
    setReloadHorario(false);
  }, [reloadHorario]);

  if (user.role === "colaborador externo") {
    return (
      <div className='no-autorizado'>
        <Alert
          message='Solo los Administradores y Editores pueden modificar los horarios en el Panel
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
          <title>Admin | Horarios</title>
          <meta
            name='admin-horarios'
            content='Admin | Horarios'
            data-react-helmet='true'
          />
        </Helmet>
        <div>
          <HorariosComponent
            horario={horario}
            setReloadHorario={setReloadHorario}
            countHorarios={countHorarios}
          />
        </div>
      </>
    );
  }
}
