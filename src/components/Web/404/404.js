import React from "react";
import { NavLink as Link } from "react-router-dom";
import Construyendo from "../../../assets/img/jpg/en-desarrollo.jpg";

import "./404.scss";

export default function Error404() {
  return (
    <div>
      <div className='notfound'>
        <h1 id='header-404'>Oops!</h1>
        <h2>404 - The Page can't be found</h2>
        <h4>Estamos desarrollando esta sección con mucho esfuerzo para ti</h4>
        <img
          className='error-img'
          src={Construyendo}
          alt='developing web-section'
        />

        <Link to='/'>Ir a Inicio</Link>
      </div>
    </div>
  );
}
