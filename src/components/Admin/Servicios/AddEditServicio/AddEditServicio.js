import React, { useState, useEffect } from "react";

// --- API ---
import { addServicioApi, updateServicioApi } from "../../../../api/servicios";
import { getAccessTokenApi } from "../../../../api/auth";

// --- Components ---
import { Form, Input, Button, notification } from "antd";
import {
   SettingOutlined,
   InfoCircleOutlined,
   LinkOutlined,
   CaretRightOutlined,
} from "@ant-design/icons";
import { BiChurch } from "react-icons/bi";

import "./AddEditServicio.scss";

const { TextArea } = Input;

export default function AddEditServicio(props) {
   const { setIsVisibleModal, setReloadServicios, servicio } = props;
   const [servicioData, setServicioData] = useState({});

   useEffect(() => {
      servicio ? setServicioData(servicio) : setServicioData({});
   }, [servicio]);

   const addServicio = (e) => {
      e.preventDefault();

      if (!servicioData.title || !servicioData.section || !servicioData.description) {
         notification["error"]({
            message: "Se requiere Nombre, Sección y Descripción para agregar el servicio",
         });
      } else {
         const accessToken = getAccessTokenApi();

         servicioData.order = 100;
         addServicioApi(accessToken, servicioData)
            .then((response) => {
               notification["success"]({
                  message: "Servicio creado exitosamente",
               });
               setIsVisibleModal(false);
               setReloadServicios(true);
               setServicioData({});
            })
            .catch((err) => {
               notification["error"]({ message: "Error en el servidor (s:001" });
            });
      }
   };

   const editServicio = (event) => {
      event.preventDefault();

      const accessToken = getAccessTokenApi();
      updateServicioApi(accessToken, servicioData._id, servicioData)
         .then((response) => {
            notification["success"]({
               message: response.message,
            });
            setIsVisibleModal(false);
            setReloadServicios(true);
         })
         .catch(() => {
            notification["error"]({
               message: "Error del servidor (s:003)",
            });
         });
   };

   return (
      <div className="add-edit-servicio">
         <AddEditForm
            servicio={servicio}
            servicioData={servicioData}
            setServicioData={setServicioData}
            addServicio={addServicio}
            editServicio={editServicio}
         />
      </div>
   );
}

function AddEditForm(props) {
   const { servicio, servicioData, setServicioData, addServicio, editServicio } = props;

   return (
      <Form className="form-add-edit" onFinish={servicio ? editServicio : addServicio}>
         <Form.Item>
            <Input
               prefix={<SettingOutlined style={{ color: "#95A5A6" }} />}
               name="servicio"
               placeholder="Nombre de la Instalación"
               value={servicioData.title}
               onChange={(e) => setServicioData({ ...servicioData, title: e.target.value })}
            />
         </Form.Item>
         <Form.Item>
            <Input
               prefix={<CaretRightOutlined style={{ color: "#95A5A6" }} />}
               name="section"
               placeholder="Sección"
               value={servicioData.section}
               onChange={(e) => setServicioData({ ...servicioData, section: e.target.value })}
            />
         </Form.Item>
         <Form.Item>
            <Input
               prefix={<LinkOutlined style={{ color: "#95A5A6" }} />}
               name="image-service"
               placeholder="URL de imágen de portada"
               value={servicioData.url}
               onChange={(e) => setServicioData({ ...servicioData, url: e.target.value })}
            />
         </Form.Item>
         <Form.Item>
            <Input
               prefix={<InfoCircleOutlined style={{ color: "#95A5A6" }} />}
               name="additionalinfo"
               placeholder="Información adicional"
               value={servicioData.additionalinfo}
               onChange={(e) =>
                  setServicioData({ ...servicioData, additionalinfo: e.target.value })
               }
            />
         </Form.Item>
         <Form.Item>
            <TextArea
               rows={6}
               placeholder="Escribe una descripción"
               value={servicioData.description}
               onChange={(e) => setServicioData({ ...servicioData, description: e.target.value })}
            />
         </Form.Item>
         <Form.Item>
            <Button
               type="primary"
               htmlType="submit"
               className="btn-submit"
               onClick={servicio ? editServicio : addServicio}
            >
               {servicio ? "Actualizar Información" : "Crear Información"}
            </Button>
         </Form.Item>
      </Form>
   );
}
