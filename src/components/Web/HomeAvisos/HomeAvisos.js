import React, { useState, useEffect } from "react";

// --- API ---
import { getAvisoApi } from "../../../api/aviso";

// --- COMPONENTS ---
import { Collapse, Spin, List } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import "./HomeAvisos.scss";

const { Panel } = Collapse;

export default function HomeAvisos() {
  const [avisos, setAvisos] = useState([]);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  useEffect(() => {
    getAvisoApi().then((response) => {
      setAvisos(response.aviso);
    });
  }, []);

  if (!avisos) {
    return (
      <div className='home-avisos'>
        <h2>Avisos</h2>
        <Spin
          indicator={antIcon}
          tip='Cargando Avisos...'
          className='blog-spin'
          style={{ width: "100%", padding: "20px 10px" }}
        />
      </div>
    );
  } else {
    return (
      <div className='home-avisos'>
        <h2>Avisos</h2>
        <List
          dataSource={avisos}
          renderItem={(item) => <AvisoItem item={item} />}
        />
      </div>
    );
  }
}

function AvisoItem(props) {
  const { item } = props;

  const newDescripcion = item.description.split("\n").map((str) => (
    <p>
      {str}
      <br />
    </p>
  ));

  return (
    <Collapse accordion key={item._id}>
      <Panel header={item.title}>
        <p>{newDescripcion}</p>
      </Panel>
    </Collapse>
  );
}
