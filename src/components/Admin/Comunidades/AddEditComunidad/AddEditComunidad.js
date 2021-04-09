import React, { useState, useEffect } from "react";

// --- API ---
import { addComunidadApi, updateComunidadApi } from "../../../../api/comunidad";
import { getAccessTokenApi } from "../../../../api/auth";

// --- Components ---
import { Form, Input, Button, notification } from "antd";
import {
  SettingOutlined,
  InfoCircleOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { FaInstagram, FaFacebookSquare } from "react-icons/fa";

import "./AddEditComunidad.scss";

const { TextArea } = Input;

export default function AddEditComunidad(props) {
  const { setIsVisibleModal, setReloadComunidades, comunidad } = props;
  const [comunidadData, setComunidadData] = useState({});

  useEffect(() => {
    comunidad ? setComunidadData(comunidad) : setComunidadData({});
  }, [comunidad]);

  const addComunidad = (e) => {
    e.preventDefault();

    if (!comunidadData.title || !comunidadData.description) {
      notification["error"]({
        message:
          "Se requiere Nombre y Descripción para agregar la info de la comunidad",
      });
    } else {
      const accessToken = getAccessTokenApi();
      comunidadData.type = "comunidad";
      comunidadData.order = 100;
      addComunidadApi(accessToken, comunidadData)
        .then((response) => {
          notification["success"]({
            message: response.message,
          });
          setIsVisibleModal(false);
          setReloadComunidades(true);
          setComunidadData({});
        })
        .catch((err) => {
          notification["error"]({ message: "Error en el servidor (c:001" });
        });
    }
  };

  const editComunidad = (event) => {
    event.preventDefault();

    const accessToken = getAccessTokenApi();
    updateComunidadApi(accessToken, comunidadData._id, comunidadData)
      .then((response) => {
        notification["success"]({
          message: response.message,
        });
        setIsVisibleModal(false);
        setReloadComunidades(true);
      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor (c:003)",
        });
      });
  };

  return (
    <div className='add-edit-comunidad'>
      <AddEditForm
        comunidad={comunidad}
        comunidadData={comunidadData}
        setComunidadData={setComunidadData}
        addComunidad={addComunidad}
        editComunidad={editComunidad}
      />
    </div>
  );
}

function AddEditForm(props) {
  const {
    comunidad,
    comunidadData,
    setComunidadData,
    addComunidad,
    editComunidad,
  } = props;

  return (
    <Form
      labelCol={{ span: 5 }}
      className='form-add-edit-comunidad'
      onFinish={comunidad ? editComunidad : addComunidad}>
      <Form.Item label='Nombre Grupo/Comunidad'>
        <Input
          prefix={<SettingOutlined style={{ color: "#95A5A6" }} />}
          name='comunidad'
          placeholder='Nombre de la Comunidad o Grupo Parroquial'
          value={comunidadData.title}
          onChange={(e) =>
            setComunidadData({ ...comunidadData, title: e.target.value })
          }
        />
      </Form.Item>

      <Form.Item label='URL Imágen de Portada'>
        <Input
          prefix={<LinkOutlined style={{ color: "#95A5A6" }} />}
          name='image-service'
          placeholder='URL de imágen de portada'
          value={comunidadData.url}
          onChange={(e) =>
            setComunidadData({ ...comunidadData, url: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item label='Fechas/Horarios'>
        <Input
          prefix={<InfoCircleOutlined style={{ color: "#95A5A6" }} />}
          name='additionalinfo'
          placeholder='Información de Fechas y/o Horarios'
          value={comunidadData.additionalinfo}
          onChange={(e) =>
            setComunidadData({
              ...comunidadData,
              additionalinfo: e.target.value,
            })
          }
        />
      </Form.Item>

      <Form.Item label='Facebook'>
        <Input
          prefix={<FaFacebookSquare style={{ color: "#95A5A6" }} />}
          name='facebook'
          placeholder='Link de Facebook'
          value={comunidadData.facebook}
          onChange={(e) =>
            setComunidadData({
              ...comunidadData,
              facebook: e.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item label='Instagram'>
        <Input
          prefix={<FaInstagram style={{ color: "#95A5A6" }} />}
          name='instagram'
          placeholder='Link de Instagram'
          value={comunidadData.instagram}
          onChange={(e) =>
            setComunidadData({
              ...comunidadData,
              instagram: e.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item label='Link Adicional'>
        <Input
          prefix={<LinkOutlined style={{ color: "#95A5A6" }} />}
          name='socialLink'
          placeholder='Link adicional'
          value={comunidadData.socialLink}
          onChange={(e) =>
            setComunidadData({
              ...comunidadData,
              socialLink: e.target.value,
            })
          }
        />
      </Form.Item>

      <Form.Item label='Descripción'>
        <TextArea
          rows={6}
          placeholder='Escribe la descripción de la comunidad o grupo parroquial'
          value={comunidadData.description}
          onChange={(e) =>
            setComunidadData({ ...comunidadData, description: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <Button
          type='primary'
          htmlType='submit'
          className='btn-submit'
          onClick={comunidad ? editComunidad : addComunidad}>
          {comunidad ? "Actualizar Comunidad" : "Crear Comunidad"}
        </Button>
      </Form.Item>
    </Form>
  );
}
