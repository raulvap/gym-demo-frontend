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

import { List, Button, Modal as ModalAntd, notification } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import "./Donativo.scss";

const { confirm } = ModalAntd;

export default function Donativo(props) {
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
      if (item.type === "donativo") {
        listItemsArray.push({
          content: (
            <ComunidadItem
              item={item}
              editDonativoModal={editDonativoModal}
              deleteDonativo={deleteDonativo}
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

  const deleteDonativo = (comunidad) => {
    const accesToken = getAccessTokenApi();

    confirm({
      title: "Eliminar Información de Donativo",
      content: `¿Estas seguro que quieres eliminar esta información?`,
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

  const editDonativoModal = (comunidad) => {
    const type = "donativo";
    setIsVisibleModal(true);
    setModalTitle(`Editar información: ${comunidad.title}`);
    setModalContent(
      <AddEditInfo
        setIsVisibleModal={setIsVisibleModal}
        setReloadInfoParroquia={setReloadInfoParroquia}
        comunidad={comunidad}
        type={type}
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
  const { item, deleteDonativo, editDonativoModal } = props;

  return (
    <List.Item
      actions={[
        <Button
          type='primary'
          title='Editar'
          onClick={() => editDonativoModal(item)}>
          <EditOutlined />
        </Button>,
        <Button
          type='danger'
          title='Eliminar'
          onClick={() => deleteDonativo(item)}>
          <DeleteOutlined />
        </Button>,
      ]}>
      <List.Item.Meta title={item.title} description={item.additionalinfo} />
    </List.Item>
  );
}
