import React, { useState, useEffect } from "react";
import { NavLink as Link } from "react-router-dom";
import DragSortableList from "react-drag-sortable";

// --- API ---
import { getAccessTokenApi } from "../../../api/auth";
import {
  updateHorarioApi,
  activateHorarioApi,
  deleteHorarioApi,
} from "../../../api/horarios";

//--- Components ---
import Modal from "../../Modal";
import AddHorarioForm from "./AddHorarioForm";
import EditHorarioForm from "./EditHorarioForm";
import { Switch, List, Button, Modal as ModalAntd, notification } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

import "./Horarios.scss";

const { confirm } = ModalAntd;

export default function Horarios(props) {
  const { horario, setReloadHorario, countHorarios } = props;
  const [listItems, setListItems] = useState([]);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    const listItemsArray = [];
    horario.forEach((item) => {
      listItemsArray.push({
        content: (
          <HorarioItem
            item={item}
            activateHorario={activateHorario}
            editHorarioModal={editHorarioModal}
            deleteHorario={deleteHorario}
          />
        ),
      });
    });
    setListItems(listItemsArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [horario]);

  const onSort = (sortedList, dropEvent) => {
    const accesToken = getAccessTokenApi();

    sortedList.forEach((item) => {
      const { _id } = item.content.props.item;
      const order = item.rank;
      updateHorarioApi(accesToken, _id, { order });
    });
  };

  const addHorarioModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Crear Nuevo Horario");
    setModalContent(
      <AddHorarioForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadHorario={setReloadHorario}
      />
    );
  };

  const activateHorario = (horario, status) => {
    if (horario.active) {
      const accesToken = getAccessTokenApi();
      activateHorarioApi(accesToken, horario._id, status)
        .then((response) => {
          notification["success"]({
            message: response.message,
          });
          setReloadHorario(true);
        })
        .catch(() => {
          notification["error"]({
            message: "Error del servidor, intentelo más tarde (h:004)",
          });
        });
    } else {
      if (countHorarios < 3) {
        const accesToken = getAccessTokenApi();
        activateHorarioApi(accesToken, horario._id, status)
          .then((response) => {
            notification["success"]({
              message: response.message,
            });
            setReloadHorario(true);
          })
          .catch(() => {
            notification["error"]({
              message: "Error del servidor, intentelo más tarde (h:004)",
            });
          });
      } else {
        setReloadHorario(true);
        return notification["error"]({
          message: "Solo se pueden mostrar 3 horarios en la página de inicio",
        });
      }
    }
  };

  const deleteHorario = (horario) => {
    const accesToken = getAccessTokenApi();

    confirm({
      title: "Eliminar Horario",
      content: `¿Estas seguro que quieres eliminar el Horario: ${horario.title}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteHorarioApi(accesToken, horario._id)
          .then((response) => {
            notification["success"]({
              message: response.message,
            });
            setReloadHorario(true);
          })
          .catch(() => {
            notification["error"]({
              message: "Error del servidor, intentelo más tarde (h:005)",
            });
          });
      },
    });
  };

  const editHorarioModal = (horario) => {
    setIsVisibleModal(true);
    setModalTitle(`Editar horario: ${horario.title}`);
    setModalContent(
      <EditHorarioForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadHorario={setReloadHorario}
        horario={horario}
      />
    );
  };

  return (
    <div className='horario-list'>
      <div className='horario-list__header'>
        <div>
          <h4>Horarios</h4>
          <ul>
            <li>
              Para ordenar: seleccione un horario y arrastre hacia la posición
              deseada
            </li>
            <li>
              En la página de inicio se recomienda tener{" "}
              <strong>3 horarios activos solamente</strong>
            </li>
          </ul>
        </div>
        <div className='buttons-comunidad'>
          <Button type='primary'>
            <Link to='/contacto'>Ver Horarios</Link>
          </Button>

          <Button type='primary' onClick={addHorarioModal}>
            <PlusOutlined />
            Crear Horario
          </Button>
        </div>
      </div>

      <div className='horario-list__items'>
        <DragSortableList items={listItems} onSort={onSort} type='vertical' />
      </div>

      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}>
        {modalContent}
      </Modal>
    </div>
  );
}

function HorarioItem(props) {
  const { item, activateHorario, deleteHorario, editHorarioModal } = props;

  return (
    <List.Item
      actions={[
        <Switch
          title={item.active ? "Desactivar de Inicio" : "Activar en Inicio"}
          defaultChecked={item.active}
          onChange={(e) => activateHorario(item, e)}
        />,
        <Button
          type='primary'
          title='Editar'
          onClick={() => editHorarioModal(item)}>
          <EditOutlined />
        </Button>,
        <Button
          type='danger'
          title='Eliminar'
          onClick={() => deleteHorario(item)}>
          <DeleteOutlined />
        </Button>,
      ]}>
      <List.Item.Meta title={item.title} />
    </List.Item>
  );
}
