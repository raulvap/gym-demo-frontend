import React, { useState, useEffect } from "react";
import DragSortableList from "react-drag-sortable";

// --- API ---
import { getAccessTokenApi } from "../../../../api/auth";
import {
  updateComunidadApi,
  deleteComunidadApi,
} from "../../../../api/comunidad";

//--- Components ---
import AddEditInfo from "../AddEditInfo";

import { List, Button, Modal as ModalAntd, notification, Avatar } from "antd";
import { EditOutlined, DeleteOutlined, UserOutlined } from "@ant-design/icons";

import "./Colaboradores.scss";

const { confirm } = ModalAntd;

export default function Colaboradores(props) {
  const {
    comunidades,
    setReloadInfoParroquia,
    setIsVisibleModal,
    setModalTitle,
    setModalContent,
  } = props;
  const [listItems, setListItems] = useState([]);

  useEffect(() => {
    const listItemsArray = [];
    comunidades.forEach((item) => {
      if (item.type === "colaborador") {
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

  const deleteComunidad = (comunidad) => {
    const accesToken = getAccessTokenApi();

    confirm({
      title: "Eliminar Colaborador",
      content: `¿Estas seguro que quieres eliminar a: ${comunidad.title}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteComunidadApi(accesToken, comunidad._id)
          .then((response) => {
            notification["success"]({
              message: response.message,
            });
            setReloadInfoParroquia(true);
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
    setModalTitle(`Editar colaborador: ${comunidad.title}`);
    setModalContent(
      <AddEditInfo
        setIsVisibleModal={setIsVisibleModal}
        setReloadInfoParroquia={setReloadInfoParroquia}
        comunidad={comunidad}
      />
    );
  };

  return (
    <div className='admin-colaboradores'>
      <DragSortableList items={listItems} onSort={onSort} type='vertical' />
    </div>
  );
}

function ComunidadItem(props) {
  const { item, deleteComunidad, editComunidadModal } = props;

  return (
    <List.Item
      className='admin-colaborador'
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
      {item.url ? (
        <img src={item.url} alt={item.title} />
      ) : (
        <Avatar size={64} icon={<UserOutlined />} />
      )}
      <List.Item.Meta title={item.title} description={item.additionalinfo} />
    </List.Item>
  );
}
