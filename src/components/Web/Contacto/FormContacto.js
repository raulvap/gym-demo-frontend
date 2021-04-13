// import React, { useState } from "react";
// import ScrollAnimation from "react-animate-on-scroll";

// import { Form, Input, Button, notification } from "antd";
// import { UserOutlined, PhoneOutlined, MailOutlined, MessageOutlined } from "@ant-design/icons";
// // import { MdLocationOn, MdPhone } from "react-icons/md";

// // --- API ---
// import { addMessageApi } from "../../../api/messages";

// import "./FormContact.scss";
// // --- Function Default ---

// export default function FormContacto(props) {
//    const { title } = props;
//    const [messageData, setMessageData] = useState({});

//    const addMessage = (event) => {
//       // event.preventDefault();

//       if (!messageData.name) {
//          notification["error"]({
//             message: "No olvides poner tu nombre, una forma de contacto, asunto y mensaje",
//          });
//       } else if (!messageData.subject || !messageData.message) {
//          notification["error"]({
//             message: "No olvides poner un asunto y tu mensaje",
//          });
//       } else if (!messageData.phone && !messageData.email) {
//          notification["error"]({
//             message: "No olvides poner una forma de contacto",
//          });
//       } else {
//          addMessageApi(messageData)
//             .then((response) => {
//                notification["success"]({
//                   message:
//                      "¡Muchas gracias! Hemos recibido tu mensaje, nos pondremos en contacto contigo si es necesario",
//                });
//                setMessageData({});
//             })
//             .catch((err) => {
//                notification["error"]({ message: "Error del servidor (m:001)" });
//             });
//       }
//    };

//    return (
//       <ScrollAnimation animateIn="fadeIn" animateOnce={true} offset={150}>
//          <div>
//             <Form
//                labelCol={{ span: 4 }}
//                className="form-message"
//                // onChange={changeForm}
//                // onSubmit={login}
//                onFinish={addMessage}
//             >
//                <h2>{title}</h2>

//                <Form.Item
//                   label="Nombre"
//                   rules={[
//                      {
//                         required: true,
//                         message: "Se necesita tu nombre para continuar",
//                      },
//                   ]}
//                >
//                   <Input
//                      prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
//                      type="text"
//                      name="user"
//                      placeholder="Nombre"
//                      className="input"
//                      value={messageData.name}
//                      onChange={(e) => setMessageData({ ...messageData, name: e.target.value })}
//                   />
//                </Form.Item>
//                <Form.Item label="Teléfono">
//                   <Input
//                      prefix={<PhoneOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
//                      type="text"
//                      name="phone"
//                      placeholder="Teléfono"
//                      className="input"
//                      value={messageData.phone}
//                      onChange={(e) => setMessageData({ ...messageData, phone: e.target.value })}
//                   />
//                </Form.Item>
//                <Form.Item label="Correo">
//                   <Input
//                      prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
//                      type="email"
//                      name="emai"
//                      placeholder="Correo electrónico"
//                      className="input"
//                      value={messageData.email}
//                      onChange={(e) => setMessageData({ ...messageData, email: e.target.value })}
//                   />
//                </Form.Item>
//                <Form.Item label="Asunto">
//                   <Input
//                      prefix={<MessageOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
//                      type="text"
//                      name="subject"
//                      placeholder="Asunto del mensaje"
//                      className="input"
//                      value={messageData.subject}
//                      onChange={(e) => setMessageData({ ...messageData, subject: e.target.value })}
//                   />
//                </Form.Item>

//                <Form.Item
//                   label="Mensaje"
//                   rules={[
//                      {
//                         required: true,
//                         message: "Se necesita un mensaje para continuar",
//                      },
//                   ]}
//                >
//                   <Input.TextArea
//                      className="input"
//                      rows={5}
//                      prefix={<MessageOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
//                      placeholder="Escriba su mensaje"
//                      name="message"
//                      value={messageData.message}
//                      onChange={(e) => setMessageData({ ...messageData, message: e.target.value })}
//                   />
//                </Form.Item>
//                <Form.Item>
//                   <Button type="primary" htmlType="submit">
//                      Enviar
//                   </Button>
//                </Form.Item>
//             </Form>
//          </div>
//       </ScrollAnimation>
//    );
// }
