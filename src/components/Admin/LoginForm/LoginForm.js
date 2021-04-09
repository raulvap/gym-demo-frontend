import React, { useState } from "react";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../utils/constants";

// --- API ---
import { signInApi } from "../../../api/user";

// --- COMPONENTS ---
import ResetPassword from "./ResetPassword";
import { Form, Input, Button, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import "./LoginForm.scss";

export default function LoginForm(props) {
  const { setIsVisibleModal, setModalContent } = props;
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const changeForm = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const login = async (e) => {
    e.preventDefault();
    const result = await signInApi(inputs);

    if (result.message) {
      notification["error"]({
        message: result.message,
      });
    } else {
      notification["success"]({
        message: "Bienvenido...",
      });
      const { accessToken, refreshToken } = result;
      localStorage.setItem(ACCESS_TOKEN, accessToken);
      localStorage.setItem(REFRESH_TOKEN, refreshToken);

      window.location.href = "/admin";
    }
  };

  const resetPassword = () => {
    setIsVisibleModal(true);
    setModalContent(
      <ResetPassword inputs={inputs} setIsVisibleModal={setIsVisibleModal} />
    );
  };

  return (
    <Form className='login-form' onChange={changeForm} onSubmit={login}>
      <Form.Item>
        <Input
          prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          type='email'
          name='email'
          placeholder='Correo electronico'
          className='login-form__input'
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          type='password'
          name='password'
          placeholder='Contraseña'
          className='login-form__input'
        />
      </Form.Item>

      <Form.Item>
        <Button
          htmlType='submit'
          className='login-form__button'
          onClick={login}>
          Entrar
        </Button>
      </Form.Item>
      <button className='login-form__reset' onClick={resetPassword}>
        Olvidé mi Contraseña
      </button>
    </Form>
  );
}
