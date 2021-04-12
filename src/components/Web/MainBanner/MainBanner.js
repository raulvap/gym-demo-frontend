import React from "react";
import { Link } from "react-router-dom";

import CoverImg from "../../../assets/img/images/index.jpg";

import "./MainBanner.scss";

export default function MainBanner() {
   return (
      <div className="main-banner">
         <div className="background_image" style={{ backgroundImage: `url(${CoverImg})` }} />
         <div className="overlay" />
         <div className="home_container">
            <div className="home_info">
               <div className="home_title">Get fit with us</div>
               <div className="home_subtitle">Pilates, Yoga, Fitness, Spinning & many more</div>

               <Link className="home_button" to="/">
                  Join Now
               </Link>
            </div>
         </div>
      </div>
   );
}
