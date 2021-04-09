import React from "react";

import { MdLocationOn, MdPhone } from "react-icons/md";
import {
   dataDireccion,
   dataTelefono,
   dataTelefonoLink,
   dataMapsLink,
} from "../../../../utils/dataVariables";

import "./info.scss";

export default function info() {
   // cambiar telefonoLink
   const direccion = dataDireccion;
   const phone = dataTelefono;

   return (
      <div className="info">
         <div className="info__address">
            <a href={dataMapsLink} target="_blank" rel="noopener noreferrer">
               <MdLocationOn />
               {direccion}
            </a>
         </div>
         <div className="info__phone">
            <a href={dataTelefonoLink}>
               <MdPhone />
               {phone}
            </a>
         </div>
      </div>
   );
}
