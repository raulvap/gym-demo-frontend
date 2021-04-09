import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
   UserOutlined,
   CommentOutlined,
   CarryOutOutlined,
   ClockCircleOutlined,
   ReadOutlined,
   InfoCircleOutlined,
   AppstoreOutlined,
   BellOutlined,
   SettingOutlined,
   HeartOutlined,
   CalendarOutlined,
   HomeOutlined,
} from "@ant-design/icons";

import "./MenuSider.scss";

function MenuSider(props) {
   const { menuCollapsed, location } = props;
   const { Sider } = Layout;

   return (
      <Sider width={240} className="admin-sider" collapsed={menuCollapsed}>
         <Menu
            mode="inline"
            defaultSelectedKeys={[location.pathname]}
            // defaultSelectedKeys={["/admin"]}
         >
            <Menu.Item key="/admin">
               <Link to="/admin">
                  <HomeOutlined />
                  <span className="nav-text">Home</span>
               </Link>
            </Menu.Item>

            <Menu.Item>
               <Link to="/admin/usuarios">
                  <UserOutlined />
                  {/* <img
              src='https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/S0U5ECzYUSu.png'
              alt='users'
            />  */}
                  <span className="nav-text">Usuarios</span>
               </Link>
            </Menu.Item>

            <Menu.Item>
               <Link to="/admin/registro">
                  <CarryOutOutlined />
                  <span className="nac-text">Registros para Misas</span>
               </Link>
            </Menu.Item>

            <Menu.Item>
               <Link to="/admin/mensajes">
                  <CommentOutlined />
                  <span className="nav-text">Mensajes Recibidos</span>
               </Link>
            </Menu.Item>

            <Menu.Item>
               <Link to="/admin/avisos">
                  <BellOutlined />
                  <span className="nav-text">Avisos</span>
               </Link>
            </Menu.Item>

            {/* <Menu.Item>
          <Link to='/admin/intenciones'>
            <HeartOutlined />
            <span className='nac-text'>Intenciones</span>
          </Link>
        </Menu.Item> */}

            <Menu.Item>
               <Link to="/admin/horarios">
                  <ClockCircleOutlined />
                  <span className="nac-text">Horarios</span>
               </Link>
            </Menu.Item>

            <Menu.Item>
               <Link to="/admin/servicios">
                  <SettingOutlined />
                  <span className="nac-text">Servicios</span>
               </Link>
            </Menu.Item>

            <Menu.Item>
               <Link to="/admin/comunidades">
                  <AppstoreOutlined />
                  <span className="nac-text">Comunidad</span>
               </Link>
            </Menu.Item>

            <Menu.Item>
               <Link to="/admin/calendario">
                  <CalendarOutlined />
                  <span className="nac-text">Eventos</span>
               </Link>
            </Menu.Item>

            <Menu.Item>
               <Link to="/admin/blog">
                  <ReadOutlined />
                  <span className="nac-text">Blog | Publicaciones</span>
               </Link>
            </Menu.Item>

            <Menu.Item>
               <Link to="/admin/info">
                  <InfoCircleOutlined />
                  <span className="nac-text">Info Parroquia</span>
               </Link>
            </Menu.Item>

            {/* <Menu.Item>
          <Link to='/admin/courses'>
            <BookOutlined />
            <span className='nac-text'>Cursos</span>
          </Link>
        </Menu.Item> */}
         </Menu>

         <div className="contacto-eclesia">
            {/* <Link to='/reportar-error'>Reportar un Error</Link> */}
            <Link to="/reportar-error">Contacto con Eclesia Digital</Link>
         </div>
      </Sider>
   );
}

export default withRouter(MenuSider);
