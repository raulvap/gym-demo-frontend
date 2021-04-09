import React from "react";
import moment from "moment";
import "moment/locale/es";

// --- API ---
import { deleteMessagesApi, updateMessageApi } from "../../../../api/messages";
import { getAccessTokenApi } from "../../../../api/auth";

// --- Components ---
import MessageInfoModal from "../MessageInfoModal";
import { List, Button, Modal as AntdModal, notification } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { HiMailOpen, HiMail } from "react-icons/hi";

import "./MessagesLists.scss";

const { confirm } = AntdModal;

export default function MessagesLists(props) {
  const {
    // user,
    messages,
    setReloadMessages,
    setIsVisibleModal,
    setModalTitle,
    setModalContent,
  } = props;

  const deleteMessage = (message) => {
    const accessToken = getAccessTokenApi();

    confirm({
      title: "Eliminar Mensaje",
      content: `¿Estas seguro de eliminar este mensaje?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteMessagesApi(accessToken, message._id)
          .then((response) => {
            notification["success"]({ message: "Mensaje eliminado" });
            setReloadMessages(true);
          })
          .catch(() => {
            notification["error"]({
              message: "Error del servidor (m:004)",
            });
          });
      },
    });
  };

  const updateMessage = (message) => {
    setIsVisibleModal(true);
    setModalTitle("Mensaje Recibido");
    setModalContent(
      <MessageInfoModal
        message={message}
        setReloadMessages={setReloadMessages}
      />
    );
  };

  const readMessage = (message) => {
    const token = getAccessTokenApi();
    const id = message._id;

    message.read = !message.read;
    updateMessageApi(token, message, id);
    setReloadMessages(true);
  };

  return (
    <div className='messages-list'>
      <List
        dataSource={messages.docs}
        renderItem={(message) => (
          <Message
            message={message}
            deleteMessage={deleteMessage}
            updateMessage={updateMessage}
            readMessage={readMessage}
          />
        )}
      />
    </div>
  );
}

function Message(props) {
  const { message, updateMessage, deleteMessage, readMessage } = props;
  const fechaEnvio = moment(message.date).format("llll");

  return (
    <List.Item
      className='messages-list__message'
      key={message._id}
      actions={[
        <Button
          type='primary'
          title='Ver Mensaje'
          onClick={() => updateMessage(message)}>
          <EyeOutlined />
        </Button>,

        <Button
          type='primary'
          title={message.read ? "Marcar como No Leído" : "Marcar como Leído"}
          onClick={() => readMessage(message)}>
          {message.read ? <HiMail /> : <HiMailOpen />}
        </Button>,

        <Button
          type='danger'
          title='Eliminar Mensaje'
          onClick={() => deleteMessage(message)}>
          <DeleteOutlined />
        </Button>,
      ]}>
      <List.Item.Meta
        avatar={
          message.read ? (
            <HiMailOpen style={{ color: "#ccc" }} />
          ) : (
            <HiMail style={{ color: "#0d2d54" }} />
          )
        }
        title={message.subject ? message.subject : "(Sin Asunto)"}
        description={
          <div>
            <p>{fechaEnvio}</p>
            {!!message.message && (
              <p>{message.message.substr(0, 30) + "..."}</p>
            )}
          </div>
        }
      />
    </List.Item>
  );
}
