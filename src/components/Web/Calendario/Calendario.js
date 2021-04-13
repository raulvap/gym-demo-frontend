import React, { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/es";
import ScrollAnimation from "react-animate-on-scroll";

// --- API ---
import { getCalendarioApi } from "../../../api/calendario";

// --- COMPONENTS ---
import { List, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { MdSchedule, MdLocationOn, MdTouchApp } from "react-icons/md";
import { BsQuestionCircle } from "react-icons/bs";
import { EventosDescription } from "../../../utils/dataVariables";

import CoverImg from "../../../assets/img/images/services.jpg";
import AlternativeImage from "../../../assets/img/images/gallery_4.jpg";

import "./Calendario.scss";

export default function Calendario() {
   const [calendario, setCalendarios] = useState([]);
   const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

   useEffect(() => {
      getCalendarioApi().then((response) => {
         const arrayTemporal = [];
         response.calendario.forEach((element) => {
            if (!element.url) {
               element.url = AlternativeImage;
            }
            arrayTemporal.push(element);
         });
         setCalendarios(arrayTemporal);
      });
   }, []);

   if (!calendario) {
      return (
         <Spin
            indicator={antIcon}
            tip="Cargando Información..."
            className="blog-spin"
            style={{ width: "100%", padding: "200px 10px" }}
         />
      );
   }

   return (
      <div className="eventos-page-component">
         <div className="eventos-header">
            <div className="background_image" style={{ backgroundImage: `url(${CoverImg})` }} />
            <div className="overlay" />

            <div className="eventos-title">
               <h2>Calendario de Eventos</h2>
               <p>{EventosDescription}</p>
            </div>
         </div>

         <div className="calendario">
            <List
               dataSource={calendario}
               renderItem={(item) => <Evento key={item._id} item={item} />}
            />
         </div>
      </div>
   );
}

function Evento(props) {
   const { item } = props;

   const day = moment(item.date).format("DD");
   const month = moment(item.date).format("MMMM");
   const year = moment(item.date).format("YY");

   const newDescripcion = item.description.split("\n").map((str) => (
      <p>
         {str}
         <br />
      </p>
   ));

   return (
      <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
         <div className="calendario__evento">
            <div className="evento-image" style={{ backgroundImage: `url(${item.url})` }} />

            <div className="evento-info">
               <div className="date">
                  <span>{`${day} ${month} ${year}`}</span>
               </div>

               <h3>{item.title}</h3>
               <p style={{ textAlign: "justify" }}>{newDescripcion}</p>

               <h4>
                  <MdSchedule />
                  {item.hour}
               </h4>
               {item.place ? (
                  <h4>
                     <MdLocationOn style={{ fontSize: "23px" }} />
                     {item.place}
                  </h4>
               ) : null}
               {item.additionalinfo ? (
                  <h4>
                     <BsQuestionCircle />
                     {item.additionalinfo}
                  </h4>
               ) : null}

               {item.link ? (
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                     <MdTouchApp /> Registrarse
                  </a>
               ) : null}
            </div>
         </div>
      </ScrollAnimation>
   );
}
