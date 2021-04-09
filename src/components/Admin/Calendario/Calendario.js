import React, { useState } from "react";
import { NavLink as Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/es";

// --- API ---
import { getAccessTokenApi } from "../../../api/auth";
import { deleteCalendarioApi } from "../../../api/calendario";

//--- Components ---
import Modal from "../../Modal";
import AddEditCalendario from "./AddEditCalendario";

import { List, Button, Modal as ModalAntd, notification } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
} from "@ant-design/icons";

import "./Calendario.scss";

const { confirm } = ModalAntd;

export default function Calendario(props) {
  const { calendario, setReloadCalendario } = props;

  // ---Modal ---
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const addCalendarioModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Crear Nuevo Evento");
    setModalContent(
      <AddEditCalendario
        setIsVisibleModal={setIsVisibleModal}
        setReloadCalendario={setReloadCalendario}
      />
    );
  };

  const deleteCalendario = (calendario) => {
    const accesToken = getAccessTokenApi();

    confirm({
      title: "Eliminar Evento",
      content: `¿Estas seguro que quieres eliminar el evento: ${calendario.title}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteCalendarioApi(accesToken, calendario._id)
          .then((response) => {
            notification["success"]({
              message: response.message,
            });
            setReloadCalendario(true);
          })
          .catch(() => {
            notification["error"]({
              message: "Error del servidor, intentelo más tarde (e:004)",
            });
          });
      },
    });
  };

  const editCalendarioModal = (calendario) => {
    setIsVisibleModal(true);
    setModalTitle(`Editar evento: ${calendario.title}`);
    setModalContent(
      <AddEditCalendario
        setIsVisibleModal={setIsVisibleModal}
        setReloadCalendario={setReloadCalendario}
        calendario={calendario}
      />
    );
  };

  return (
    <div className='calendario-list'>
      <div className='calendario-list__header'>
        <h4>Calendario de Eventos Parroquiales</h4>

        <div className='buttons-calendario'>
          <Button type='primary'>
            <Link to='/calendario'>Ver Calendario</Link>
          </Button>
          <Button type='primary' onClick={addCalendarioModal}>
            <PlusOutlined />
            Crear Evento
          </Button>
        </div>
      </div>

      <List
        className='calendario-list__content'
        dataSource={calendario}
        renderItem={(item) => (
          <CalendarioItem
            item={item}
            editCalendarioModal={editCalendarioModal}
            deleteCalendario={deleteCalendario}
          />
        )}
      />

      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
        width='70%'>
        {modalContent}
      </Modal>
    </div>
  );
}

function CalendarioItem(props) {
  const { item, editCalendarioModal, deleteCalendario } = props;

  return (
    <List.Item
      actions={[
        <Button
          type='primary'
          title='Editar'
          onClick={() => editCalendarioModal(item)}>
          <EditOutlined />
        </Button>,
        <Button
          type='danger'
          title='Eliminar'
          onClick={() => deleteCalendario(item)}>
          <DeleteOutlined />
        </Button>,
      ]}>
      <div className='event-info'>
        <div className='event-info__date'>
          <h4>{moment(item.date).format("dddd")}</h4>
          <h4>{moment(item.date).format("DD/MMM/YY")}</h4>
        </div>
        <div className='event-info__content'>
          <h2>{item.title}</h2>
          <p>
            {item.hour} | {item.place}
          </p>
          <p>{item.additionalinfo}</p>
          <p>
            Link de Registro:{" "}
            {item.link ? (
              <CheckCircleFilled
                style={{
                  color: "#27AE60",
                  fontSize: "20px",
                  marginLeft: "5px",
                }}
              />
            ) : (
              <CloseCircleFilled
                style={{
                  color: "#D51300",
                  fontSize: "20px",
                  marginLeft: "5px",
                }}
              />
            )}
          </p>
        </div>
      </div>
    </List.Item>
  );
}
