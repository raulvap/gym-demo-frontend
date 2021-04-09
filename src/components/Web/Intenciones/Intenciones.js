import React from "react";

// --- API ---

// --- COMPONENTS ---
import { FaWhatsapp } from "react-icons/fa";
import { MdTouchApp } from "react-icons/md";
import { dataWhatsapp } from "../../../utils/dataVariables";
import Guadalupe from "../../../assets/img/jpg/guadalupe.jpg";

import "./Intenciones.scss";

export default function Intenciones() {
   return (
      <div className="intenciones-web">
         <img src={Guadalupe} alt="Guadalupe" />
         <h4>Intenciones</h4>
         <h2>¿Quieres mandar una intención para la Misa?</h2>
         <p className="dmensaje">Mándanos un mensaje a nuestro Whatsapp con tu intención</p>
         <h3>
            <FaWhatsapp />
            33 1234 1234
         </h3>
         <a
            href="https://wa.me/525616161396?text=¡Hola!%20Quiero%20mandar%20una%20intención%20para%20la%20misa%20por%20favor"
            target="_blank"
            rel="noopener noreferrer"
         >
            <MdTouchApp />
            Enviar Whatsapp
         </a>
      </div>
   );
}
