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
        <title>Web App by Eclesia Digital </title>
        <meta
          name='Eclesia-Digital'
          content='Eclesia Digital'
          data-react-helmet='true'
        />
      </Helmet>
      <ReportarErrorComponent userData={userData} />
    </>
  );
}
