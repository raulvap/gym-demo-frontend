import React from "react";
import { NavLink as Link } from "react-router-dom";
import { Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined, PoweroffOutlined } from "@ant-design/icons";

import LogoBlanco from "../../../assets/img/svg/logo-blanco.svg";
import { logout } from "../../../api/auth";

import "./MenuTop.scss";

export default function MenuTop(props) {
   const { menuCollapsed, setMenuCollapsed, user } = props;

   const logoutUser = () => {
      logout();
      window.location.reload();
   };

   return (
      <div className="menu-top">
         <div className="menu-top__left">
            <Button type="link" onClick={() => setMenuCollapsed(!menuCollapsed)}>
               {menuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>

            <Link to="/">
               <img className="menu-top__left-logo" src={LogoBlanco} alt="Logo Parroquia Admin" />
            </Link>
         </div>
         <div className="menu-top__right">
            <h3>
               {user.name} {user.lastname}
            </h3>
            <Button type="link" title="Cerrar Sesión" onClick={logoutUser}>
               <PoweroffOutlined />
            </Button>
         </div>
      </div>
   );
}
