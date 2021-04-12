import React from "react";
import { Helmet } from "react-helmet";
import AdminHome from "../../components/Admin/AdminHome";

export default function Admin() {
   return (
      <>
         <Helmet>
            <title>Admin | Desarrollo 29</title>
            <meta name="admin" content="Admin | Eclesia" data-react-helmet="true" />
         </Helmet>
         <div>
            <AdminHome />
         </div>
      </>
   );
}
