import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getComunidadesApi } from "../../../api/comunidad";

import { Button } from "antd";
import { EditOutlined, UserAddOutlined } from "@ant-design/icons";
import { FaWhatsapp } from "react-icons/fa";
import AddEditInfo from "./AddEditInfo";
import ColaboradoresAdmin from "./Colaboradores";
import DonativosAdmin from "./Donativo";
import Modal from "../../Modal";
import { dataParroquia } from "../../../utils/dataVariables";

import "./InfoParroquia.scss";

export default function InfoParroquia() {
   const [comunidades, setComunidades] = useState([]);
   const [reloadInfoParroquia, setReloadInfoParroquia] = useState(false);

   var type = "";

   // --- Modal:
   const [isVisibleModal, setIsVisibleModal] = useState(false);
   const [modalTitle, setModalTitle] = useState("");
   const [modalContent, setModalContent] = useState(null);

   useEffect(() => {
      getComunidadesApi().then((response) => {
         setComunidades(response.comunidad);
         setReloadInfoParroquia(false);
      });
   }, [reloadInfoParroquia]);

   const addColaborador = () => {
      type = "colaborador";
      setIsVisibleModal(true);
      setModalTitle("Agregar Colaborador");
      setModalContent(
         <AddEditInfo
            setIsVisibleModal={setIsVisibleModal}
            setReloadInfoParroquia={setReloadInfoParroquia}
            type={type}
         />
      );
   };

   const addDonativo = () => {
      type = "donativo";
      setIsVisibleModal(true);
      setModalTitle("Agregar Información de Donativos");
      setModalContent(
         <AddEditInfo
            setIsVisibleModal={setIsVisibleModal}
            setReloadInfoParroquia={setReloadInfoParroquia}
            type={type}
         />
      );
   };

   return (
      <div className="info-parroquia">
         <div className="info-parroquia__eclesia">
            <h3>Información de la Cuenta en Desarrollo 29</h3>
            <ul>
               <li>
                  Gimnasio: {"  "}
                  <strong>{dataParroquia}</strong>
               </li>
               <li>
                  Número de Cuenta:{"  "} <strong>SAGCO2105</strong>
               </li>
               <li>
                  Contacto Principal:{"  "} <strong>Juan Pérez</strong>
               </li>

               <li>
                  Fecha de Renovación: {"  "}
                  <strong>1/mayo/2022</strong>
               </li>
            </ul>
            <p style={{ fontStyle: "italic", fontSize: "14px" }}>
               *Para renovaciones, cambiar datos o correcciones de la App, favor de mandar un
               mensaje en este <Link to="/reportar-error">formulario</Link>
            </p>
            <p>
               <b>Contacto Desarrollo 29:</b>
            </p>
            <ul>
               <li>info@desarrollo29.com</li>
               <li>
                  <a
                     href="https://wa.me/525616161396?text=¡Hola!%20Quiero%20..."
                     target="_blank"
                     rel="noopener noreferrer"
                  >
                     <strong>
                        <FaWhatsapp /> +52 56 1616 1396
                     </strong>
                  </a>
               </li>
            </ul>
         </div>
         {/* <div className="info-parroquia__info">
            <div className="info-parroquia__colaboradores">
               <div className="card-info-header">
                  <h3>Colaboradores</h3>
                  <Button type="primary" onClick={addColaborador}>
                     <UserAddOutlined />
                     Agregar Colaborador
                  </Button>
               </div>
               <ColaboradoresAdmin
                  comunidades={comunidades}
                  setIsVisibleModal={setIsVisibleModal}
                  setModalTitle={setModalTitle}
                  setModalContent={setModalContent}
                  setReloadInfoParroquia={setReloadInfoParroquia}
               />
            </div>
            <div className="info-parroquia__donativos">
               <div className="card-info-header">
                  <h3>Info donativos</h3>
                  <Button type="primary" onClick={addDonativo}>
                     <EditOutlined />
                     Agregar Información
                  </Button>
               </div>
               <DonativosAdmin
                  comunidades={comunidades}
                  setIsVisibleModal={setIsVisibleModal}
                  setModalTitle={setModalTitle}
                  setModalContent={setModalContent}
                  setReloadInfoParroquia={setReloadInfoParroquia}
               />
            </div>
         </div>

         <Modal title={modalTitle} isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}>
            {modalContent}
         </Modal> */}
      </div>
   );
}
