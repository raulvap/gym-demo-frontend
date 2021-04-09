import React, { useState, useEffect } from "react";

// // --- API ---
import { addComunidadApi, updateComunidadApi } from "../../../../api/comunidad";
import { getAccessTokenApi } from "../../../../api/auth";

// // --- Components ---
import { Form, Input, Button, notification } from "antd";
import { UserOutlined, LinkOutlined, IdcardOutlined } from "@ant-design/icons";
import { FaInstagram, FaFacebookSquare } from "react-icons/fa";

import "./AddEditInfo.scss";

const { TextArea } = Input;

export default function AddEditInfo(props) {
  const { setIsVisibleModal, setReloadInfoParroquia, comunidad, type } = props;
  const [comunidadData, setComunidadData] = useState({});

  useEffect(() => {
    comunidad ? setComunidadData(comunidad) : setComunidadData({});
  }, [comunidad]);

  const addComunidad = (e) => {
    e.preventDefault();

    if (!comunidadData.title || !comunidadData.description) {
      notification["error"]({
        message: "Se requiere Nombre y Descripción para agregar la información",
      });
    } else {
      const accessToken = getAccessTokenApi();
      comunidadData.type = type;
      comunidadData.order = 100;
      addComunidadApi(accessToken, comunidadData)
        .then(() => {
          {
            type === "donativo"
              ? notification["success"]({
                  message: "Información de Donativo creado",
                })
              : notification["success"]({
                  message: "Colaborador creado",
                });
          }
          setIsVisibleModal(false);
          setReloadInfoParroquia(true);
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
          message: "Información actualizada",
        });
        setIsVisibleModal(false);
        setReloadInfoParroquia(true);
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
        type={type}
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
    type,
  } = props;

  if (type === "donativo") {
    return (
      <Form
        labelCol={{ span: 10 }}
        className='form-add-edit-comunidad'
        onFinish={comunidad ? editComunidad : addComunidad}>
        <Form.Item label='Banco'>
          <Input
            prefix={<UserOutlined style={{ color: "#95A5A6" }} />}
            name='Bank'
            placeholder='Nombre del Banco'
            value={comunidadData.title}
            onChange={(e) =>
              setComunidadData({ ...comunidadData, title: e.target.value })
            }
          />
        </Form.Item>

        <Form.Item label='CLABE Interbancaria'>
          <Input
            prefix={<IdcardOutlined style={{ color: "#95A5A6" }} />}
            name='labor'
            placeholder='CLABE Interbancaria (18 dígitos)'
            value={comunidadData.additionalinfo}
            onChange={(e) =>
              setComunidadData({
                ...comunidadData,
                additionalinfo: e.target.value,
              })
            }
          />
        </Form.Item>

        <Form.Item label='Información Adicional'>
          <TextArea
            rows={6}
            placeholder='Más detalles de la Cuenta para Donativos'
            value={comunidadData.description}
            onChange={(e) =>
              setComunidadData({
                ...comunidadData,
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
            onClick={comunidad ? editComunidad : addComunidad}
            style={{ marginTop: "20px" }}>
            {comunidad ? "Actualizar Información" : "Agregar Información"}
          </Button>
        </Form.Item>
      </Form>
    );
  } else {
    return (
      <Form
        labelCol={{ span: 8 }}
        className='form-add-edit-comunidad'
        onFinish={comunidad ? editComunidad : addComunidad}>
        <Form.Item label='Nombre'>
          <Input
            prefix={<UserOutlined style={{ color: "#95A5A6" }} />}
            name='name'
            placeholder='Nombre del Colaborador'
            value={comunidadData.title}
            onChange={(e) =>
              setComunidadData({ ...comunidadData, title: e.target.value })
            }
          />
        </Form.Item>

        <Form.Item label='URL Foto de Perfil'>
          <Input
            prefix={<LinkOutlined style={{ color: "#95A5A6" }} />}
            name='profile-picture'
            placeholder='URL Foto de Perfil'
            value={comunidadData.url}
            onChange={(e) =>
              setComunidadData({ ...comunidadData, url: e.target.value })
            }
          />
        </Form.Item>

        <Form.Item label='Puesto'>
          <Input
            prefix={<IdcardOutlined style={{ color: "#95A5A6" }} />}
            name='labor'
            placeholder='Puesto'
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

        <Form.Item label='Descripción'>
          <TextArea
            rows={6}
            placeholder='Escribe una breve descripción'
            showCount
            maxLength={280}
            value={comunidadData.description}
            onChange={(e) =>
              setComunidadData({
                ...comunidadData,
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
            onClick={comunidad ? editComunidad : addComunidad}
            style={{ marginTop: "20px" }}>
            {comunidad ? "Actualizar Colaborador" : "Agregar Colaborador"}
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
