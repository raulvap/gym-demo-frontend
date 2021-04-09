import React, { useState } from "react";

// --- API ---
import { getAccessTokenApi } from "../../../../api/auth";
import { addHorarioApi } from "../../../../api/horarios";

// --- Components ---
import { Form, Input, Button, notification } from "antd";
import { FontSizeOutlined } from "@ant-design/icons";

import "./AddHorarioForm.scss";

const { TextArea } = Input;

export default function AddHorarioForm(props) {
  const { setIsVisibleModal, setReloadHorario } = props;
  const [horarioData, setHorarioData] = useState({});

  const addHorario = (event) => {
    event.preventDefault();
    // let finalData = {
    //   title: horarioData.title,
    //   url: (menuWebData.http ? menuWebData.http : "http://") + menuWebData.url,
    // };

    const accessToken = getAccessTokenApi();

    horarioData.order = 100;

    addHorarioApi(accessToken, horarioData)
      .then((response) => {
        notification["success"]({
          message: response.message,
        });
        setIsVisibleModal(false);
        setReloadHorario(true);
        setHorarioData({});
        //   finalData = {};
      })
      .catch(() => {
        notification["error"]({
          message: "Error en el servidor (h:001)",
        });
      });
  };

  return (
    <div className='add-horario-form'>
      <AddForm
        horarioData={horarioData}
        setHorarioData={setHorarioData}
        addHorario={addHorario}
      />
    </div>
  );
}

function AddForm(props) {
  const { horarioData, setHorarioData, addHorario } = props;
  //   const { Option } = Select;

  //   const selectBefore = (
  //     <Select
  //       defaultValue='http://'
  //       style={{ width: 90 }}
  //       onChange={(e) => setMenuWebData({ ...menuWebData, http: e })}>
  //       <Option value='http://'>http://</Option>
  //       <Option value='https://'>https://</Option>
  //     </Select>
  //   );

  return (
    <Form className='form-add' onFinish={addHorario}>
      <Form.Item>
        <Input
          prefix={<FontSizeOutlined />}
          placeholder='Titulo del Horario'
          value={horarioData.title}
          onChange={(e) =>
            setHorarioData({ ...horarioData, title: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <TextArea
          rows={6}
          placeholder='Escribe los horarios'
          value={horarioData.description}
          onChange={(e) =>
            setHorarioData({ ...horarioData, description: e.target.value })
          }
        />
      </Form.Item>
      {/* <Form.Item>
        <Input
          addonBefore={selectBefore}
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
          onClick={addHorario}>
          Crear Horario
        </Button>
      </Form.Item>
    </Form>
  );
}
