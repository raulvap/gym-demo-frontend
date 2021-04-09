import React, { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/es";

// --- API ---
import { updateMessageApi } from "../../../../api/messages";
import { getAccessTokenApi } from "../../../../api/auth";

import "./MessageInfoModal.scss";

export default function MessageInfoModal(props) {
  const { message, setReloadMessages } = props;
  const [messageData, setMessageData] = useState({});

  useEffect(() => {
    setMessageData({
      name: message.name,
      phone: message.phone,
      email: message.email,
      subject: message.subject,
      message: message.message,
      date: message.date,
      read: true,
    });
    setReloadMessages(true);
  }, [message]);

  const token = getAccessTokenApi();
  const id = message._id;
  updateMessageApi(token, messageData, id);
  // const fechaEnvio = moment(message.date).format("llll");

  return (
    <div className='message-info-modal'>
      <p>
        Asunto:
        <h4> {messageData.subject}</h4>
      </p>
      <p>
        Fecha: {"  "}
        <h4> {moment(messageData.date).format("llll")}</h4>
      </p>
      <p>
        De:
        <h4>{messageData.name}</h4>
      </p>
      <p>
        Teléfono:
        <h4>{messageData.phone ? messageData.phone : "(sin télefono)"}</h4>
      </p>
      <p>
        Correo:
        <h4>{messageData.email ? messageData.email : "(sin correo)"}</h4>
      </p>

      <p>Mensaje:</p>
      <p className='message-info-modal__info'>{messageData.message}</p>
    </div>
  );
}
