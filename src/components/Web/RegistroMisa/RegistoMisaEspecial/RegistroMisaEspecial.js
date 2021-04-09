import React, { useState } from "react";
import moment from "moment";
import "moment/locale/es";

// --- API ---
import { addRegistroApi } from "../../../../api/registroMisa";

// --- COMPONENTS ---
import { Form, Input, Select, Button, notification } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import { FaWhatsapp } from "react-icons/fa";

import "./RegistroMisaEspecial.scss";

const { Option } = Select;

export default function RegistroMisaEspecial(props) {
  const { misa } = props;
  const [registroData, setRegistroData] = useState({});

  const addRegistroEsp = (e) => {
    registroData.hour = misa.hour;
    registroData.day = moment(misa.date);
    if (!registroData.name || !registroData.email || !registroData.seats) {
      notification["error"]({
        message: "Para reservar, se requiren todos los campos",
      });
    } else {
      notification["success"]({
        message: "Confirmando registro, espere por favor...",
      });
      registroData.eventDate = registroData.day;
      registroData.month = 1 + moment(registroData.day).month();
      registroData.year = moment(registroData.day).year();
      registroData.day = moment(registroData.day).date();
      registroData.categoria = "Especial";
      registroData.eventName = misa.name;
      registroData.maxSeats = misa.maxSeats;

      addRegistroApi(registroData)
        .then((response) => {
          const typeNotification = response.code === 200 ? "success" : "error";
          localStorage.setItem("registro", JSON.stringify(response.registro));

          if (typeNotification === "success") {
            notification[typeNotification]({
              message: response.message,
            });
            // setIsVisibleModal(false);
            window.location.href = "/reservacion-confirmada";
            setTimeout(() => {
              setRegistroData({});
            }, 1500);
          } else {
            notification[typeNotification]({
              message: response.message,
            });
            setRegistroData({});
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          }
        })
        .catch((err) => {
          notification["error"]({
            message: "Error del servidor (m:001) " + err,
          });
        });
    }
  };

  return (
    <Form
      className='registro-misa-especial'
      labelCol={{ span: 9 }}
      onFinish={addRegistroEsp}>
      <h4 style={{ textAlign: "center" }}>{misa.name}</h4>
      <p style={{ margin: "0", textAlign: "center" }}>
        {moment(misa.date).format("dddd DD/MMM/YY")}
      </p>
      <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
        {misa.hour} hrs
      </h2>
      <Form.Item label='Nombre'>
        <Input
          prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          placeholder='Nombre y Apellido'
          value={registroData.name}
          onChange={(e) =>
            setRegistroData({ ...registroData, name: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item label='Email'>
        <Input
          prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          type='email'
          name='emai'
          placeholder='Correo electrónico'
          value={registroData.email}
          onChange={(e) =>
            setRegistroData({ ...registroData, email: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item label='Teléfono'>
        <Input
          prefix={<FaWhatsapp style={{ color: "rgba(0,0,0,.25)" }} />}
          placeholder='Celular, Whatsapp...'
          value={registroData.phone}
          onChange={(e) =>
            setRegistroData({ ...registroData, phone: e.target.value })
          }
        />
      </Form.Item>

      <Form.Item label='Cantidad de Lugares'>
        <Select
          defaultValue='Seleccionar'
          placeholder='Cantidad de Lugares'
          // style={{ width: 120 }}
          value={registroData.seats}
          onChange={(e) => setRegistroData({ ...registroData, seats: e })}>
          <Option value={1}>1</Option>
          <Option value={2}>2</Option>
          <Option value={3}>3</Option>
          <Option value={4}>4</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Enviar Registro
        </Button>
      </Form.Item>
    </Form>
  );
}
