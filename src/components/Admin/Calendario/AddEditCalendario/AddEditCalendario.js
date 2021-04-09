import React, { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/es";

// --- API ---
import {
  addCalendarioApi,
  updateCalendarioApi,
} from "../../../../api/calendario";
import { getAccessTokenApi } from "../../../../api/auth";

// --- Components ---
import {
  Form,
  Input,
  Button,
  notification,
  DatePicker,
  Space,
  Tooltip,
} from "antd";
import {
  FontSizeOutlined,
  ClockCircleOutlined,
  LinkOutlined,
  EnvironmentOutlined,
  CameraOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";

import "./AddEditCalendario.scss";

const { TextArea } = Input;
const DateFormat = "ddd DD/MMM/YY";

export default function AddEditCalendario(props) {
  const { setIsVisibleModal, setReloadCalendario, calendario } = props;
  const [calendarioData, setCalendarioData] = useState({});

  useEffect(() => {
    if (calendario) {
      calendario.date = moment(calendarioData.date);
      setCalendarioData(calendario);
    } else {
      setCalendarioData({});
    }
  }, [calendario]);

  const addCalendario = (e) => {
    e.preventDefault();

    if (!calendarioData.date || !calendarioData.title) {
      notification["error"]({
        message: "Se requiere Fecha y Nombre para crear el Evento",
      });
    } else {
      const accessToken = getAccessTokenApi();

      addCalendarioApi(accessToken, calendarioData)
        .then((response) => {
          const typeNotification =
            response.code === 200 ? "success" : "warning";
          notification[typeNotification]({
            message: response.message,
          });
          setIsVisibleModal(false);
          setReloadCalendario(true);
          setCalendarioData({});
        })
        .catch((err) => {
          notification["error"]({ message: "Error en el servidor (e:001" });
        });
    }
  };

  const editCalendario = (event) => {
    event.preventDefault();

    const accessToken = getAccessTokenApi();
    updateCalendarioApi(accessToken, calendarioData._id, calendarioData)
      .then((response) => {
        const typeNotification = response.code === 200 ? "success" : "warning";
        notification[typeNotification]({
          message: response.message,
        });
        setIsVisibleModal(false);
        setReloadCalendario(true);
      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor (c:003)",
        });
      });
  };

  return (
    <div className='add-edit-calendario'>
      <AddEditForm
        calendario={calendario}
        calendarioData={calendarioData}
        setCalendarioData={setCalendarioData}
        addCalendario={addCalendario}
        editCalendario={editCalendario}
      />
    </div>
  );
}

function AddEditForm(props) {
  const {
    calendario,
    calendarioData,
    setCalendarioData,
    addCalendario,
    editCalendario,
  } = props;

  return (
    <Form
      labelCol={{ span: 7 }}
      className='form-add-edit-calendario'
      onFinish={calendario ? editCalendario : addCalendario}>
      <Form.Item label='Nombre del Evento'>
        <Input
          prefix={<FontSizeOutlined style={{ color: "#95A5A6" }} />}
          name='title'
          placeholder='Nombre del Evento'
          value={calendarioData.title}
          onChange={(e) =>
            setCalendarioData({ ...calendarioData, title: e.target.value })
          }
        />
      </Form.Item>

      <Form.Item label='Fecha del Evento'>
        <Space direction='vertical'>
          <Tooltip
            placement='topRight'
            title='Si aparece "Invalid Date" hacer click en "Today" dentro del calendario'>
            <DatePicker
              format={DateFormat}
              value={calendarioData.date}
              onChange={(date) =>
                setCalendarioData({ ...calendarioData, date: date })
              }
            />
          </Tooltip>
        </Space>
      </Form.Item>

      <Form.Item label='Hora'>
        <Input
          prefix={<ClockCircleOutlined style={{ color: "#95A5A6" }} />}
          name='hour'
          placeholder='hora'
          value={calendarioData.hour}
          onChange={(e) =>
            setCalendarioData({
              ...calendarioData,
              hour: e.target.value,
            })
          }
        />
      </Form.Item>

      <Form.Item label='Lugar'>
        <Input
          prefix={<EnvironmentOutlined style={{ color: "#95A5A6" }} />}
          name='place'
          placeholder='Lugar del Evento'
          value={calendarioData.place}
          onChange={(e) =>
            setCalendarioData({
              ...calendarioData,
              place: e.target.value,
            })
          }
        />
      </Form.Item>

      <Form.Item label='URL Imágen de Portada'>
        <Input
          prefix={<CameraOutlined style={{ color: "#95A5A6" }} />}
          name='image-event'
          placeholder='URL de imágen de portada'
          value={calendarioData.url}
          onChange={(e) =>
            setCalendarioData({ ...calendarioData, url: e.target.value })
          }
        />
      </Form.Item>

      <Form.Item label='Información Adicional'>
        <Input
          prefix={<WhatsAppOutlined style={{ color: "#95A5A6" }} />}
          name='additionalinfo'
          placeholder='Información de contacto'
          value={calendarioData.additionalinfo}
          onChange={(e) =>
            setCalendarioData({
              ...calendarioData,
              additionalinfo: e.target.value,
            })
          }
        />
      </Form.Item>

      <p style={{ fontStyle: "italic", textAlign: "center", color: "#515a5a" }}>
        Para el link de registro, se recomienda usar{" "}
        <a
          href='https://docs.google.com/forms/u/0/'
          target='_blank'
          rel='noopener noreferrer'>
          Google Forms
        </a>
      </p>
      <Form.Item label='Link de Registro'>
        <Input
          prefix={<LinkOutlined style={{ color: "#95A5A6" }} />}
          name='link'
          placeholder='Link de registro'
          value={calendarioData.link}
          onChange={(e) =>
            setCalendarioData({
              ...calendarioData,
              link: e.target.value,
            })
          }
        />
      </Form.Item>

      <Form.Item label='Descripción'>
        <TextArea
          rows={6}
          placeholder='Escribe la descripción del evento'
          value={calendarioData.description}
          onChange={(e) =>
            setCalendarioData({
              ...calendarioData,
              description: e.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <Button
          type='primary'
          htmlType='submit'
          className='btn-submit'
          onClick={calendario ? editCalendario : addCalendario}>
          {calendario ? "Actualizar Evento" : "Crear Evento"}
        </Button>
      </Form.Item>
    </Form>
  );
}
