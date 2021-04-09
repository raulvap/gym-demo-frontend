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
// import Newsletter from "../Newsletter";

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
            <div className="footer__card1">
               <Link to="/">
                  <img src={Logo} alt="logo Eclesia Demo" />
               </Link>
               <a href={dataMapsLink} target="_blank" rel="noopener noreferrer">
                  <EnvironmentOutlined />
                  {direccion}
               </a>
               <a href={dataTelefonoLink}>
                  <PhoneOutlined />
                  {phone}
               </a>
            </div>
            <div className="footer__card3">
               <Link to="/intenciones">
                  Intenciones y<br />
                  Donativos
               </Link>
            </div>

            <div className="footer__card2">
               <h3>Nos puedes encontrar en:</h3>
               <SocialLinks />
            </div>
         </div>

         <Link to="/admin">Iniciar Sesión Admin</Link>

         <Copyright />
      </Footer>
   );

   // return (
   //   <Footer className="footer">
   //     <Row>
   //       <Col md={4} />
   //       <Col md={16}>
   //         <Row>
   //           <Col md={8}>
   //             <MyInfo />
   //           </Col>
   //           <Col md={8}>
   //             <NavigationFooter />
   //           </Col>
   //           <Col md={8}>
   //             <Newsletter />
   //           </Col>
   //         </Row>
   //         <Row className="footer__copyright">
   //           <Col md={12}>© 2019 ALL RIGHTS RESERVED​</Col>
   //           <Col md={12}>AGUSTÍN NAVARRO GALDON | DESARROLLADOR WEB</Col>
   //         </Row>
   //       </Col>
   //       <Col md={4} />
   //     </Row>
   //   </Footer>
   // );
}
