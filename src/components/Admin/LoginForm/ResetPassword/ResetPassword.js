import React, { useState, useEffect } from "react";

import { resetPasswordApi } from "../../../../api/user";
import { Form, Input, Button, notification } from "antd";
import { MailOutlined } from "@ant-design/icons";

import "./ResetPassword.scss";

export default function ResetPassword(props) {
  const { inputs, setIsVisibleModal } = props;
  const [emailUser, setEmailUser] = useState({});

  useEffect(() => {
    if (inputs) {
      setEmailUser(inputs);
    } else {
      setEmailUser({});
    }
  }, [inputs]);

  const sendEmail = () => {
    if (!emailUser) {
      notification["error"]({ message: "Debes introducir un correo" });
    } else {
      setEmailUser({ ...emailUser, email: emailUser.email.toLowerCase() });
      resetPasswordApi(emailUser);
      setIsVisibleModal(false);

      alert(
        'Si el correo existe, se ha enviado un correo electrónico para recuperar la contraseña \nPuede que el correo haya llegado a la bandeja de "No Deseados" o "Spam"'
      );
    }
  };

  return (
    <div>
      <Form className='reset-password' onFinish={sendEmail}>
        <Form.Item>
          <Input
            prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            type='email'
            name='email'
            placeholder='Correo electronico'
            className='login-form__input'
            value={emailUser.email}
            onChange={(e) =>
              setEmailUser({ ...emailUser, email: e.target.value })
            }
          />
        </Form.Item>
        <Button type='primary' htmlType='submit'>
          Recuperar Contraseña
        </Button>
      </Form>
    </div>
  );
}
