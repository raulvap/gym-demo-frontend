//jshint esversion: 6
import React from "react";
import { Helmet } from "react-helmet";
import { dataParroquia } from "../utils/dataVariables";

// --- Components: ---
import InfoTop from "../components/Web/MenuTop/Info";
import MainBanner from "../components/Web/MainBanner";
import HomeHorarios from "../components/Web/HomeHorarios";
import HomeAvisos from "../components/Web/HomeAvisos";
import HomeSacramentos from "../components/Web/HomeSacramentos";
import Home3 from "../components/Web/Home3";
import HomeFb from "../components/Web/HomeFb";
import FormContacto from "../components/Web/Contacto/FormContacto";
import HomePosts from "../components/Web/Blog/HomePosts";

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
         <HomeSacramentos />
         <Home3 />
         <FormContacto />
      </>
   );
}
