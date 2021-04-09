import React from "react";
import { Helmet } from "react-helmet";

import InfoParroquiaComponent from "../../components/Admin/InfoParroquia";
import useAuth from "../../hooks/useAuth";
import { Empty, Alert } from "antd";

export default function InfoParroquia() {
  const { user } = useAuth();

  if (user.role === "colaborador externo") {
    return (
      <div className='no-autorizado'>
        <Alert
          message='Solo los Administradores y Editores pueden modificar la información de la Parroquia en el Panel
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
          <title>Admin | Info Parroquia</title>
          <meta
            name='admin-info-parroquia'
            content='Admin | Info Parroquia'
            data-react-helmet='true'
          />
        </Helmet>
        <div>
          <InfoParroquiaComponent />
        </div>
      </>
    );
  }
}
