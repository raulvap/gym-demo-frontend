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
import { makeStyles } from "@material-ui/core/styles";
import { EventosDescription } from "../../../utils/dataVariables";

import Cover from "../../../assets/img/jpg/web-cover-home.jpg";
import AlternativeImage from "../../../assets/img/jpg/alternative2.jpg";

import "./Calendario.scss";

const useStyles = makeStyles({
   image: {
      backgroundImage: `url(${Cover})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
      opacity: "0.95",
      border: 0,
      height: "100%",
   },
});

export default function Calendario() {
   const [calendario, setCalendarios] = useState([]);
   const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
   const classes = useStyles();

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
      <>
         <div className="cover">
            <div className={classes.image}></div>
         </div>

         <h2 style={{ textAlign: "center" }}>Calendario de Eventos</h2>

         <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
            <p className="subtitulo">{EventosDescription}</p>
         </ScrollAnimation>

         <div className="calendario">
            <List dataSource={calendario} renderItem={(item) => <Evento item={item} />} />
         </div>
      </>
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
            <img src={item.url} alt={item.title} />
            <div className="info">
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
