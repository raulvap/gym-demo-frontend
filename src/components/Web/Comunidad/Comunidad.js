import React, { useState, useEffect } from "react";
import ScrollAnimation from "react-animate-on-scroll";

// --- API ---
import { getComunidadesApi } from "../../../api/comunidad";

// --- COMPONENTS ---
import Acerca from "../Comunidad/Acerca/Acerca";
import Colaboradores from "../Comunidad/Colaboradores";
import { ComunidadDescription } from "../../../utils/dataVariables";

import { Spin, List } from "antd";
import { BsFillClockFill } from "react-icons/bs";
import { LoadingOutlined, LinkOutlined } from "@ant-design/icons";
import { FaInstagram, FaFacebookSquare } from "react-icons/fa";

import { makeStyles } from "@material-ui/core/styles";
import Cover from "../../../assets/img/jpg/cover-2.jpg";
import AlternativeImage from "../../../assets/img/jpg/alternative1.jpg";

import "./Comunidad.scss";

const useStyles = makeStyles({
   image: {
      backgroundImage: `url(${Cover})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "top",

      border: 0,
      opacity: "1",
      color: "white",
      height: "100%",
   },
});

export default function Comunidad() {
   const [comunidades, setComunidades] = useState([]);
   const [colaboradores, setColaboradores] = useState([]);
   const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
   const classes = useStyles();

   useEffect(() => {
      getComunidadesApi().then((response) => {
         const arrayComunidad = [];
         const arrayColaborador = [];
         response.comunidad.forEach((element) => {
            if (element.type === "comunidad") {
               arrayComunidad.push(element);
            } else {
               if (element.type === "colaborador") {
                  arrayColaborador.push(element);
               }
            }
         });
         setComunidades(arrayComunidad);
         setColaboradores(arrayColaborador);
      });
   }, []);

   if (!comunidades) {
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
         <div className="titulos-comunidad">
            <h2>
               Conoce más de la Comunidad
               <br /> en Nuestra Parroquia
            </h2>
            <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
               <p style={{ textAlign: "center" }}>{ComunidadDescription}</p>
            </ScrollAnimation>
         </div>
         <div className="comunidad">
            <List dataSource={comunidades} renderItem={(item) => <ComunidadCard item={item} />} />
         </div>
         <div>
            <Acerca />
            <Colaboradores colaboradores={colaboradores} />
         </div>
      </>
   );
}

function ComunidadCard(props) {
   const { item } = props;

   const newDescripcion = item.description.split("\n").map((str) => (
      <p>
         {str}
         <br />
      </p>
   ));

   return (
      <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
         <div className="comunidad__card">
            {item.url ? (
               <img src={item.url} alt={item.title} />
            ) : (
               <img src={AlternativeImage} alt={item.title} />
            )}
            <div>
               <h3>{item.title}</h3>
               <p>{newDescripcion}</p>

               {item.additionalinfo ? (
                  <h4>
                     {<BsFillClockFill />}
                     {item.additionalinfo}
                  </h4>
               ) : null}
               {item.facebook || item.instagram || item.socialLink ? (
                  <p className="visitanos-comunidad">Visitanos en:</p>
               ) : null}
               <div className="comunidad-social-links">
                  {item.facebook ? (
                     <a href={item.facebook}>
                        <FaFacebookSquare /> Facebook
                     </a>
                  ) : null}
                  {item.instagram ? (
                     <a href={item.instagram}>
                        <FaInstagram /> Instagram
                     </a>
                  ) : null}
                  {item.socialLink ? (
                     <a href={item.socialLink}>
                        <LinkOutlined /> {item.title}
                     </a>
                  ) : null}
               </div>
            </div>
         </div>
      </ScrollAnimation>
   );
}
