import React from "react";
import { Link } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";

import "./Copyright.scss";

// Mexico
// U+1F1F2 U+1F1FD

//Blueheart: U+1F499

export default function Copyright() {
  return (
    <div className='copyright-footer'>
      <Link to='/reportar-error' className='copyright-footer__eclesia'>
        Web App by Eclesia ©2021
      </Link>

      <br />
      <span>
        Hecho con 💙 desde Guadalajara {<ReactCountryFlag countryCode='MX' />}
      </span>
      <br />
      <div className='copyright-footer__links'>
        <Link to='/aviso-privacidad'>Aviso de Privacidad</Link>
        <span>
          {"  "}|{"  "}
        </span>
        <Link to='/reportar-error'>Reportar un error</Link>
      </div>
    </div>
  );
}
