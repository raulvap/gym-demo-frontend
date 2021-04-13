import React from "react";
import { Helmet } from "react-helmet";
import ServiciosComponent from "../components/Web/Servicios";
import { dataParroquia } from "../utils/dataVariables";

export default function Servicios() {
   return (
      <>
         <Helmet>
            <title>Instalaciones | {dataParroquia}</title>
            <meta
               name="instalaciones"
               content="Instalaciones del Gimnasio"
               data-react-helmet="true"
            />
         </Helmet>
         <div>
            <ServiciosComponent />
         </div>
      </>
   );
}
