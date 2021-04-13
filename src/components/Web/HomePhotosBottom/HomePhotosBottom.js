import React from "react";

import image1 from "../../../assets/img/images/blog_11.jpg";
import image2 from "../../../assets/img/images/blog_8.jpg";
import image3 from "../../../assets/img/images/blog_12.jpg";
import image4 from "../../../assets/img/images/blog_7.jpg";
import image5 from "../../../assets/img/images/blog_2.jpg";
import image6 from "../../../assets/img/images/blog_10.jpg";

import "./HomePhotosBottom.scss";

export default function HomePhotosBottom() {
   return (
      <div className="home-photos-bottom">
         <img src={image1} alt="image1-bottom" className="home-photos" />
         <img src={image2} alt="image1-bottom" className="home-photos" />
         <img src={image3} alt="image1-bottom" className="home-photos" />
         <img src={image4} alt="image1-bottom" className="home-photos" />
         <img src={image5} alt="image1-bottom" className="home-photos" />
         <img src={image6} alt="image1-bottom" className="home-photos" />
      </div>
   );
}
