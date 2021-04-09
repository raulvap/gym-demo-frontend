import React from "react";
// import {
//   FacebookShareButton,
//   FacebookIcon,
//   TwitterShareButton,
//   TwitterIcon,
//   TelegramShareButton,
//   TelegramIcon,
//   WhatsappShareButton,
//   WhatsappIcon,
// } from "react-share";
import ScrollAnimation from "react-animate-on-scroll";
import { FaFacebook, FaInstagram } from "react-icons/fa";
// import { LikeShare, appID } from "../SocialLinks/FacebookApi";

import InstagramEmbed from "react-instagram-embed";
import {
   dataParroquia,
   fbLinkPage,
   fbLinkPageMobile,
   IgLinkPage,
   IgPage,
} from "../../../utils/dataVariables";

import "./HomeFb.scss";

export default function HomeFb() {
   var widthScreen = window.innerWidth;

   let windowType = "";

   if (widthScreen <= 1030) {
      windowType = "small";
   } else {
      windowType = "large";
   }

   return (
      <>
         <h2 className="header" style={{ textAlign: "center", position: "relative", top: "25px" }}>
            Nuestras Redes Sociales
         </h2>
         {/* --- SHARE BUTTON (to do...) --- */}

         <div className="social">
            <ScrollAnimation animateIn="fadeIn" animateOnce={true} offset={300}>
               <div className="social__fb">
                  <h3 className="fb">
                     <FaFacebook />
                     Facebook
                  </h3>

                  <div className="facebook-home-div">
                     <div
                        className="fb-page"
                        data-href={fbLinkPage}
                        data-tabs="timeline"
                        data-width="346"
                        data-height="572"
                        data-small-header="true"
                        data-adapt-container-width="true"
                        data-hide-cover="false"
                        data-show-facepile="true"
                     >
                        <blockquote cite={fbLinkPage} className="fb-xfbml-parse-ignore">
                           <a href={fbLinkPage}>{dataParroquia}</a>
                        </blockquote>
                     </div>
                  </div>

                  {windowType === "large" ? (
                     <a
                        // href='fb://page/Parroquia-San-Fco-Javier-de-Las-Colinas-502155349977513/'
                        href={fbLinkPage}
                        target="_blank"
                        rel="noopener noreferrer"
                     >
                        <FaFacebook />
                        Ver en Facebook
                     </a>
                  ) : (
                     <a
                        // href='fb://page/Parroquia-San-Fco-Javier-de-Las-Colinas-502155349977513/'
                        href={fbLinkPageMobile}
                        target="_blank"
                        rel="noopener noreferrer"
                     >
                        <FaFacebook />
                        Ver en Facebook
                     </a>
                  )}
               </div>
            </ScrollAnimation>
            <ScrollAnimation animateIn="fadeIn" animateOnce={true} offset={300}>
               <div className="social__ig">
                  <h3 className="ig">
                     <FaInstagram />
                     Instagram
                  </h3>

                  <InstagramEmbed
                     clientAccessToken="3751909194900158|aebbeba745afed8b43686f1aa136bf41"
                     url={IgLinkPage}
                     maxWidth={320}
                     hideCaption={true}
                     containerTagName="div"
                     injectScript
                     protocol=""
                     onLoading={() => {}}
                     onSuccess={() => {}}
                     onAfterRender={() => {}}
                     onFailure={() => {}}
                  />
                  <a href={IgPage} target="_blank" rel="noopener noreferrer">
                     <FaInstagram />
                     Ver en Instagram
                  </a>
               </div>
            </ScrollAnimation>
         </div>

         {/* <h4 style={{ textAlign: "center" }}>Compartir en redes:</h4>
      <div className='social__sharing'>
        <FacebookShareButton
          url={dataWeb}
          appId={appID}
          quote='Visita nuestra página Demo de Eclesia Digital'>
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>

        <TwitterShareButton title='Visita nuestra página Demo de Eclesia Digital'>
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>
        <TelegramShareButton title='Visita nuestra página Demo de Eclesia Digital'>
          <TelegramIcon size={32} round={true} />
        </TelegramShareButton>
        <WhatsappShareButton title='Visita nuestra página Demo de Eclesia Digital'>
          <WhatsappIcon size={32} round={true} />
        </WhatsappShareButton>
      </div> */}
      </>
   );
}
