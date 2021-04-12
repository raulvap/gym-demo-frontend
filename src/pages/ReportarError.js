import React from "react";
import { Helmet } from "react-helmet";
import useAuth from "../hooks/useAuth";

import ReportarErrorComponent from "../components/Web/ReportarError";

export default function ReportarError(props) {
   const { user } = useAuth();

   const userData = user;

   return (
      <>
         <Helmet>
            <title>Web App by Desarrollo29 </title>
            <meta name="Desarrollo29" content="Desarrollo29" data-react-helmet="true" />
         </Helmet>
         <ReportarErrorComponent userData={userData} />
      </>
   );
}
