import React, { useState, useEffect } from "react";
import { NavLink as Link } from "react-router-dom";
import ScrollAnimation from "react-animate-on-scroll";
import moment from "moment";
import "moment/locale/es";

// --- API ---
import { getHorarioApi } from "../../../api/horarios";

// --- COMPONENTS ---
import { MdTouchApp } from "react-icons/md";
import { List, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { dataParroquia } from "../../../utils/dataVariables";

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
            <h2 style={{ textAlign: "center", padding: "25px" }}>¡Bienvenido a {dataParroquia}!</h2>
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
                  renderItem={(item) => <HomeHorarioCard key={item._id} item={item} />}
               />
            </div>

            <h4 className="actualizacion">
               Última actualización de horarios:
               <br />
               {moment(lastUpdate).format("LL")}
            </h4>

            <Link className="horarios-mas" to="/calendario">
               <MdTouchApp /> Para registrarse a una clase
            </Link>
         </div>
      );
   }
}

function HomeHorarioCard(props) {
   const { item } = props;

   const newDescripcion = item.description.split("\n").map((str) => (
      <span>
         {str}
         <br />
      </span>
   ));

   return (
      <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
         <div className="home-horarios__card">
            <h2>{item.title}</h2>
            <p>{newDescripcion}</p>
         </div>
      </ScrollAnimation>
   );
}
