import React, { useState, useEffect } from "react";

// --- API ---
import { getServicioApi } from "../../../api/servicios";
// --- Components ---
import { Button, List, Collapse, Spin } from "antd";

import { Link } from "react-scroll";

import AlternativeImage from "../../../assets/img/jpg/web-cover-home.jpg";

import { LoadingOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { BsFillClockFill } from "react-icons/bs";

import "./Servicios.scss";

const { Panel } = Collapse;

export default function Servicios() {
   const [servicios, setServicios] = useState([]);
   const [secciones, setSecciones] = useState([]);
   const [showScroll, setShowScroll] = useState(false);
   const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

   useEffect(() => {
      getServicioApi().then((response) => {
         setServicios(response.servicio);

         const sectionArray = [];
         response.servicio.forEach((item) => {
            sectionArray.push(item.section);
         });
         for (var i = sectionArray.length - 1; i >= 0; i--) {
            if (sectionArray.indexOf(sectionArray[i]) !== i) {
               sectionArray.splice(i, 1);
            }
         }
         setSecciones(sectionArray);
      });
   }, []);

   // --- Show Scroll to Top ---
   const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 400) {
         setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 400) {
         setShowScroll(false);
      }
   };

   const scrollTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
   };
   window.addEventListener("scroll", checkScrollTop);

   if (!servicios) {
      return (
         <Spin
            indicator={antIcon}
            tip="Cargando Servicios..."
            className="blog-spin"
            style={{ width: "100%", padding: "200px 10px" }}
         />
      );
   }

   return (
      <div>
         <h1 className="titulo-servicio">Servicios de la Parroquia</h1>
         <div className="servicios">
            <div className="servicios__menu">
               <List
                  dataSource={secciones}
                  renderItem={(item) => <SeccionMenu item={item} servicios={servicios} />}
               />
            </div>
            <div>
               <List dataSource={servicios} renderItem={(item) => <Contenido item={item} />} />
            </div>

            <Button
               type="primary"
               shape="circle"
               icon={<ArrowUpOutlined />}
               size="large"
               className="scrollTop"
               onClick={scrollTop}
               style={{ height: 40, display: showScroll ? "flex" : "none" }}
            />
         </div>
      </div>
   );
}

function Contenido(props) {
   const { item } = props;

   const newDescripcion = item.description.split("\n").map((str) => (
      <p>
         {str} <br />
      </p>
   ));

   return (
      <div id={item.title} className="servicios__contenido">
         {!item.url ? (
            <img src={AlternativeImage} alt={item.title} />
         ) : (
            <img src={item.url} alt={item.title} />
         )}

         <h2>{item.title}</h2>
         <p>{item.section}</p>
         <div>{newDescripcion}</div>
         {item.additionalinfo ? (
            <h4>
               {<BsFillClockFill />}
               {item.additionalinfo}
            </h4>
         ) : null}
      </div>
   );
}

function SeccionMenu(props) {
   const { item, servicios } = props;

   const result = servicios.filter((servicio) => servicio.section === item);

   return (
      <div>
         <Collapse accordion bordered={false} defaultActiveKey={["Sacramentos"]}>
            <Panel header={item} key={item}>
               <List
                  dataSource={result}
                  renderItem={(item) => (
                     <Link to={item.title} offset={-140} smooth={true} duration={1500}>
                        {item.title}
                     </Link>
                  )}
               />
            </Panel>
         </Collapse>
      </div>
   );
}
