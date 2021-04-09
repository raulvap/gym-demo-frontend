import React, { useState, useEffect } from "react";

// --- API ---
import { addAvisoApi, updateAvisoApi } from "../../../../api/aviso";
import { getAccessTokenApi } from "../../../../api/auth";

// --- Components ---
import { Form, Input, Button, notification } from "antd";
import { FontSizeOutlined } from "@ant-design/icons";

import "./AddEditAviso.scss";

const { TextArea } = Input;

export default function AddEditAviso(props) {
  const { setIsVisibleModal, setReloadAviso, aviso } = props;
  const [avisoData, setAvisoData] = useState({});

  useEffect(() => {
    if (aviso) {
      setAvisoData(aviso);
    } else {
      setAvisoData({});
    }
  }, [aviso]);

  const addAviso = (e) => {
    e.preventDefault();

    if (!avisoData.title || !avisoData.description) {
      notification["error"]({
        message: "Se requiere toda la información para crear el Aviso",
      });
    } else {
      const accessToken = getAccessTokenApi();

      avisoData.order = 100;

      addAvisoApi(accessToken, avisoData)
        .then((response) => {
          const typeNotification =
            response.code === 200 ? "success" : "warning";
          notification[typeNotification]({
            message: response.message,
          });
          setIsVisibleModal(false);
          setReloadAviso(true);
          setAvisoData({});
        })
        .catch((err) => {
          notification["error"]({ message: "Error en el servidor (a:001" });
          console.log(err);
        });
    }
  };

  const editAviso = (event) => {
    event.preventDefault();

    const accessToken = getAccessTokenApi();
    updateAvisoApi(accessToken, avisoData._id, avisoData)
      .then((response) => {
        const typeNotification = response.code === 200 ? "success" : "warning";
        notification[typeNotification]({
          message: response.message,
        });
        setIsVisibleModal(false);
        setReloadAviso(true);
      })
      .catch((err) => {
        notification["error"]({
          message: "Error del servidor (a:003)",
        });
        console.log(err);
      });
  };

  return (
    <div className='add-edit-aviso'>
      <AddEditForm
        aviso={aviso}
        avisoData={avisoData}
        setAvisoData={setAvisoData}
        addAviso={addAviso}
        editAviso={editAviso}
      />
    </div>
  );
}

function AddEditForm(props) {
  const { aviso, avisoData, setAvisoData, addAviso, editAviso } = props;

  return (
    <Form
      labelCol={{ span: 7 }}
      className='form-add-edit-aviso'
      onFinish={aviso ? editAviso : addAviso}>
      <Form.Item>
        <Input
          prefix={<FontSizeOutlined style={{ color: "#95A5A6" }} />}
          name='title'
          placeholder='Título del Aviso'
          value={avisoData.title}
          onChange={(e) =>
            setAvisoData({ ...avisoData, title: e.target.value })
          }
        />
      </Form.Item>

      <Form.Item>
        <TextArea
          rows={6}
          placeholder='Escribe la descripción del Aviso'
          value={avisoData.description}
          onChange={(e) =>
            setAvisoData({
              ...avisoData,
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
          onClick={aviso ? editAviso : addAviso}>
          {aviso ? "Actualizar Aviso" : "Crear Aviso"}
        </Button>
      </Form.Item>
    </Form>
  );
}
