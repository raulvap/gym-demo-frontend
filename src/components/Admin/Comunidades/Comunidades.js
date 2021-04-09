import React, { useState, useEffect } from "react";
import { NavLink as Link } from "react-router-dom";
import DragSortableList from "react-drag-sortable";

// --- API ---
import { getAccessTokenApi } from "../../../api/auth";
import { updateComunidadApi, deleteComunidadApi } from "../../../api/comunidad";

//--- Components ---
import Modal from "../../Modal";
import AddEditComunidad from "./AddEditComunidad";

import { List, Button, Modal as ModalAntd, notification } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

import "./Comunidades.scss";

const { confirm } = ModalAntd;

export default function Comunidades(props) {
  const { comunidades, setReloadComunidades } = props;
  const [listItems, setListItems] = useState([]);

  // ---Modal ---
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    const listItemsArray = [];
    comunidades.forEach((item) => {
      if (item.type === "comunidad") {
        listItemsArray.push({
          content: (
            <ComunidadItem
              item={item}
              editComunidadModal={editComunidadModal}
              deleteComunidad={deleteComunidad}
            />
          ),
        });
      }
    });
    setListItems(listItemsArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comunidades]);

  const onSort = (sortedList, dropEvent) => {
    const accesToken = getAccessTokenApi();

    sortedList.forEach((item) => {
      const { _id } = item.content.props.item;
      const order = item.rank;
      updateComunidadApi(accesToken, _id, { order });
    });
  };

  const addComunidadModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Crear Nueva Comunidad o Grupo Parroquial");
    setModalContent(
      <AddEditComunidad
        setIsVisibleModal={setIsVisibleModal}
        setReloadComunidades={setReloadComunidades}
      />
    );
  };

  const deleteComunidad = (comunidad) => {
    const accesToken = getAccessTokenApi();

    confirm({
      title: "Eliminar Comunidad",
      content: `¿Estas seguro que quieres eliminar la comunidad: ${comunidad.title}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteComunidadApi(accesToken, comunidad._id)
          .then((response) => {
            notification["success"]({
              message: response.message,
            });
            setReloadComunidades(true);
          })
          .catch(() => {
            notification["error"]({
              message: "Error del servidor, intentelo más tarde (c:004)",
            });
          });
      },
    });
  };

  const editComunidadModal = (comunidad) => {
    setIsVisibleModal(true);
    setModalTitle(`Editar comunidad: ${comunidad.title}`);
    setModalContent(
      <AddEditComunidad
        setIsVisibleModal={setIsVisibleModal}
        setReloadComunidades={setReloadComunidades}
        comunidad={comunidad}
      />
    );
  };

  return (
    <div className='comunidad-list'>
      <div className='comunidad-list__header'>
        <div>
          <h4>Comunidades o Grupos Parroquiales</h4>
          Para ordenar: seleccione un elemento y arrastre hacia la posición
          deseada
        </div>
        <div className='buttons-comunidad'>
          <Button type='primary'>
            <Link to='/comunidad'>Ver Comunidades</Link>
          </Button>
          <Button type='primary' onClick={addComunidadModal}>
            <PlusOutlined />
            Crear Comunidad
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
        width='70%'>
        {modalContent}
      </Modal>
    </div>
  );
}

function ComunidadItem(props) {
  const { item, deleteComunidad, editComunidadModal } = props;

  return (
    <List.Item
      actions={[
        <Button
          type='primary'
          title='Editar'
          onClick={() => editComunidadModal(item)}>
          <EditOutlined />
        </Button>,
        <Button
          type='danger'
          title='Eliminar'
          onClick={() => deleteComunidad(item)}>
          <DeleteOutlined />
        </Button>,
      ]}>
      <List.Item.Meta title={item.title} description={item.additionalinfo} />
    </List.Item>
  );
}
