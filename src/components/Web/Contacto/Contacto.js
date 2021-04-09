import React, { useState, useEffect } from "react";
import { NavLink as Link } from "react-router-dom";
import ScrollAnimation from "react-animate-on-scroll";
import moment from "moment";
import "moment/locale/es";

// --- API ---
import { getHorarioApi } from "../../../api/horarios";

// --- Components ---
import FormContacto from "./FormContacto";
import Intenciones from "../Intenciones";
import Donativos from "../Intenciones/Donativos";
import { List } from "antd";
import { MdLocationOn, MdPhone, MdTouchApp } from "react-icons/md";
import { FaYoutube, FaFacebook } from "react-icons/fa";
import {
   dataDireccion,
   dataTelefono,
   dataTelefonoLink,
   dataMapsLink,
   youtubeLink,
   fbLinkPage,
   fbLinkPageMobile,
} from "../../../utils/dataVariables";
// import Horarios from "./Horarios";

import "./Contacto.scss";

export default function Contacto() {
   const [horarioData, setHorarioData] = useState([]);
   const [lastUpdate, setLastUpdate] = useState(new Date());
   var widthScreen = window.innerWidth;

   // cambiar telefonoLink
   const direccion = dataDireccion;
   const phone = dataTelefono;

   let windowType = "";

   if (widthScreen <= 1030) {
      windowType = "small";
   } else {
      windowType = "large";
   }

   useEffect(() => {
      getHorarioApi().then((response) => {
         const arrayHorario = [];
         response.horario.forEach((item) => {
            arrayHorario.push(item);
            if (!lastUpdate) {
               setLastUpdate(item.date);
            } else {
               if (lastUpdate > item.date) {
                  return null;
               } else {
                  setLastUpdate(item.date);
               }
            }
         });
         setHorarioData(arrayHorario);
      });
   }, []);

   return (
      <div className="contacto">
         {/* --- TELEFONOS --- */}

         <h2>Información de Contacto</h2>
         <div className="contacto__info">
            <a href={dataMapsLink} target="_blank" rel="noopener noreferrer" className="address">
               <MdLocationOn />
               {direccion}
            </a>
            <a href={dataTelefonoLink} className="phone">
               <MdPhone />
               {phone}
            </a>
         </div>

         {/* --- HORARIOS --- */}
         <h2>Horarios</h2>
         <Link className="registro-link-contacto" to="/registro-misa">
            <MdTouchApp />
            Regístrate aqui para asistir a Misa
         </Link>

         {/* --- EN VIVO --- */}
         <div className="home-envivo">
            <h3>Transmisión de Misa En Vivo</h3>
            <p>
               Podrás seguir las transmisiones <strong>En Vivo</strong> de la Parroquia en:
            </p>
            <div className="home-envivo__links">
               <a href={youtubeLink} className="home-youtube">
                  <FaYoutube /> YouTube
               </a>

               {windowType === "large" ? (
                  <a
                     // href='fb://page/Parroquia-San-Fco-Javier-de-Las-Colinas-502155349977513/'
                     href={fbLinkPage}
                     className="home-facebook"
                  >
                     <FaFacebook />
                     Facebook
                  </a>
               ) : (
                  <a
                     // href='fb://page/Parroquia-San-Fco-Javier-de-Las-Colinas-502155349977513/'
                     href={fbLinkPageMobile}
                     className="home-facebook"
                  >
                     <FaFacebook />
                     Facebook
                  </a>
               )}
            </div>
         </div>

         {/* --- LISTA HORARIOS ---  */}
         <div className="contacto__horarios">
            <List dataSource={horarioData} renderItem={(item) => <Horario item={item} />} />
         </div>
         <p style={{ fontStyle: "italic", marginBottom: "30px" }}>
            Ultima actualización
            <br />
            {moment(lastUpdate).format("LL")}
         </p>

         {/* --- INTENCIONES Y DONATIVOS --- */}
         <Intenciones />
         <Donativos />

         {/* --- FORM DE CONTACTO --- */}
         <FormContacto />
      </div>
   );
}

function Horario(props) {
   const { item } = props;

   const newDescripcion = item.description.split("\n").map((str) => (
      <p>
         {str}
         <br />
      </p>
   ));

   return (
      <ScrollAnimation animateIn="fadeIn" animateOnce={true} offset={100}>
         <div className="cardHorario">
            <h3>{item.title}</h3>

            <p>{newDescripcion}</p>
            <br />
         </div>
      </ScrollAnimation>
   );
}
