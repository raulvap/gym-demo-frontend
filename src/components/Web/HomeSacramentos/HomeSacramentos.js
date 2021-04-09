import React from "react";
import ScrollAnimation from "react-animate-on-scroll";
import { NavLink as Link } from "react-router-dom";
import { Row } from "antd";

import "./HomeSacramentos.scss";

export default function HomeSacramentos() {
  return (
    <div className='home-sacramentos'>
      <h2>Información para Sacramentos</h2>
      <ScrollAnimation animateIn='fadeIn' animateOnce={true} offset={300}>
        <Row justify='center' align='top'>
          <Link className='bautismo' to='/servicios'>
            <h3>Bautismo</h3>
          </Link>
          <Link className='confirmacion' to='/servicios'>
            <h3>Confirmación</h3>
          </Link>
          <Link className='comunion' to='/servicios'>
            <h3>Primera Comunión</h3>
          </Link>
          <Link className='boda' to='/servicios'>
            <h3>Matrimonio</h3>
          </Link>
          <Link className='confesion' to='/servicios'>
            <h3>Reconciliación</h3>
          </Link>
          <Link className='uncion' to='/servicios/#uncion'>
            <h3>Unción de los Enfermos</h3>
          </Link>
        </Row>
      </ScrollAnimation>
    </div>
  );
}

// return (
//   <div className='home-sacramentos'>
//     <Row>
//       <h2>Información para Sacramentos</h2>
//     </Row>
//     <Link to='/servicios'>
//       <Row gutter={[12, 12]}>
//         <Col
//           xs={12}
//           sm={8}
//           md={8}
//           lg={8}
//           xl={8}
//           className='home-sacramentos__bautismo'>
//           <Link to='/servicios'>
//             <h3>Bautismo</h3>
//           </Link>
//         </Col>
//         <Col
//           xs={12}
//           sm={8}
//           md={8}
//           lg={8}
//           xl={8}
//           className='home-sacramentos__confirmacion'>
//           <Link to='/servicios'>
//             <h3>Confirmación</h3>
//           </Link>
//         </Col>
//         <Col
//           xs={12}
//           sm={8}
//           md={8}
//           lg={8}
//           xl={8}
//           className='home-sacramentos__comunion'>
//           <Link to='/servicios'>
//             <h3>Primera Comunión</h3>
//           </Link>
//         </Col>

//         <Col
//           xs={12}
//           sm={8}
//           md={8}
//           lg={8}
//           xl={8}
//           className='home-sacramentos__boda'>
//           <Link to='/servicios'>
//             <h3>Boda</h3>
//           </Link>
//         </Col>
//         <Col
//           xs={12}
//           sm={8}
//           md={8}
//           lg={8}
//           xl={8}
//           className='home-sacramentos__uncion'>
//           <Link to='/servicios'>
//             <h3>Unción de los Enfermos</h3>
//           </Link>
//         </Col>
//         <Col
//           xs={12}
//           sm={8}
//           md={8}
//           lg={8}
//           xl={8}
//           className='home-sacramentos__confesion'>
//           <Link to='/servicios'>
//             <h3>Confesión</h3>
//           </Link>
//         </Col>
//       </Row>
//     </Link>
//   </div>
// );
