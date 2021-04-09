import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Alert } from "antd";
import moment from "moment";
import "moment/locale/es";

import { dataParroquia } from "../utils/dataVariables";

import "./_RegistroExitoso.scss";

export default function ReservacionExitosa() {
  const [registro, setRegistro] = useState({});

  useEffect(() => {
    if (localStorage && localStorage.getItem("registro")) {
      setRegistro(JSON.parse(localStorage.getItem("registro")));
      localStorage.removeItem("registro");
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Reservación Confirmada | {dataParroquia}</title>
        <meta
          name='reservacion-confirmada'
          content='Reservación Confirmada'
          data-react-helmet='true'
        />
      </Helmet>
      <div className='reservacion_confirmada'>
        <Alert
          message={
            registro.currentSeats + registro.seats <= registro.maxSeats
              ? "Tu reservación está Pre-Confirmada"
              : "Reservación en Lista de Espera"
          }
          description={<ReservacionInfo registro={registro} />}
          type={
            registro.currentSeats + registro.seats <= registro.maxSeats
              ? "success"
              : "warning"
          }
          showIcon
        />
      </div>
    </>
  );
}

function ReservacionInfo(props) {
  const { registro } = props;
  return (
    <div>
      <h3>
        Por favor revisa tu correo para ver tu reservación y terminar el
        proceso.
      </h3>
      <p>(Puede que el mensaje haya llegado a la carpeta "No Deseados")</p>

      <h4>Te pedimos seguir las siguientes indicaciones:</h4>
      <ul>
        <li>
          Llegar al menos <strong>20 minutos</strong> antes
        </li>
        <li>
          El uso de cubrebocas es <strong>OBLIGATORIO</strong> durante toda la
          Celebración
        </li>
        <li>Deberás respetar el lugar que se te asigne al llegar</li>
        <li>...</li>
      </ul>
      <h4>Información de la Reservación:</h4>
      <div className='reservacion-info'>
        {registro.eventName ? (
          <div className='reservacion-info__row'>
            <div className='reservacion-info__data1'>
              <p>Misa:</p>
            </div>
            <div className='reservacion-info__data'>
              <p>
                <strong>{registro.eventName}</strong>
              </p>
            </div>
          </div>
        ) : null}
        <div className='reservacion-info__row'>
          <div className='reservacion-info__data1'>
            <p>Fecha:</p>
          </div>
          <div className='reservacion-info__data'>
            <p>
              <strong>{moment(registro.eventDate).format("dddd LL")}</strong>
            </p>
          </div>
        </div>
        <div className='reservacion-info__row'>
          <div className='reservacion-info__data1'>
            <p>Hora:</p>
          </div>
          <div className='reservacion-info__data'>
            <p>
              <strong>{registro.hour}</strong>
            </p>
          </div>
        </div>
        <div className='reservacion-info__row'>
          <div className='reservacion-info__data1'>
            <p>Nombre:</p>
          </div>
          <div className='reservacion-info__data'>
            <p>
              <strong>{registro.name}</strong>
            </p>
          </div>
        </div>
        <div className='reservacion-info__row'>
          <div className='reservacion-info__data1 '>
            <p>Email:</p>
          </div>
          <div className='reservacion-info__data'>
            <p>
              <strong>{registro.email}</strong>
            </p>
          </div>
        </div>
        <div className='reservacion-info__row'>
          <div className='reservacion-info__data1'>
            <p>Lugares Reservados:</p>
          </div>
          <div className='reservacion-info__data'>
            <p>
              <strong>{registro.seats} lugares</strong>
            </p>
          </div>
        </div>
        <div className='reservacion-info__row'>
          <div className='reservacion-info__data1'>
            <p>Posición en la Lista:</p>
          </div>
          <div className='reservacion-info__data'>
            <h2 style={{ fontSize: "2rem" }}>
              {registro.currentSeats} a{" "}
              {registro.currentSeats + registro.seats - 1}
            </h2>
          </div>
        </div>
      </div>

      <ul>
        <li>
          Recuerda que el Máximo de Lugares permitidos es:{" "}
          <strong>{registro.maxSeats} lugares</strong>, si tu posición en la
          lista es posterior a estos, estarás en lista de espera.
        </li>
      </ul>
    </div>
  );
}
