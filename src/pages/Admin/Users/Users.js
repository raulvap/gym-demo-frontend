import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { getAccessTokenApi } from "../../../api/auth";
import { getUsersActiveApi } from "../../../api/user";
import { Empty, Alert } from "antd";
import useAuth from "../../../hooks/useAuth";
import ListUsers from "../../../components/Admin/Users/ListUsers";

import "./Users.scss";

export default function Users() {
  const { user } = useAuth();
  const [usersActive, setUsersActive] = useState([]);
  const [usersInactive, setUsersInactive] = useState([]);
  const [reloadUsers, setReloadUsers] = useState(false);
  const token = getAccessTokenApi();

  useEffect(() => {
    getUsersActiveApi(token, true).then((response) => {
      setUsersActive(response.users);
    });
    getUsersActiveApi(token, false).then((response) => {
      setUsersInactive(response.users);
    });
    setReloadUsers(false);
  }, [token, reloadUsers]);

  if (user.role === "admin") {
    return (
      <>
        <Helmet>
          <title>Admin | Usuarios Registrados</title>
          <meta
            name='admin-usuarios'
            content='Admin | Usuarios Admin'
            data-react-helmet='true'
          />
        </Helmet>
        <div className='users'>
          <h3>Usuarios</h3>
          <ListUsers
            usersActive={usersActive}
            usersInactive={usersInactive}
            setReloadUsers={setReloadUsers}
          />
        </div>
      </>
    );
  } else {
    return (
      <div className='no-autorizado'>
        <Alert
          message='Solo los Administradores pueden ver los usuarios activos en el Panel
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
  }
}
