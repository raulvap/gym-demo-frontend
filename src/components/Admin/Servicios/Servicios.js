import React, { useState, useEffect } from "react";
import { NavLink as Link } from "react-router-dom";
import DragSortableList from "react-drag-sortable";

// --- API ---
import { getAccessTokenApi } from "../../../api/auth";
import { updateServicioApi, deleteServicioApi } from "../../../api/servicios";

//--- Components ---
import Modal from "../../Modal";
import AddEditServicio from "./AddEditServicio";

import { List, Button, Modal as ModalAntd, notification } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

import "./Servicios.scss";

const { confirm } = ModalAntd;

export default function Servicios(props) {
  const { servicios, setReloadServicios } = props;
  const [listItems, setListItems] = useState([]);

  // ---Modal ---
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    const listItemsArray = [];
    servicios.forEach((item) => {
      listItemsArray.push({
        content: (
          <ServicioItem
            item={item}
            editServicioModal={editServicioModal}
            deleteServicio={deleteServicio}
          />
        ),
      });
    });
    setListItems(listItemsArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [servicios]);

  const onSort = (sortedList, dropEvent) => {
    const accesToken = getAccessTokenApi();

    sortedList.forEach((item) => {
      const { _id } = item.content.props.item;
      const order = item.rank;
      updateServicioApi(accesToken, _id, { order });
    });
  };

  const addServicioModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Crear Nuevo Servicio");
    setModalContent(
      <AddEditServicio
        setIsVisibleModal={setIsVisibleModal}
        setReloadServicios={setReloadServicios}
      />
    );
  };

  const deleteServicio = (servicio) => {
    const accesToken = getAccessTokenApi();

    confirm({
      title: "Eliminar Servicio",
      content: `¿Estas seguro que quieres eliminar el Servicio: ${servicio.title}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteServicioApi(accesToken, servicio._id)
          .then((response) => {
            notification["success"]({
              message: response.message,
            });
            setReloadServicios(true);
          })
          .catch(() => {
            notification["error"]({
              message: "Error del servidor, intentelo más tarde (s:004)",
            });
          });
      },
    });
  };

  const editServicioModal = (servicio) => {
    setIsVisibleModal(true);
    setModalTitle(`Editar servicio: ${servicio.title}`);
    setModalContent(
      <AddEditServicio
        setIsVisibleModal={setIsVisibleModal}
        setReloadServicios={setReloadServicios}
        servicio={servicio}
      />
    );
  };

  return (
    <div className='servicio-list'>
      <div className='servicio-list__header'>
        <div>
          <h4>Servicios</h4>
          Para ordenar: seleccione un servicio y arrastre hacia la posición
          deseada dentro de la sección correspondiente
        </div>
        <div className='buttons-comunidad'>
          <Button type='primary'>
            <Link to='/servicios'>Ver Servicios</Link>
          </Button>
          <Button type='primary' onClick={addServicioModal}>
            <PlusOutlined />
            Crear Servicio
          </Button>
        </div>
      </div>

      <div className='horario-list__items'>
        <DragSortableList items={listItems} onSort={onSort} type='vertical' />
      </div>

      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
        width='60%'>
        {modalContent}
      </Modal>
    </div>
  );
}

function ServicioItem(props) {
  const { item, deleteServicio, editServicioModal } = props;

  return (
    <List.Item
      actions={[
        // <Switch
        //           title={item.active ? "Desactivar de Inicio" : "Activar en Inicio"}
        //           defaultChecked={item.active}
        //           onChange={(e) => activateHorario(item, e)}
        //         />,
        <Button
          type='primary'
          title='Editar'
          onClick={() => editServicioModal(item)}>
          <EditOutlined />
        </Button>,
        <Button
          type='danger'
          title='Eliminar'
          onClick={() => deleteServicio(item)}>
          <DeleteOutlined />
        </Button>,
      ]}>
      <List.Item.Meta
        title={item.title}
        description={"Sección: " + item.section}
      />
    </List.Item>
  );
}
