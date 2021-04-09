import React, { useState, useEffect } from "react";

// // --- API ---
import { signUpAdminApi, updateUserApi } from "../../../../api/user";
import { getAccessTokenApi } from "../../../../api/auth";

// // --- Components ---
import { Form, Input, Select, Button, notification, Avatar } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import NoAvatar from "../../../../assets/img/png/no-avatar.png";
import { dataParroquia } from "../../../../utils/dataVariables";

import "./AddEditUserForm.scss";

export default function AddEditUserForm(props) {
  const { setIsVisibleModal, setReloadUsers, user } = props;
  const [userData, setUserData] = useState({});

  useEffect(() => {
    user ? setUserData(user) : setUserData({});
  }, [user]);

  const addUser = (event) => {
    event.preventDefault();

    if (
      !userData.name ||
      !userData.lastname ||
      !userData.role ||
      !userData.email ||
      !userData.repeatEmail
    ) {
      notification["error"]({
        message: "Todos los campos son obligatorios.",
      });
    } else if (userData.email !== userData.repeatEmail) {
      notification["error"]({
        message: "Los correos electrónicos no coinciden",
      });
    } else {
      const accesToken = getAccessTokenApi();
      userData.parroquia = dataParroquia;
      notification["warning"]({ message: "Creando usuario, espere..." });

      signUpAdminApi(accesToken, userData)
        .then((response) => {
          let notificationType = "";
          response.code === 200
            ? (notificationType = "success")
            : (notificationType = "error");
          notification[notificationType]({
            message: response.message,
          });
          setIsVisibleModal(false);
          setReloadUsers(true);
          setUserData({});
        })
        .catch((err) => {
          notification["error"]({
            message: err,
          });
        });
    }
  };

  const updateUser = (e) => {
    // e.preventDefault();

    if (
      !userData.name ||
      !userData.lastname ||
      !userData.role ||
      !userData.email
    ) {
      notification["error"]({
        message: "Todos los campos son requeridos",
      });
    } else {
      const token = getAccessTokenApi();
      updateUserApi(token, userData, userData._id).then((result) => {
        let type = "";
        result.code !== 200 ? (type = "warning") : (type = "success");
        notification[type]({
          message: result.message,
        });
        setIsVisibleModal(false);
        setReloadUsers(true);
        setUserData({});
      });
    }
  };

  return (
    <div className='edit-user-form'>
      <Avatar size={150} src={NoAvatar} />
      <EditForm
        userData={userData}
        setUserData={setUserData}
        addUser={addUser}
        updateUser={updateUser}
        user={user}
      />
    </div>
  );
}

function EditForm(props) {
  const { userData, setUserData, addUser, updateUser, user } = props;
  const { Option } = Select;

  return (
    <Form labelCol={{ span: 9 }}>
      <Form.Item label='Nombre'>
        <Input
          prefix={<UserOutlined />}
          placeholder='Nombre'
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        />
      </Form.Item>

      <Form.Item label='Apellidos'>
        <Input
          prefix={<UserOutlined />}
          placeholder='Apellidos'
          value={userData.lastname}
          onChange={(e) =>
            setUserData({ ...userData, lastname: e.target.value })
          }
        />
      </Form.Item>

      <Form.Item label='Perfil Admin'>
        <Select
          placeholder='Seleccióna un perfil'
          onChange={(e) => setUserData({ ...userData, role: e })}
          value={userData.role}>
          <Option value='admin'>Administrador</Option>
          <Option value='editor'>Editor</Option>
          <Option value='colaborador externo'>Colaborador Externo</Option>
        </Select>
      </Form.Item>

      <Form.Item label='Email'>
        <Input
          prefix={<MailOutlined />}
          placeholder='Correo electronico'
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
      </Form.Item>

      <Form.Item label='Confirmar Email'>
        <Input
          prefix={<MailOutlined />}
          placeholder='Escribe nuevamente el email'
          value={userData.repeatEmail}
          onChange={(e) =>
            setUserData({ ...userData, repeatEmail: e.target.value })
          }
        />
      </Form.Item>

      <Form.Item>
        <Button
          type='primary'
          htmlType='submit'
          onClick={user ? updateUser : addUser}>
          {user ? "Actualizar Usuario" : "Crear Usuario"}
        </Button>
      </Form.Item>
    </Form>
  );
}
