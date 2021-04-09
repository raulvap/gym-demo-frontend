import React, { useState, useEffect } from "react";
import ScrollAnimation from "react-animate-on-scroll";
import moment from "moment";
import "moment/locale/es";

// --- API ---
import { addRegistroApi, getMisaInfoApi } from "../../../api/registroMisa";

// --- Components ---
import RegistroMisaEspecial from "./RegistoMisaEspecial";
import SelectHorario from "./SelectHorario";
import Modal from "../../Modal";

import { Form, Input, Button, notification, Select, DatePicker, Space, List } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import { MdTouchApp } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";

import { makeStyles } from "@material-ui/core/styles";
import Cover from "../../../assets/img/jpg/cover.jpg";

import "./RegistroMisa.scss";

const { Option } = Select;

const useStyles = makeStyles({
   image: {
      backgroundImage: `url(${Cover})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "bottom",

      opacity: "0.90",
      border: 0,
      height: "100%",
   },
});

const dateFormat = "ddd DD/MMM/YY";

export default function Calendario() {
   const classes = useStyles();
   const [isVisibleModal, setIsVisibleModal] = useState(false);
   const [modalTitle, setModalTitle] = useState("");
   const [modalContent, setModalContent] = useState(null);

   const [registroData, setRegistroData] = useState({});
   const [misasEspeciales, setMisasEspeciales] = useState([]);
   const [misaInfo, setMisaInfo] = useState([]);
   const [misaHorarios, setMisaHorarios] = useState([]);
   const [dia, setDia] = useState("");

   let diaSeleccionado = "";

   // --- DB Connection: (one-time) ---
   useEffect(() => {
      getMisaInfoApi().then((response) => {
         if (response?.code !== 200) {
            notification["warning"]({ message: response.message });
         } else {
            const newArray = [];
            const misasEspecialesArray = [];
            response.misa.forEach((element) => {
               element.hour = moment(element.hour).format("LT");
               // element.date = moment(element.date).format("dddd DD/MMM/YY");

               if (element.active) {
                  newArray.push(element);
                  if (element.categoria === "Especial") {
                     misasEspecialesArray.push(element);
                  }
               }
            });
            setMisaInfo(newArray);
            setMisasEspeciales(misasEspecialesArray);
         }
      });
   }, []);

   // --- Dynamic Form ---
   // CHANGE BY DAY:
   useEffect(() => {
      setMisaHorarios([]);

      switch (moment(registroData.day).day()) {
         case 0:
            diaSeleccionado = "dom";
            setDia("Domingo");
            break;
         case 1:
            diaSeleccionado = "lun";
            setDia("Lunes");
            break;
         case 2:
            diaSeleccionado = "mar";
            setDia("Martes");
            break;
         case 3:
            diaSeleccionado = "mie";
            setDia("Miércoles");
            break;
         case 4:
            diaSeleccionado = "jue";
            setDia("Jueves");
            break;
         case 5:
            diaSeleccionado = "vie";
            setDia("Viernes");
            break;
         case 6:
            diaSeleccionado = "sab";
            setDia("Sábado");
            break;

         default:
            break;
      }

      const horariosTemporal = [];

      Object.values(misaInfo).forEach((item) => {
         if (item.categoria === "Normal") {
            if (item[diaSeleccionado]) {
               horariosTemporal.push(item);
            }
         }
      });
      setMisaHorarios(horariosTemporal);
   }, [registroData.day]);

   const addRegistroCotidiana = (e) => {
      if (
         !registroData.day ||
         !registroData.hour ||
         !registroData.name ||
         !registroData.email ||
         !registroData.seats
      ) {
         notification["error"]({
            message: "Para reservar, se requiren todos los campos",
         });
      } else {
         notification["success"]({
            message: "Confirmando registro, espere por favor...",
         });
         registroData.eventDate = registroData.day;
         registroData.month = 1 + moment(registroData.day).month();
         registroData.year = moment(registroData.day).year();
         registroData.day = moment(registroData.day).date();
         registroData.categoria = "Normal";
         // registroData.maxSeats =
         addRegistroApi(registroData)
            .then((response) => {
               localStorage.setItem("registro", JSON.stringify(response.registro));
               const typeNotification = response.code === 200 ? "success" : "error";

               if (typeNotification === "success") {
                  notification[typeNotification]({
                     message: response.message,
                  });
                  // <Redirect to='/reservacion-confirmada' />;

                  window.location.href = "/reservacion-confirmada";
                  setTimeout(() => {
                     setRegistroData({});
                  }, 1200);
               } else {
                  alert(response.message);
                  window.location.reload();
               }
            })
            .catch((err) => {
               notification["error"]({
                  message: "Error del servidor (m:001) " + err,
               });
            });
      }
   };

   const addRegistroEspecial = (misa) => {
      setIsVisibleModal(true);
      setModalTitle(`Registro`);
      setModalContent(<RegistroMisaEspecial misa={misa} setIsVisibleModal={setIsVisibleModal} />);
   };

   const validateDate = (date) => {
      const validDate = moment().add(1, "M");

      if (date < validDate) {
         setRegistroData({
            ...registroData,
            day: moment(date),
         });
      } else {
         notification["error"]({
            message: "Solo se puede registrar para los próximos 30 días",
         });
         setRegistroData({
            ...registroData,
            day: null,
         });
      }
   };

   return (
      <>
         <div className="cover">
            <div className={classes.image}></div>
         </div>

         <div className="registro-misa">
            <h2 style={{ textAlign: "center" }}>Registro para Misa</h2>
            <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
               <div className="registro-misa__info">
                  <h3>Protocolo para Asistir a Misa</h3>
                  <p>
                     Debido a la Contingencia Sanitaria, la participación en las celebraciones será{" "}
                     <strong>LIMITADA</strong>, por lo que se deberá tener un registro previo, el
                     cual podrán hacer en los formularios más abajo.
                  </p>
                  <ul>
                     <li>
                        El registro para Misa Especial es para misas especiales con fecha y horario
                        definido
                     </li>
                     <li>El registro para Misa cotidiana es para misas de diario</li>
                  </ul>
               </div>
            </ScrollAnimation>

            {/* --- RegistroMisaEspecial --- */}
            <h2 style={{ textAlign: "center" }}>Registro Misa Especial</h2>
            <List
               className="registro-misa__especiales"
               itemLayout="horizontal"
               dataSource={misasEspeciales}
               renderItem={(item) => (
                  <ListaMisasEspeciales item={item} addRegistroEspecial={addRegistroEspecial} />
               )}
            />

            {/* --- FORM --- */}
            <div className="registro-misa__form">
               <Form labelCol={{ span: 8 }} onFinish={addRegistroCotidiana}>
                  <h2 style={{ textAlign: "center" }}>Registro Misa Cotidiana</h2>
                  <Form.Item
                     label="Fecha"
                     // onClick={handleFormValuesChange}
                  >
                     <Space direction="vertical" format={dateFormat}>
                        <DatePicker
                           format={dateFormat}
                           //   defaultValue={moment("2015-01-01", "YYYY-MM-DD")}

                           value={registroData.day}
                           onChange={(date) => validateDate(date)}
                        />
                     </Space>
                  </Form.Item>
                  <h4 style={{ textAlign: "center" }}>{dia}</h4>
                  <Form.Item
                     label="Horarios Disponibles"
                     name="hours"
                     // onClick={handleFormValuesChange}
                  >
                     <SelectHorario
                        registroData={registroData}
                        setRegistroData={setRegistroData}
                        misaHorarios={misaHorarios}
                     />
                  </Form.Item>
                  <Form.Item label="Nombre">
                     <Input
                        prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                        placeholder="Nombre y Apellido"
                        value={registroData.name}
                        onChange={(e) => setRegistroData({ ...registroData, name: e.target.value })}
                     />
                  </Form.Item>
                  <Form.Item label="Email">
                     <Input
                        prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                        type="email"
                        name="emai"
                        placeholder="Correo electrónico"
                        value={registroData.email}
                        onChange={(e) =>
                           setRegistroData({ ...registroData, email: e.target.value })
                        }
                     />
                  </Form.Item>

                  <Form.Item label="Teléfono">
                     <Input
                        prefix={<FaWhatsapp style={{ color: "rgba(0,0,0,.25)" }} />}
                        placeholder="Celular, Whatsapp..."
                        value={registroData.phone}
                        onChange={(e) =>
                           setRegistroData({ ...registroData, phone: e.target.value })
                        }
                     />
                  </Form.Item>

                  <Form.Item label="Cantidad de Lugares">
                     <Select
                        defaultValue="Seleccionar"
                        placeholder="Cantidad de Lugares"
                        // style={{ width: 120 }}
                        value={registroData.seats}
                        onChange={(e) => setRegistroData({ ...registroData, seats: e })}
                     >
                        <Option value={1}>1</Option>
                        <Option value={2}>2</Option>
                        <Option value={3}>3</Option>
                        <Option value={4}>4</Option>
                     </Select>
                  </Form.Item>

                  <Form.Item>
                     <Button type="primary" htmlType="submit">
                        Enviar Registro
                     </Button>
                  </Form.Item>
               </Form>
            </div>
            <p
               style={{
                  fontStyle: "italic",
                  fontSize: "14px",
                  textAlign: "center",
                  marginTop: "40px",
               }}
            >
               *Al enviar su registro, confirma que ha leído nuestro aviso de privacidad para el uso
               de datos personales
            </p>
         </div>
         <Modal
            title={modalTitle}
            isVisible={isVisibleModal}
            setIsVisible={setIsVisibleModal}
            // width='70%'
         >
            {modalContent}
         </Modal>
      </>
   );
}

function ListaMisasEspeciales(props) {
   const { item, addRegistroEspecial } = props;

   return (
      <List.Item
         className="lista-misas-especiales"
         actions={[
            <Button type="primary" title="Registrarse" onClick={() => addRegistroEspecial(item)}>
               <MdTouchApp /> Registrarse
            </Button>,
         ]}
      >
         <h4>{item.name}</h4>
         <p>{moment(item.date).format("dddd DD/MMM/YY")}</p>
         <h3>{item.hour} hrs</h3>
      </List.Item>
   );
}
