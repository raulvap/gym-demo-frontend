import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import useAuth from "../../../hooks/useAuth";
import queryString from "query-string";

// --- API ---
import { withRouter } from "react-router-dom";
import { getMessagesApi } from "../../../api/messages";
import { getAccessTokenApi } from "../../../api/auth";

// --- Components ---
import Modal from "../../../components/Modal";
import MessagesLists from "../../../components/Admin/Messages/MessagesList";
import PaginationMessages from "../../../components/Admin/Messages/MessagesList/Pagination";
import { notification, Empty, Alert } from "antd";

import "./Messages.scss";

function Messages(props) {
  const { user } = useAuth();
  const token = getAccessTokenApi();
  const { location, history } = props;

  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const [messages, setMessages] = useState(null);
  const [reloadMessages, setReloadMessages] = useState(false);

  const { page = 1 } = queryString.parse(location.search);

  useEffect(() => {
    getMessagesApi(token, 8, page)
      .then((response) => {
        if (response?.code !== 200) {
          notification["warning"]({ message: response.message });
        } else {
          setMessages(response.messages);
        }
      })
      .catch((err) => {
        notification["error"]({
          message:
            "La conexión con el servidor no puede ser establecida(m:002)",
        });
      });

    setReloadMessages(false);
  }, [page, reloadMessages]);

  if (user.role === "colaborador externo") {
    return (
      <div className='no-autorizado'>
        <Alert
          message='Solo los Administradores y Editores pueden ver los mensajes recibidos en el Panel
          de Administración'
          type='error'
          showIcon
        />
        <p>
          Tu perfil está configurado cómo:{"  "}
          <strong>{user.role.toUpperCase()}</strong>
        </p>

        <Empty />
      </div>
    );
  } else {
    if (!messages) {
      return (
        <div className='messages-empty'>
          <h3>Mensajes Recibidos de la Página Web</h3>
          <Empty />
        </div>
      );
    }

    return (
      <>
        <Helmet>
          <title>Admin | Mensajes Recibidos</title>
          <meta
            name='admin-mensajes'
            content='Admin | Mensajes recibidos'
            data-react-helmet='true'
          />
        </Helmet>

        <div className='messages'>
          <h3>Mensajes Recibidos de la Página Web</h3>
          <MessagesLists
            user={user}
            messages={messages}
            setReloadMessages={setReloadMessages}
            setIsVisibleModal={setIsVisibleModal}
            setModalTitle={setModalTitle}
            setModalContent={setModalContent}
          />
          <PaginationMessages
            messages={messages}
            location={location}
            history={history}
          />
        </div>

        <Modal
          title={modalTitle}
          isVisible={isVisibleModal}
          setIsVisible={setIsVisibleModal}
          width='60%'>
          {modalContent}
        </Modal>
      </>
    );
  }
}

export default withRouter(Messages);
