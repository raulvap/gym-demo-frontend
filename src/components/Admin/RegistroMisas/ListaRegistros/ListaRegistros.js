import React, { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/es";

// --- API ---
import { getAccessTokenApi } from "../../../../api/auth";
import {
  getRegistrosAdminApi,
  deleteRegistrosAdminApi,
} from "../../../../api/registroMisa";

// --- COMPONENTS ---
import { Spin, Button, Empty, notification, Modal as AntdModal } from "antd";
import {
  LoadingOutlined,
  FilePdfFilled,
  DeleteFilled,
  CloseOutlined,
  FilterFilled,
} from "@ant-design/icons";
import generatePDF from "./ExportPDF";
import AddFilterModal from "./AddFilterModal";
import Modal from "../../../Modal";

import "./ListaRegistros.scss";
const { confirm } = AntdModal;

export default function ListaRegistros() {
  const [registros, setRegistros] = useState([]);
  const [tableFilter, setTableFilter] = useState([]);
  const [reloadTable, setReloadTable] = useState(false);
  const [filter, setFilter] = useState({});
  const [countRegistros, setCountRegistros] = useState(0);
  let dateToday = new Date();
  dateToday = moment(dateToday).subtract(24, "hours");

  // ---Modal ---
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  //server get registros:
  useEffect(() => {
    const token = getAccessTokenApi();

    getRegistrosAdminApi(token)
      .then((response) => {
        if (response.code !== 200) {
          notification["warning"]({ message: response.message });
        } else {
          setRegistros(response.registros.docs);
          console.log("LLAMADA AL SERV!!!!");
          setFilter({});
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setReloadTable(false);
  }, [reloadTable]);

  //setTable with filters:
  useEffect(() => {
    const temporalArray = [];

    registros.forEach((item) => {
      if (moment(item.eventDate).isBefore(dateToday)) {
        item.isPrevious = true;
      }

      if (item.confirm === false || item.confirm === "No") {
        item.confirm = "No";
      } else {
        item.confirm = "Confirmado";
      }

      if (!filter.categoria) {
        temporalArray.push(item);
      } else {
        if (filter.categoria === "Normal") {
          //aqui va a verificar que sea normal

          if (
            item.day === filter.day &&
            item.month === filter.month &&
            item.year === filter.year &&
            item.categoria === filter.categoria &&
            item.hour === filter.hour
          ) {
            temporalArray.push(item);
          }
        } else {
          if (filter.categoria === "Especial") {
            //aqui va a filtar los especiales
            if (
              item.day === filter.day &&
              item.month === filter.month &&
              item.year === filter.year &&
              item.categoria === filter.categoria &&
              item.hour === filter.hour &&
              item.eventName === filter.eventName
            ) {
              temporalArray.push(item);
            }
          }
        }
      }
    });

    var counter = 0;
    temporalArray.forEach((item) => {
      counter = counter + item.seats;
    });
    setCountRegistros(counter);
    setTableFilter(temporalArray);
  }, [filter]);

  const setFilterModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Filtrar Registros");
    setModalContent(
      <AddFilterModal
        setFilter={setFilter}
        setIsVisibleModal={setIsVisibleModal}
        setCountRegistros={setCountRegistros}
      />
    );
  };

  const removeFilter = () => {
    setCountRegistros(0);
    setFilter({});
  };

  const deleteRegistros = () => {
    confirm({
      title: "Eliminar Registros Anteriores",
      content: `¿Estas seguro de eliminar los registros anteriores a ${moment(
        dateToday
      ).format("ddd DD/MMM/YY")}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        const temporalArrayPrevious = [];
        registros.forEach((item) => {
          if (item.isPrevious) {
            temporalArrayPrevious.push(item._id);
          }
        });

        if (temporalArrayPrevious.length === 0) {
          notification["error"]({ message: "No hay registros a eliminar" });
        } else {
          const token = getAccessTokenApi();
          deleteRegistrosAdminApi(token, temporalArrayPrevious)
            .then((response) => {
              if (response.code !== 200) {
                notification["warning"]({ message: response.message });
              } else {
                notification["success"]({ message: response.message });
                setCountRegistros(0);
                setReloadTable(true);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      },
    });
  };

  if (!registros) {
    return (
      <Spin
        indicator={antIcon}
        tip='Cargando Registros...'
        className='blog-spin'
        style={{ width: "100%", padding: "200px 10px" }}
      />
    );
  }

  return (
    <div className='lista-registros'>
      <div className='lista-registros__header'>
        <div>
          <h1>Lista de Personas Registradas para Misa</h1>
          <h4>Personas Registradas: {countRegistros}</h4>
        </div>
        <div className='lista-registos-buttons'>
          <Button type='danger' onClick={() => generatePDF(tableFilter)}>
            <FilePdfFilled />
            Exportar a PDF
          </Button>

          <Button type='primary' onClick={setFilterModal}>
            <FilterFilled />
            Filtrar Registros
          </Button>
          <Button type='primary' onClick={removeFilter}>
            <CloseOutlined /> Quitar Filtros
          </Button>
          <Button type='danger' onClick={deleteRegistros}>
            <DeleteFilled />
            Eliminar Registros Anteriores
          </Button>
        </div>
      </div>
      <RegistrosTable tableFilter={tableFilter} />

      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
        // width='60%'
      >
        {modalContent}
      </Modal>
    </div>
  );
}

function RegistrosTable(props) {
  const { tableFilter } = props;

  return (
    <div className='lista-registros__table'>
      {tableFilter.length === 0 ? (
        <Empty />
      ) : (
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>Fecha</th>
              <th scope='col'>Hora</th>
              <th scope='col'>Misa</th>
              <th scope='col'>Asignados</th>
              <th scope='col'>Lugares</th>
              <th scope='col'>Nombre</th>

              {/* <th scope='col'>Confirm</th> */}
              <th scope='col'>Email</th>
              <th scope='col'>Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {tableFilter.map((item) => (
              <tr key={item._id}>
                <td>{moment(item.eventDate).format("ddd DD/MMM/YY")}</td>
                <td>{item.hour}</td>
                <td>{item.eventName}</td>
                <td>
                  {item.currentSeats} - {item.currentSeats + item.seats - 1}
                </td>
                <td>{item.seats}</td>
                <td>{item.name}</td>
                {/* <td>{item.confirm}</td> */}
                <td>{item.email}</td>
                <td>{item.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
