import React, { useState, useEffect } from "react";

// --- API ---
import { getComunidadesApi } from "../../../api/comunidad";

// --- COMPONENTS ---
import { List } from "antd";

import "./Intenciones.scss";

export default function Intenciones() {
  const [infoDonativos, setInfoDonativos] = useState([]);

  useEffect(() => {
    getComunidadesApi().then((response) => {
      const arrayTemporal = [];

      response.comunidad.forEach((element) => {
        if (element.type === "donativo") {
          arrayTemporal.push(element);
        }
      });
      setInfoDonativos(arrayTemporal);
    });
  });

  if (!infoDonativos) {
    return null;
  }

  return (
    <div className='donativos-web'>
      <h4>Donativos</h4>
      <p>
        Con tu apoyo, nuestra Parroquia podrá seguir ayudando a la comunidad en
        sus labores pastorales
      </p>
      <div className='donativos-web-list'>
        <List
          dataSource={infoDonativos}
          renderItem={(item) => <DonativoCard item={item} />}
        />
      </div>
    </div>
  );
}

function DonativoCard(props) {
  const { item } = props;

  const newDescripcion = item.description.split("\n").map((str) => (
    <p>
      {str}
      <br />
    </p>
  ));

  return (
    <div className='donativos-web-list__card' key={item._id}>
      <h4>Banco:</h4>
      <h2>{item.title}</h2>
      <h4>CLABE:</h4>
      <h2>{item.additionalinfo}</h2>
      <h4>Información Adicional:</h4>
      <p>{newDescripcion}</p>
    </div>
  );
}
