import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { NavLink as Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import moment from "moment";
import "moment/locale/es";
// import queryString from "query-string";
// import { withRouter } from "react-router-dom";

// --- API ---
import { getMisaInfoApi } from "../../../api/registroMisa";

// --- Components ---
import MisaTable from "../../../components/Admin/RegistroMisas/MisaTable";
import AddEditMisaInfo from "../../../components/Admin/RegistroMisas/AddEditMisaInfo";
import Modal from "../../../components/Modal";
import { notification, Empty, Alert, Button } from "antd";
import {
  CheckCircleFilled,
  PlusOutlined,
  TeamOutlined,
} from "@ant-design/icons";

import "./RegistroMisas.scss";

export default function AdminRegistroMisas(props) {
  const { user } = useAuth();
  const [misaData, setMisaData] = useState([]);
  const [reloadMisaData, setReloadMisaData] = useState(false);

  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    getMisaInfoApi()
      .then((response) => {
        if (response?.code !== 200) {
          notification["warning"]({ message: response.message });
        } else {
          const newArray = [];
          response.misa.forEach((element) => {
            {
              element.dom
                ? (element.domIcon = (
                    <CheckCircleFilled style={{ color: "#07AE23" }} />
                  ))
                : (element.domIcon = "-");
            }
            {
              element.lun
                ? (element.lunIcon = (
                    <CheckCircleFilled style={{ color: "#07AE23" }} />
                  ))
                : (element.lunIcon = "-");
            }
            {
              element.mar
                ? (element.marIcon = (
                    <CheckCircleFilled style={{ color: "#07AE23" }} />
                  ))
                : (element.marIcon = "-");
            }
            {
              element.mie
                ? (element.mieIcon = (
                    <CheckCircleFilled style={{ color: "#07AE23" }} />
                  ))
                : (element.mieIcon = "-");
            }
            {
              element.jue
                ? (element.jueIcon = (
                    <CheckCircleFilled style={{ color: "#07AE23" }} />
                  ))
                : (element.jueIcon = "-");
            }
            {
              element.vie
                ? (element.vieIcon = (
                    <CheckCircleFilled style={{ color: "#07AE23" }} />
                  ))
                : (element.vieIcon = "-");
            }
            {
              element.sab
                ? (element.sabIcon = (
                    <CheckCircleFilled style={{ color: "#07AE23" }} />
                  ))
                : (element.sabIcon = "-");
            }
            element.hour = moment(element.hour).format("LT");
            {
              element.categoria === "Normal"
                ? (element.date = "-")
                : (element.date = moment(element.date).format("ddd DD/MMM/YY"));
            }

            newArray.push(element);
          });
          setMisaData(newArray);
        }
      })
      .catch((err) => {
        notification["error"]({
          message: "Error al conectarse a la base de datos (mi:002)." + err,
        });
      });

    setReloadMisaData(false);
  }, [reloadMisaData]);

  const addMisa = () => {
    setIsVisibleModal(true);
    setModalTitle("Agregar Horario de Misa para Registro");
    setModalContent(
      <AddEditMisaInfo
        setIsVisibleModal={setIsVisibleModal}
        setReloadMisaData={setReloadMisaData}
      />
    );
  };

  if (user.role === "colaborador externo") {
    return (
      <div className='no-autorizado'>
        <Alert
          message='Solo los Administradores y Editores pueden ver la información de registro para Celebraciones Eucarísticas en el Panel
          de Administración'
          type='error'
          showIcon
        />
        <p>
          Tu perfil está configurado cómo:{"  "}
          <strong>{user.role.toUpperCase()}</strong>
        </p>

        <Empty />
      </div>
    );
  } else {
    if (!misaData) {
      return (
        <div className='messages-empty'>
          <h3>Usuarios Registrados a Celebraciones Eucarísticas</h3>
          <Empty />
        </div>
      );
    }

    return (
      <>
        <Helmet>
          <title>
            Admin | Usuarios Registrados a Celebraciones Eucarísticas
          </title>
          <meta
            name='admin-usuarios-registrados'
            content='Admin | Usuarios Registrados a Celebraciones Eucarísticas'
            data-react-helmet='true'
          />
        </Helmet>

        <div className='registro-misas'>
          <div className='registro-misas__header'>
            <div>
              <h3>Misas Activas para Registro</h3>
              <ul>
                <li>Las misas normales son las misas con horario cotidiano</li>
                <li>
                  Las misas especiales son las que requieren{" "}
                  <strong>horario diferente y fecha única</strong>, p.ej: Misa
                  de Navidad
                </li>

                <li>
                  Para evitar errores, <strong>EVITA DUPLICAR HORAS</strong>{" "}
                  para un día
                </li>
              </ul>
            </div>

            <div className='buttons-registro'>
              <Link to='/admin/registrados'>
                <Button type='danger'>
                  <TeamOutlined />
                  Usuarios Registrados
                </Button>
              </Link>
              <Button type='primary' onClick={addMisa}>
                <PlusOutlined />
                Agregar Misa
              </Button>
            </div>
          </div>

          <MisaTable
            misaData={misaData}
            setReloadMisaData={setReloadMisaData}
            setIsVisibleModal={setIsVisibleModal}
            setModalTitle={setModalTitle}
            setModalContent={setModalContent}
          />
        </div>

        <Modal
          title={modalTitle}
          isVisible={isVisibleModal}
          setIsVisible={setIsVisibleModal}
          width='50%'>
          {modalContent}
        </Modal>
      </>
    );
  }
}
