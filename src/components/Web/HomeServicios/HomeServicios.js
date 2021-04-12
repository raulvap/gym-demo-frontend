// import React, { useState, useEffect } from "react";
// import { Link } from "react-scroll";

// // --- API ---
// import { getComunidadesApi } from "../../../api/comunidad";

// // --- Components ---
// import { Button, List, Spin } from "antd";
// import { LoadingOutlined, ArrowUpOutlined } from "@ant-design/icons";
// import { BsFillClockFill } from "react-icons/bs";
// import AlternativeImage from "../../../assets/img/images/gallery_2.jpg";

// import "./HomeServicios.scss";

// export default function HomeServicios() {
//    const [servicios, setServicios] = useState([]);
//    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

//    useEffect(() => {
//       getComunidadesApi().then((response) => {
//          const arrayComunidad = [];
//          response.comunidad.forEach((element) => {
//             arrayComunidad.push(element);
//          });
//          setServicios(arrayComunidad);
//       });
//    }, []);

//    if (!servicios) {
//       return (
//          <Spin
//             indicator={antIcon}
//             tip="Cargando Información..."
//             className="blog-spin"
//             style={{ width: "100%", padding: "200px 10px" }}
//          />
//       );
//    }

//    //  NOMBRE
//    //  IMAGEN
//    //  INFORMACIÓN DE FECHAS
//    //  DESCRIPCION

//    return (
//       <div className="home-servicios">
//          {/* <div className="overlay-servicios" /> */}
//          <div className="home-servicios-list">
//             <List
//                dataSource={servicios}
//                renderItem={(item) => <ServicioCard key={item._id} item={item} />}
//             />
//          </div>
//       </div>
//    );
// }

// function ServicioCard(props) {
//    const { item } = props;
//    console.log(item._id);

//    const newDescripcion = item.description.split("\n").map((str) => (
//       <span>
//          {str} <br />
//       </span>
//    ));

//    return (
//       <div className="servicios-card">
//          {/* imagen */}
//          {!item.url ? (
//             <img src={AlternativeImage} alt={item.title} />
//          ) : (
//             <img src={item.url} alt={item.title} />
//          )}

//          <h2>{item.title}</h2>

//          <div>{newDescripcion}</div>
//          {item.additionalinfo ? (
//             <h4>
//                {<BsFillClockFill />}
//                {item.additionalinfo}
//             </h4>
//          ) : null}
//       </div>
//    );
// }
