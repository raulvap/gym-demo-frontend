import React from "react";

// import { FacebookProvider, Page } from "react-facebook";
import {
  FaFacebook,
  //  FaInstagram
} from "react-icons/fa";
import { dataParroquia, fbLinkPage } from "../../../../utils/dataVariables";

import "./RedesSocialesBlog.scss";

export default function RedesSocialesBlog() {
  var widthScreen = window.innerWidth;
  var heightScreen = window.innerHeight * 0.65;
  var buttonType = "button";
  let windowType = "";

  if (widthScreen <= 1030) {
    windowType = "small";
    widthScreen = 180;
    buttonType = "button";
  } else {
    windowType = "large";
    widthScreen = 500;
    buttonType = "standard";
  }

  return (
    <div>
      <div className='redes-sociales-blog'>
        <h3>
          <FaFacebook />
          Facebook
        </h3>
        <p>
          Dale{" "}
          <strong style={{ color: " #3c5a99" }}>
            {windowType === "large" ? (
              <a
                // href='fb://page/Parroquia-San-Fco-Javier-de-Las-Colinas-502155349977513/'
                href='https://www.facebook.com/ParroquiaSantaMariadeGuadalupeJardinesUniversidad'
                target='_blank'
                rel='noopener noreferrer'>
                Like
              </a>
            ) : (
              <a
                // href='fb://page/Parroquia-San-Fco-Javier-de-Las-Colinas-502155349977513/'
                href='fb://page/ParroquiaSantaMariadeGuadalupeJardinesUniversidad'
                target='_blank'
                rel='noopener noreferrer'>
                Like
              </a>
            )}
          </strong>{" "}
          a nuestra página de Facebook
          <br /> para que estés enterado de las últimas publicaciones
        </p>
        <div
          className='fb-like'
          data-href={fbLinkPage}
          data-width=''
          data-layout={buttonType}
          data-action='like'
          data-size='large'
          data-share='false'></div>
      </div>

      <div className='facebook-blog'>
        <div
          className='fb-page'
          data-href={fbLinkPage}
          data-tabs='timeline'
          data-width={widthScreen}
          data-height={heightScreen}
          data-small-header='false'
          data-adapt-container-width='true'
          data-hide-cover='false'
          data-show-facepile='true'>
          <blockquote cite={fbLinkPage} className='fb-xfbml-parse-ignore'>
            <a href={fbLinkPage}>{dataParroquia}</a>
          </blockquote>
        </div>
      </div>

      {/* <FacebookProvider appId='3751909194900158'>
          <Page
            href='https://www.facebook.com/Parroquia-San-Fco-Javier-de-Las-Colinas-502155349977513/'
            tabs='timeline'
          />
        </FacebookProvider> */}
    </div>
  );
}
