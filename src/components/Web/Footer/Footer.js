import React from "react";
import { NavLink as Link } from "react-router-dom";
import { Layout } from "antd";
import { EnvironmentOutlined, PhoneOutlined } from "@ant-design/icons";

import SocialLinks from "../SocialLinks";

import Copyright from "./Copyright";
import Logo from "../../../assets/img/svg/logo-blanco.svg";
import {
   dataDireccion,
   dataTelefono,
   dataTelefonoLink,
   dataMapsLink,
} from "../../../utils/dataVariables";

import "./Footer.scss";

export default function Footer() {
   const { Footer } = Layout;

   // cambiar telefonoLink
   const direccion = dataDireccion;
   const phone = dataTelefono;

   return (
      <Footer className="footer">
         {/* <div>
        <h2>Back to top</h2>
      </div> */}
         <div className="footer-info">
            <div className="card1">
               <Link to="/">
                  <img src={Logo} alt="logo" />
               </Link>
            </div>

            <div className="card2">
               <h3>Nos puedes encontrar en:</h3>
               <SocialLinks />
            </div>

            <div className="card3">
               <a href={dataMapsLink} target="_blank" rel="noopener noreferrer">
                  <EnvironmentOutlined />
                  {direccion}
               </a>
               <a href={dataTelefonoLink}>
                  <PhoneOutlined />
                  {phone}
               </a>
            </div>
         </div>

         <Link to="/admin">Iniciar Sesión Admin</Link>

         <Copyright />
      </Footer>
   );
}
