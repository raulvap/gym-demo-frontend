import React, { useState, useEffect } from "react";
import ScrollAnimation from "react-animate-on-scroll";

import "./Colaboradores.scss";

import { Avatar, List, Spin } from "antd";
import { UserOutlined, LoadingOutlined } from "@ant-design/icons";
import { FaInstagram, FaFacebookSquare } from "react-icons/fa";

export default function Colaboradores(props) {
  const { colaboradores } = props;
  const [colaborador, setColaborador] = useState([]);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  useEffect(() => {
    setColaborador(colaboradores);
  }, [colaboradores]);

  if (!colaborador) {
    return (
      <Spin
        indicator={antIcon}
        tip='Cargando Información...'
        className='blog-spin'
        style={{ width: "100%", padding: "200px 10px" }}
      />
    );
  }

  return (
    <div className='todo'>
      <ScrollAnimation animateIn='fadeIn' animateOnce={true}>
        <h2 style={{ textAlign: "center" }}>Colaboradores</h2>
      </ScrollAnimation>
      <div className='colaboradores'>
        <List
          dataSource={colaborador}
          renderItem={(item) => <ColaboradorCard item={item} />}
        />
      </div>
    </div>
  );
}

function ColaboradorCard(props) {
  const { item } = props;

  const newDescripcion = item.description
    .split("\n")
    .map((str) => <p>{str}</p>);

  return (
    <div className='colaboradores__colaboradorWeb'>
      <ScrollAnimation animateIn='fadeIn' animateOnce={true} key={item._id}>
        {item.url ? (
          <img src={item.url} alt='profile pic' />
        ) : (
          <Avatar size={64} icon={<UserOutlined />} />
        )}
        <h3>{item.title}</h3>
        <h4>{item.additionalinfo}</h4>
        <p>{newDescripcion}</p>
      </ScrollAnimation>
      {item.facebook ? (
        <a href={item.facebook} target='_blank' rel='noopener noreferrer'>
          <FaFacebookSquare /> Facebook
        </a>
      ) : null}
      {item.instagram ? (
        <a href={item.instagram} target='_blank' rel='noopener noreferrer'>
          <FaInstagram /> Instagram
        </a>
      ) : null}
    </div>
  );
}
