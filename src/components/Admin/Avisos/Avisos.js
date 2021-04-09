import React, { useState, useEffect } from "react";
import { NavLink as Link } from "react-router-dom";
import DragSortableList from "react-drag-sortable";

// --- API ---
import { getAccessTokenApi } from "../../../api/auth";
import { updateAvisoApi, deleteAvisoApi } from "../../../api/aviso";

//--- Components ---
import Modal from "../../Modal";
import AddEditAviso from "./AddEditAviso";
import { List, Button, Modal as ModalAntd, notification } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

import "./Avisos.scss";

const { confirm } = ModalAntd;

export default function Avisos(props) {
  const { aviso, setReloadAviso } = props;
  const [listItems, setListItems] = useState([]);

  //   --- Para el ModalComponent: ---
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    const listItemsArray = [];
    aviso.forEach((item) => {
      listItemsArray.push({
        content: (
          <AvisoItem
            item={item}
            deleteAviso={deleteAviso}
            editAvisoModal={editAvisoModal}
          />
        ),
      });
    });
    setListItems(listItemsArray);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aviso]);

  const onSort = (sortedList, dropEvent) => {
    const accesToken = getAccessTokenApi();

    sortedList.forEach((item) => {
      const { _id } = item.content.props.item;
      const order = item.rank;
      updateAvisoApi(accesToken, _id, { order });
    });
  };

  const addAvisoModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Crear Nuevo Aviso");
    setModalContent(
      <AddEditAviso
        setIsVisibleModal={setIsVisibleModal}
        setReloadAviso={setReloadAviso}
      />
    );
  };

  const deleteAviso = (aviso) => {
    const accesToken = getAccessTokenApi();

    confirm({
      title: "Eliminar Aviso",
      content: `¿Estas seguro que quieres eliminar el Aviso: ${aviso.title}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteAvisoApi(accesToken, aviso._id)
          .then((response) => {
            const typeNotification =
              response.code === 200 ? "success" : "warning";
            notification[typeNotification]({
              message: response.message,
            });
            setReloadAviso(true);
          })
          .catch(() => {
            notification["error"]({
              message: "Error del servidor, intentelo más tarde (a:005)",
            });
          });
      },
    });
  };

  const editAvisoModal = (aviso) => {
    setIsVisibleModal(true);
    setModalTitle(`Editar aviso: ${aviso.title}`);
    setModalContent(
      <AddEditAviso
        setIsVisibleModal={setIsVisibleModal}
        setReloadAviso={setReloadAviso}
        aviso={aviso}
      />
    );
  };

  return (
    <div className='aviso-list'>
      <div className='aviso-list__header'>
        <div>
          <h4>Avisos</h4>
          <p>
            Para ordenar: seleccione un aviso y arrastre hacia la posición
            deseada
          </p>
        </div>
        <div className='buttons-comunidad'>
          <Button type='primary'>
            <Link to='/'>Ver Avisos</Link>
          </Button>

          <Button type='primary' onClick={addAvisoModal}>
            <PlusOutlined />
            Crear Aviso
          </Button>
        </div>
      </div>

      <div className='aviso-list__items'>
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

function AvisoItem(props) {
  const { item, deleteAviso, editAvisoModal } = props;

  return (
    <List.Item
      actions={[
        <Button
          type='primary'
          title='Editar'
          onClick={() => editAvisoModal(item)}>
          <EditOutlined />
        </Button>,
        <Button
          type='danger'
          title='Eliminar'
          onClick={() => deleteAviso(item)}>
          <DeleteOutlined />
        </Button>,
      ]}>
      <List.Item.Meta title={item.title} description={item.description} />
    </List.Item>
  );
}
