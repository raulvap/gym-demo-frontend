import React, { useState } from "react";
import { Helmet } from "react-helmet";

// --- API ---
import { setPasswordApi } from "../api/user";

// --- COMPONENTS ---
import { Form, Input, Button, notification } from "antd";
import { LockOutlined } from "@ant-design/icons";

import "./_ResetPassword.scss";

export default function ResetPassword(props) {
  const { location } = props;
  const [inputs, setInputs] = useState({});
  const token = location.pathname.replace("/authentication/29sagco071219", "");

  inputs.resetLink = token;

  const login = async (e) => {
    // e.preventDefault();

    if (!inputs.password || !inputs.repeatPassword) {
      notification["warning"]({
        message: "Para cambiar la contraseña se necesitan todos los campos",
      });
    } else {
      if (inputs.password.length < 8) {
        notification["error"]({
          message: "La contraseña debe tener mínimo 8 caracteres",
        });
      } else {
        if (inputs.password !== inputs.repeatPassword) {
          notification["error"]({
            message: "Las contraseñas no coinciden",
          });
        } else {
          notification["success"]({
            message: "Actualizando contraseña, espere...",
          });
          setPasswordApi(inputs)
            .then((response) => {
              if (response.code !== 200) {
                let type = "warning";

                notification[type]({
                  message: response.message,
                });
              } else {
                alert(response.message);
                window.location.href = "/admin";
              }
            })
            .catch((err) => {
              notification["error"]({
                message: "Error en el servidor (c:001)",
              });
              console.log(err);
            });
        }
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Restablecer Contraseña | Admin</title>
        <meta
          name='reset-password'
          content='Admin | Restablecer Contraseña'
          data-react-helmet='true'
        />
      </Helmet>

      <div className='reset-password-web'>
        <h2>Restablecer Contraseña</h2>

        <Form onFinish={login}>
          <p>Requisitos de la Contraseña</p>
          <ul>
            <li>Mínimo 8 caractéres</li>
            <li>1 Mayúscula</li>
            <li>1 número</li>
            <li>1 caracter especial: (p.ej:!"#$&.@)</li>
          </ul>
          <Form.Item>
            <Input
              prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              type='password'
              name='password'
              placeholder='Contraseña'
              className='login-form__input'
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item>
            <Input
              prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              type='password'
              name='repeatPassword'
              placeholder='Repetir Contraseña'
              className='login-form__input'
              value={inputs.repeatPassword}
              onChange={(e) =>
                setInputs({ ...inputs, repeatPassword: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item>
            <Button htmlType='submit' className='login-form__button'>
              Entrar
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
