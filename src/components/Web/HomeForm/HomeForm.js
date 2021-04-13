import React, { useState } from "react";
import ScrollAnimation from "react-animate-on-scroll";

import { Form, Input, Button, notification, Radio } from "antd";
import { UserOutlined, PhoneOutlined, MailOutlined, MessageOutlined } from "@ant-design/icons";
// import { MdLocationOn, MdPhone } from "react-icons/md";

// --- API ---
import { addMessageApi } from "../../../api/messages";

import Image from "../../../assets/img/images/a1.png";
import "./HomeForm.scss";
// --- Function Default ---

export default function FormContacto(props) {
   const { title } = props;
   const [messageData, setMessageData] = useState({});

   const addMessage = (event) => {
      // event.preventDefault();

      if (!messageData.name) {
         notification["error"]({
            message: "No olvides poner tu nombre, una forma de contacto, asunto y mensaje",
         });
      } else if (!messageData.subject || !messageData.message) {
         notification["error"]({
            message: "No olvides poner un asunto y tu mensaje",
         });
      } else if (!messageData.phone && !messageData.email) {
         notification["error"]({
            message: "No olvides poner una forma de contacto",
         });
      } else {
         notification["warning"]({ message: "Enviando mensaje..." });
         addMessageApi(messageData)
            .then((response) => {
               notification["success"]({
                  message:
                     "¡Muchas gracias! Hemos recibido tu mensaje, en breve nos comunicaremos contigo para darle seguimiento",
               });
               setMessageData({});
            })
            .catch((err) => {
               notification["error"]({ message: "Error del servidor (m:001)" });
            });
      }
   };

   return (
      <div className="home-form-container">
         <img src={Image} alt="form-image" />
         <div className="home-form">
            <ScrollAnimation animateIn="fadeIn" animateOnce={true} offset={150}>
               <Form
                  labelCol={{ span: 4 }}
                  // onChange={changeForm}
                  // onSubmit={login}
                  onFinish={addMessage}
               >
                  <h2>{title}</h2>

                  <Form.Item
                     label="Nombre"
                     rules={[
                        {
                           required: true,
                           message: "Se necesita tu nombre para continuar",
                        },
                     ]}
                  >
                     <Input
                        prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                        type="text"
                        name="user"
                        placeholder="Nombre"
                        className="input"
                        value={messageData.name}
                        onChange={(e) => setMessageData({ ...messageData, name: e.target.value })}
                     />
                  </Form.Item>
                  <Form.Item label="Teléfono">
                     <Input
                        prefix={<PhoneOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                        type="text"
                        name="phone"
                        placeholder="Teléfono"
                        className="input"
                        value={messageData.phone}
                        onChange={(e) => setMessageData({ ...messageData, phone: e.target.value })}
                     />
                  </Form.Item>
                  <Form.Item label="Correo">
                     <Input
                        prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                        type="email"
                        name="emai"
                        placeholder="Correo electrónico"
                        className="input"
                        value={messageData.email}
                        onChange={(e) => setMessageData({ ...messageData, email: e.target.value })}
                     />
                  </Form.Item>
                  <Form.Item label="Asunto">
                     <Radio.Group
                        onChange={(e) =>
                           setMessageData({ ...messageData, subject: e.target.value })
                        }
                        value={messageData.subject}
                     >
                        <Radio value="Quiero un Daypass">Quiero un Daypass</Radio>
                        <Radio value="Quiero inscribirme">Quiero inscribirme</Radio>
                        <Radio value="Quiero información">Quiero información</Radio>
                        <Radio value="Haz recibido un nuevo mensaje">Otro asunto</Radio>
                     </Radio.Group>
                  </Form.Item>

                  <Form.Item
                     label="Mensaje"
                     rules={[
                        {
                           required: true,
                           message: "Se necesita un mensaje para continuar",
                        },
                     ]}
                  >
                     <Input.TextArea
                        className="input"
                        rows={5}
                        prefix={<MessageOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                        placeholder="Escriba su mensaje"
                        name="message"
                        value={messageData.message}
                        onChange={(e) =>
                           setMessageData({ ...messageData, message: e.target.value })
                        }
                     />
                  </Form.Item>
                  <Form.Item>
                     <Button type="primary" htmlType="submit">
                        Enviar
                     </Button>
                  </Form.Item>
               </Form>
            </ScrollAnimation>
         </div>
      </div>
   );
}
