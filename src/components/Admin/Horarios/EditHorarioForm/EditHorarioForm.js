import React, { useState, useEffect } from "react";

// --- API ---
import { updateHorarioApi } from "../../../../api/horarios";
import { getAccessTokenApi } from "../../../../api/auth";

// --- COMPONENTS ---
import { Form, Input, Button, notification } from "antd";
import { FontSizeOutlined } from "@ant-design/icons";

import "./EditHorarioForm.scss";

const { TextArea } = Input;

export default function EditHorarioForm(props) {
  const { setIsVisibleModal, setReloadHorario, horario } = props;
  const [horarioData, setHorarioData] = useState(horario);

  useEffect(() => {
    setHorarioData(horario);
  }, [horario]);

  const editHorario = (event) => {
    event.preventDefault();

    // if (!menuWebData.title || !menuWebData.url) {
    //   notification["error"]({
    //     message: "Todos los campos son obligatorios.",
    //   });
    // } else {
    const accesToken = getAccessTokenApi();

    updateHorarioApi(accesToken, horarioData._id, horarioData)
      .then((response) => {
        notification["success"]({
          message: response.message,
        });
        setIsVisibleModal(false);
        setReloadHorario(true);
      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor, intentelo más tarde.",
        });
      });
  };

  return (
    <div className='edit-horario-form'>
      <EditForm
        horarioData={horarioData}
        setHorarioData={setHorarioData}
        editHorario={editHorario}
      />
    </div>
  );
}

function EditForm(props) {
  const { horarioData, setHorarioData, editHorario } = props;

  return (
    <Form className='form-edit' onFinish={editHorario}>
      <Form.Item>
        <Input
          prefix={<FontSizeOutlined />}
          placeholder='Titulo'
          value={horarioData.title}
          onChange={(e) =>
            setHorarioData({ ...horarioData, title: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <TextArea
          rows={7}
          placeholder='Escribe los horarios'
          value={horarioData.description}
          onChange={(e) =>
            setHorarioData({ ...horarioData, description: e.target.value })
          }
        />
      </Form.Item>
      {/* <Form.Item>
        <Input
          prefix={<LinkOutlined />}
          placeholder='URL'
          value={menuWebData.url}
          onChange={(e) =>
            setMenuWebData({ ...menuWebData, url: e.target.value })
          }
        />
      </Form.Item> */}
      <Form.Item>
        <Button
          type='primary'
          htmlType='submit'
          className='btn-submit'
          onClick={editHorario}>
          Actualizar Horario
        </Button>
      </Form.Item>
    </Form>
  );
}
