import React from "react";
import ScrollAnimation from "react-animate-on-scroll";
import { dataParroquia } from "../../../../utils/dataVariables";

import Cover from "../../../../assets/img/jpg/const.jpg";
import "./Acerca.scss";

export default function Acerca() {
   return (
      <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
         <div className="acerca">
            <h2>Acerca de la Parroquia</h2>

            <div className="acerca__cover">
               <img src={Cover} alt="parroquia cover" />
               <div>
                  <h3 style={{ textAlign: "center" }}>
                     {" "}
                     <strong>{dataParroquia}</strong>
                  </h3>
                  <p>
                     Lorem ipsum dolor sit amet consectetur adipiscing elit placerat penatibus,
                     pharetra luctus aliquet himenaeos vehicula bibendum quisque fames lacus, aenean
                     eleifend proin condimentum hendrerit torquent leo hac. Est magnis duis egestas
                     curae nam id torquent, aenean tempor ridiculus venenatis cursus dis euismod
                     molestie, convallis metus suscipit dictum pellentesque tortor
                  </p>
                  <ul>
                     <li>Lorem ipsum dolor sit amet consectetur, adipiscing elit sapien.</li>
                     <li>Cum convallis semper congue elementum, enim ante.</li>
                     <li>Dictumst varius hendrerit lacus phasellus, class odio interdum.</li>
                  </ul>
                  {/* <p>
              Erigida el 10 de mayo de 1986. <br />
              Primer Párroco y Benefactor:
              <br />
              Sr. Cura DON J. GUADALUPE HERNÁNDEZ GARCÍA <br />
              <i>
                "El Señor que nos construyó la casa, nos guarde siempre del mal"
              </i>
              <br />
            </p>
            <p>
              Esta Parroquia con su Altar fue consagrado solemnemente por el{" "}
              <b>Emmo. Sr. Cardenal Don Juan Sandoval I. </b>
              el 9 de junio de 2001, y fueron depositadas las reliquias de los{" "}
              <strong>Santos Mártires:</strong>
            </p>
            <ul>
              <li>Cristobal Magallenes Jara</li>
              <li>Tranquilino Ubiarco</li>
              <li>Santa María de Jesús Sacramentado, Virgen</li>
            </ul> */}
               </div>
            </div>
         </div>
      </ScrollAnimation>
   );
}
