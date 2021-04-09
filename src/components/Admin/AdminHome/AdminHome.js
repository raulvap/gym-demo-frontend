import React from "react";

import { Calendar, List } from "antd";
import {
   UserOutlined,
   CarryOutOutlined,
   CommentOutlined,
   BellOutlined,
   ClockCircleOutlined,
   SettingOutlined,
   AppstoreOutlined,
   CalendarOutlined,
   ReadOutlined,
   InfoCircleOutlined,
} from "@ant-design/icons";
import { dataParroquia } from "../../../utils/dataVariables";

import "./AdminHome.scss";

export default function AdminHome() {
   const data = [
      {
         title: "Usuarios",
         description:
            "Sección solo para Administradores de la App, en donde podrán dar de alta nuevos usuarios para colaborar en la edición de la página. Los perfiles de los usuarios son: Administrador, Editor, Colaborador Externo",
         icon: <UserOutlined />,
      },
      {
         title: "Perfil Administrador",
         description:
            "Este perfil podrá agregar, editar o eliminar Usuarios adicionales, y hacer uso de todas las funciones de la App",
         icon: <UserOutlined className="perfil" />,
      },
      {
         title: "Perfil Editor",
         description:
            "Este perfil podrá hacer uso de todas las funciones de la App pero no podrá agregar, editar o eliminar usuarios",
         icon: <UserOutlined className="perfil" />,
      },
      {
         title: "Perfil Colaborador Externo",
         description:
            'Este perfil solo podrá hacer uso de las secciones de "Comunidad", "Eventos" y "Blog | Publicaciones", para poder agregar información relacionada a los Grupos Parroquiales, información de eventos próximos o crear publicaciones en el Blog ',
         icon: <UserOutlined className="perfil" />,
      },
      {
         title: "Registros para Misas",
         description:
            "En esta sección, podrás definir los horarios de misa, tanto de diario, como Misas especiales que tienen una fecha y horario específico (por ejemplo: Misa de Vigilia Pascual), para controlar el acceso a la misa las personas se tendrán que registrar. Aqui también podrás descargar el listado de las personas registradas a cada Misa.",
         icon: <CarryOutOutlined />,
      },
      {
         title: "Mensajes Recibidos",
         description: "Aqui podrás ver los mensajes que llegan desde la página web",
         icon: <CommentOutlined />,
      },
      {
         title: "Avisos",
         description: "Aqui podrás crear los avisos que se muestran en la página de inicio",
         icon: <BellOutlined />,
      },
      {
         title: "Horarios",
         description:
            "Aqui podrás crear los horarios de la parroquia. Los que estén activados, se mostrarán en la página de inicio",
         icon: <ClockCircleOutlined />,
      },
      {
         title: "Servicios",
         description:
            "Aqui podrás crear y editar los servicios de la Parroquia, separados por la sección que definas ",
         icon: <SettingOutlined />,
      },
      {
         title: "Comunidad",
         description:
            "En esta sección, podrás crear una tarjeta para cada Grupo Parroquial, con su información de horarios y link a redes sociales",
         icon: <AppstoreOutlined />,
      },
      {
         title: "Eventos",
         description:
            "En esta sección, podrás crear la información de eventos próximos, junto con un link de registro previamente creado en Google Forms",
         icon: <CalendarOutlined />,
      },
      {
         title: "Blog | Publicaciones",
         description:
            "En esta sección, publicar artículos y publicaciones. Los más recientes se publican también en la página de inicio",
         icon: <ReadOutlined />,
      },
      {
         title: "Info Parroquia",
         description:
            "Aqui podrás editar la información de las personas colaboradoras de la Parroquia que se muestran en la sección de Comunidad. También podrás editar la información de Donativos",
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
            <h2>Eclesia Digital</h2>
            <h4>
               "Nuestro apostolado es acercar la tecnología digital a cada Parroquia para facilitar
               la comunicación con su comunidad"
            </h4>
         </div>
         <div className="content">
            <div className="content__cards">
               <h3>Acerca de la App</h3>
               <List
                  itemLayout="horizontal"
                  dataSource={data}
                  renderItem={(item) => (
                     <List.Item>
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
