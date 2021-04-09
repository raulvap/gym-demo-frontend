import React from "react";
import ScrollAnimation from "react-animate-on-scroll";
import { NavLink as Link } from "react-router-dom";
import { Row, Col } from "antd";
import {
  FolderOutlined,
  TeamOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

import {
  ComunidadDescription,
  EventosDescription,
  BlogDescription,
} from "../../../utils/dataVariables";

import "./Home3.scss";

export default function Home3() {
  return (
    <div className='home3'>
      <Row gutter={[8, 8]} justify='center' align='top'>
        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
          <ScrollAnimation animateIn='fadeIn' animateOnce={true} offset={300}>
            <TeamOutlined />
            <h2>Comunidad</h2>
            <p>{ComunidadDescription}</p>
            <Link to='/comunidad'>Ver más</Link>
          </ScrollAnimation>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
          <ScrollAnimation animateIn='fadeIn' animateOnce={true} offset={300}>
            <CalendarOutlined />
            <h2>Eventos</h2>
            <p>{EventosDescription}</p>
            <Link to='/calendario'>Ver más</Link>
          </ScrollAnimation>
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <ScrollAnimation animateIn='fadeIn' animateOnce={true} offset={300}>
            <FolderOutlined />
            <h2>Publicaciones y Descargas</h2>
            <p>{BlogDescription}</p>
            <Link to='/blog'>Ver más</Link>
          </ScrollAnimation>
        </Col>
      </Row>
    </div>
  );
}