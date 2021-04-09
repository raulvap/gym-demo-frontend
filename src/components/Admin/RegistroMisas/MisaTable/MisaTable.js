import React from "react";
// import moment from "moment";
import "moment/locale/es";

// --- API ---
import {
  deleteMisaInfoApi,
  activateMisaInfoApi,
} from "../../../../api/registroMisa";
import { getAccessTokenApi } from "../../../../api/auth";

// --- COMPONENTS ---
import AddEditMisaInfo from "../AddEditMisaInfo";
import { Modal as ModalAntd, notification, Table, Button, Switch } from "antd";
import { EditFilled, DeleteFilled } from "@ant-design/icons";

// --- Styles ---
import "./MisaTable.scss";

const { confirm } = ModalAntd;
const { Column } = Table;

export default function MisaTable(props) {
  const {
    misaData,
    setReloadMisaData,
    setIsVisibleModal,
    setModalTitle,
    setModalContent,
  } = props;

  const deleteMisaInfo = (misaInfo) => {
    const accessToken = getAccessTokenApi();

    confirm({
      title: "Eliminar Horario",
      content: `¿Estás seguro de eliminar este horario ${misaInfo.categoria}, ${
        misaInfo.name ? misaInfo.name : ""
      } ${misaInfo.hour}? \nLos registros asociados a esta misa se perderán`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteMisaInfoApi(accessToken, misaInfo._id)
          .then((response) => {
            const typeNotification =
              response.code === 200 ? "success" : "warning";
            notification[typeNotification]({
              message: response.message,
            });
            setReloadMisaData(true);
          })
          .catch(() => {
            notification["error"]({
              message: "Error del servidor. (mi:004)",
            });
          });
      },
    });
  };

  const editMisaInfo = (misaInfo) => {
    setIsVisibleModal(true);
    setModalTitle(
      `Editar Registro: ${misaInfo.categoria}, ${
        misaInfo.name ? misaInfo.name : ""
      } ${misaInfo.hour} `
    );
    setModalContent(
      <AddEditMisaInfo
        misaData={misaInfo}
        setIsVisibleModal={setIsVisibleModal}
        setReloadMisaData={setReloadMisaData}
      />
    );
  };

  const activateMisaInfo = (misaInfo, status) => {
    const accessToken = getAccessTokenApi();

    activateMisaInfoApi(accessToken, misaInfo._id, status)
      .then((response) => {
        const typeNotification = response.code === 200 ? "success" : "warning";

        notification[typeNotification]({
          message: response.message,
        });

        setReloadMisaData(true);
      })
      .catch((err) => {
        notification["error"]({
          message: err,
        });
      });
  };

  return (
    <div className='misa-table'>
      <Table
        //  columns={columns}
        dataSource={misaData}
        pagination={{ position: ["bottomCenter", "bottomCenter"] }}>
        <Column title='Categoria' dataIndex='categoria' key='categoria' />
        <Column title='Misa Especial' dataIndex='name' key='name' />
        <Column title='Fecha' dataIndex='date' key='date' />
        <Column title='Hora' dataIndex='hour' key='hour' />
        <Column title='Total Lugares' dataIndex='maxSeats' key='maxSeats' />

        <Column title='Dom' dataIndex='domIcon' key='dom' />
        <Column title='Lun' dataIndex='lunIcon' key='lun' />
        <Column title='Mar' dataIndex='marIcon' key='mar' />
        <Column title='Mie' dataIndex='mieIcon' key='mie' />
        <Column title='Jue' dataIndex='jueIcon' key='jue' />
        <Column title='Vie' dataIndex='vieIcon' key='vie' />
        <Column title='Sab' dataIndex='sabIcon' key='sab' />
        <Column
          title='Activar'
          key='activar'
          render={(text, record) => (
            <Switch
              defaultChecked={record.active}
              onChange={(e) => activateMisaInfo(record, e)}
            />
          )}
        />
        <Column
          title='Editar'
          key='edit'
          render={(text, record) => (
            <Button type='primary' onClick={() => editMisaInfo(record)}>
              <EditFilled />
            </Button>
          )}
        />
        <Column
          title='Eliminar'
          key='delete'
          render={(text, record) => (
            <Button type='danger' onClick={() => deleteMisaInfo(record)}>
              <DeleteFilled />
            </Button>
          )}
        />
      </Table>
    </div>
  );
}
