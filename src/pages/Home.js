//jshint esversion: 6
import React from "react";
import { Helmet } from "react-helmet";
import { dataParroquia } from "../utils/dataVariables";

// --- Components: ---
import InfoTop from "../components/Web/MenuTop/Info";
import MainBanner from "../components/Web/MainBanner";
import HomeHorarios from "../components/Web/HomeHorarios";
import HomeAvisos from "../components/Web/HomeAvisos";
import HomeServicios from "../components/Web/HomeServicios";
import Home3 from "../components/Web/Home3";
import HomeFb from "../components/Web/HomeFb";
import HomeForm from "../components/Web/HomeForm";
import HomePosts from "../components/Web/Blog/HomePosts";
import HomePhotosBottom from "../components/Web/HomePhotosBottom";

export default function Home(props) {
   const { location } = props;

   return (
      <>
         <Helmet>
            <title>{dataParroquia}</title>
            <meta name="inicio" content={dataParroquia} data-react-helmet="true" />
         </Helmet>

         <InfoTop />
         <MainBanner />
         <HomeHorarios />
         <HomeAvisos />
         <HomePosts location={location} />
         <HomeFb />
         {/* <HomeServicios /> */}
         <Home3 />
         <HomeForm title="Obtén tu Daypass aquí" />
         <HomePhotosBottom />
      </>
   );
}
