import React, { useState, useEffect } from "react";
import { NavLink as Link } from "react-router-dom";
import ScrollAnimation from "react-animate-on-scroll";
import moment from "moment";
import "moment/locale/es";

// --- API ---
import { getHorarioApi } from "../../../api/horarios";

// --- COMPONENTS ---
import { List, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { MdTouchApp } from "react-icons/md";
import { FaYoutube, FaFacebook } from "react-icons/fa";
import { youtubeLink, fbLinkPage, dataParroquia } from "../../../utils/dataVariables";

import "./HomeHorarios.scss";

export default function HomeHorarios() {
   const [horarioData, setHorarioData] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [lastUpdate, setLastUpdate] = useState(new Date());
   var widthScreen = window.innerWidth;

   const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

   useEffect(() => {
      getHorarioApi().then((response) => {
         const arrayHorario = [];
         response.horario.forEach((item) => {
            item.active && arrayHorario.push(item);
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
         setIsLoading(false);
      });
   }, []);

   let windowType = "";

   if (widthScreen <= 1030) {
      windowType = "small";
   } else {
      windowType = "large";
   }

   if (isLoading) {
      return (
         <>
            <h2 style={{ textAlign: "center", padding: "25px" }}>
               ¡Bienvenido a la página oficial de la {dataParroquia}!
            </h2>
            <Spin
               indicator={antIcon}
               tip="Cargando Información..."
               className="blog-spin"
               style={{ width: "100%", padding: "20px 10px" }}
            />
         </>
      );
   } else {
      return (
         <div>
            <div className="home-horarios">
               <List
                  dataSource={horarioData}
                  renderItem={(item) => <HomeHorarioCard item={item} />}
               />
            </div>

            <Link className="registro-link-inicio" to="/registro-misa">
               <MdTouchApp />
               Regístrate aqui para asistir a Misa
            </Link>

            <Link className="horarios-mas" to="/contacto">
               Ver Horarios Completos
            </Link>
            <h4 className="actualizacion">
               Última actualización:
               <br />
               {moment(lastUpdate).format("LL")}
            </h4>

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
                        href="fb:/ParroquiaSantaMariadeGuadalupeJardinesUniversidad"
                        className="home-facebook"
                     >
                        <FaFacebook />
                        Facebook
                     </a>
                  )}
               </div>
            </div>
         </div>
      );
   }
}

function HomeHorarioCard(props) {
   const { item } = props;

   const newDescripcion = item.description.split("\n").map((str) => (
      <p>
         {str}
         <br />
      </p>
   ));

   return (
      <ScrollAnimation animateIn="fadeIn" animateOnce={true} key={item._id}>
         <div className="home-horarios__card">
            <h2>{item.title}</h2>
            <p>{newDescripcion}</p>
         </div>
      </ScrollAnimation>
   );
}
