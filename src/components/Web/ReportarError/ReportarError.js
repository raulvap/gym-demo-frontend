import React, { useState, useEffect } from "react";

// --- API ---
import { reportErrorApi } from "../../../api/reportarError";

// --- COMPONENTS ---
import { Form, Input, Button, notification } from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  MessageOutlined,
} from "@ant-design/icons";

import "./ReportarError.scss";

export default function ReportarError(props) {
  const { userData } = props;
  const [messageData, setMessageData] = useState({});

  useEffect(() => {
    userData ? setMessageData(userData) : setMessageData({});
  }, [userData]);

  const sendMessage = (event) => {
    if (!messageData.nombre || !messageData.correo) {
      notification["error"]({
        message: "No olvides poner tu nombre, correo, asunto y mensaje",
      });
    } else if (!messageData.asunto || !messageData.mensaje) {
      notification["error"]({
        message: "No olvides poner un asunto y tu mensaje",
      });
    } else {
      notification["success"]({
        message: "Enviando mensaje, espere...",
      });
      messageData.domain = window.location.href;
      reportErrorApi(messageData)
        .then((response) => {
          if (response.code !== 200) {
            notification["error"]({ message: response.message });
          } else {
            setMessageData({});
            alert(response.message);
          }
        })
        .catch((err) => {
          notification["error"]({ message: "Error del servidor (m:001)" });
          console.log(err);
        });
    }
  };

  return (
    <div className='reportar-error'>
      <h1>ECLESIA DIGITAL</h1>
      <p style={{ textAlign: "center" }}>
        Web App desarrollada por Eclesia Digital
      </p>
      <div className='reportar-error__info'>
        <h3 className='title-apostolado'>
          "Nuestro apostolado es acercar la tecnología digital a cada Parroquia
          para facilitar la comunicación con su comunidad"
        </h3>
        <h4>Nuestros servicios:</h4>

        <ul>
          <li>Desarrollo Web</li>
          <li>Desarrollo Móvil (iOS y Android)</li>
          <li>Diseño Web</li>
          <li>
            Gestión de correos personalizados:{" "}
            <span style={{ fontStyle: "italic" }}>
              tunombre@tuparroquia.com
            </span>{" "}
            (Outlook y/o Gmail)
          </li>
          <li>
            Gestión de dominios y hosting personalizados:{" "}
            <span style={{ fontStyle: "italic" }}>www.tuparroquia.com</span>
          </li>
          <li>Diseño de Banners, tarjetas, papelería, mantas, flyers, etc</li>
          <li>Diseño y edición de videos</li>
          <li>Transmisión En Vivo de Misas, eventos, conferencias...</li>
        </ul>
        <br />
        <h4>
          También ofrecemos <strong>capacitación</strong> en:
        </h4>
        <ul>
          <li>Cómo usar la Plataforma Eclesia Digital para tu parroquia</li>
          <li>Cómo sacarle provecho a Whatsapp Business</li>
          <li>Cómo crear Formularios de Google para registro de Eventos</li>
          <li>
            Cómo hacer videollamadas para eventos por Zoom, Microsoft Teams y
            Google Meet
          </li>
          <li>
            Cómo usar Google Drive para respaldo de archivos, fotos, videos...
          </li>
          <li>
            Cómo usar la nube de Google para documentos colaborativos y evitar
            el envío de mails con archivos
          </li>
          <li>
            Capacitación Suite de Office: Excel, Word, PowerPoint, Outlook{" "}
          </li>
          <li>
            Capacitación Suite de Google On-Cloud: Documentos, Hojas de Cálculo,
            Presentaciones{" "}
          </li>
        </ul>
      </div>
      <br />
      <h3>Para más información, nos puedes mandar un mensaje aqui:</h3>
      <Form labelCol={{ span: 4 }} onFinish={sendMessage}>
        <h2>Mándanos un Mensaje</h2>
        <p>
          Para <strong>reportar un error</strong> <br />o para contactarte con
          Eclesia Digital
        </p>

        <Form.Item
          label='Nombre'
          rules={[
            {
              required: true,
              message: "Se necesita tu nombre para continuar",
            },
          ]}>
          <Input
            prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            type='text'
            name='user'
            placeholder='Nombre'
            className='input'
            value={messageData.nombre}
            onChange={(e) =>
              setMessageData({ ...messageData, nombre: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item label='Teléfono'>
          <Input
            prefix={<PhoneOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            type='text'
            name='phone'
            placeholder='Teléfono'
            className='input'
            value={messageData.telefono}
            onChange={(e) =>
              setMessageData({ ...messageData, telefono: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item label='Correo'>
          <Input
            prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            type='email'
            name='emai'
            placeholder='Correo electrónico'
            className='input'
            value={messageData.correo}
            onChange={(e) =>
              setMessageData({ ...messageData, correo: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item label='Asunto'>
          <Input
            prefix={<MessageOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            type='text'
            name='subject'
            placeholder='Asunto del mensaje'
            className='input'
            value={messageData.asunto}
            onChange={(e) =>
              setMessageData({ ...messageData, asunto: e.target.value })
            }
          />
        </Form.Item>

        <Form.Item
          label='Mensaje'
          rules={[
            {
              required: true,
              message: "Se necesita un mensaje para continuar",
            },
          ]}>
          <Input.TextArea
            className='input'
            rows={5}
            prefix={<MessageOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder='Escriba su mensaje'
            name='message'
            value={messageData.mensaje}
            onChange={(e) =>
              setMessageData({ ...messageData, mensaje: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Enviar Mensaje
          </Button>
        </Form.Item>
      </Form>
      <p
        style={{ fontStyle: "italic", marginTop: "15px", textAlign: "center" }}>
        *Al enviar el mensaje, confirma que ha leído nuestro Aviso de Privacidad
      </p>
    </div>
  );
}
