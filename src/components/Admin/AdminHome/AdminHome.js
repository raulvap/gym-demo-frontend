import React from "react";

import { Calendar, List } from "antd";
import {
   UserOutlined,
   CommentOutlined,
   BellOutlined,
   ClockCircleOutlined,
   SettingOutlined,
   AppstoreAddOutlined,
   CalendarOutlined,
   ReadOutlined,
   InfoCircleOutlined,
} from "@ant-design/icons";
import { dataParroquia } from "../../../utils/dataVariables";

import "./AdminHome.scss";

export default function AdminHome() {
   const data = [
      {
         key: "001",
         title: "Usuarios",
         description:
            "Sección solo para Administradores de la App, en donde podrán dar de alta nuevos usuarios para colaborar en la edición de la página. Los perfiles de los usuarios son: Administrador, Editor, Colaborador Externo",
         icon: <UserOutlined />,
      },
      {
         key: "002",
         title: "Perfil Administrador",
         description:
            "Este perfil podrá agregar, editar o eliminar Usuarios adicionales, y hacer uso de todas las funciones de la App",
         icon: <UserOutlined className="perfil" />,
      },
      {
         key: "003",
         title: "Perfil Editor",
         description:
            "Este perfil podrá hacer uso de todas las funciones de la App pero no podrá agregar, editar o eliminar usuarios",
         icon: <UserOutlined className="perfil" />,
      },

      {
         key: "005",
         title: "Mensajes Recibidos",
         description: "Aqui podrás ver los mensajes que llegan desde la página web",
         icon: <CommentOutlined />,
      },
      {
         key: "006",
         title: "Avisos",
         description: "Aqui podrás crear los avisos que se muestran en la página de inicio",
         icon: <BellOutlined />,
      },
      {
         key: "007",
         title: "Horarios",
         description:
            "Aqui podrás crear todos los horarios del gimnasio, los cuales se mostrarán en la página de inicio",
         icon: <ClockCircleOutlined />,
      },
      {
         key: "008",
         title: "Instalaciones",
         description:
            "Aqui podrás crear y editar las instalaciones del gimnasio, separados por la sección que definas ",
         icon: <AppstoreAddOutlined />,
      },

      {
         key: "010",
         title: "Eventos | Clases",
         description:
            "En esta sección, podrás crear la información de eventos próximos, junto con un link de registro previamente creado en Google Forms",
         icon: <CalendarOutlined />,
      },
      {
         key: "011",
         title: "Blog | Publicaciones",
         description:
            "En esta sección, publicar artículos, noticias, información, etc. Los más recientes se publican también en la página de inicio",
         icon: <ReadOutlined />,
      },
      {
         key: "012",
         title: "Info Parroquia",
         description: "Información de la cuenta con Desarrollo29",
         icon: <InfoCircleOutlined />,
      },
   ];

   return (
      <div className="admin-home">
         <div className="admin-home__title">
            <p>Bienvenido</p>

            <h1>{dataParroquia}</h1>
         </div>

         <div className="admin-home__eclesia">
            <p>Web App desarrollada por:</p>
            <h2>Desarrollo 29</h2>
            <h4>
               "Nuestra misión es brindar soluciones digitales y tecnologícas para potenciar el
               crecimiento de cada negocio"
            </h4>
         </div>
         <div className="content">
            <div className="content__cards">
               <h3>Acerca de la App</h3>
               <List
                  itemLayout="horizontal"
                  dataSource={data}
                  renderItem={(item) => (
                     <List.Item key={item.key}>
                        <List.Item.Meta
                           avatar={item.icon}
                           title={item.title}
                           description={item.description}
                        />
                     </List.Item>
                  )}
               />
            </div>
            <div className="content__calendar">
               <Calendar fullscreen={false} />
            </div>
         </div>
      </div>
   );
}
