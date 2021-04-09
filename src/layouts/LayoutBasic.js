//jshint esversion:6
import React from "react";
import { Route, Switch } from "react-router-dom";

import Footer from "../components/Web/Footer";

import Navbar from "../components/Web/MenuTop/Navbar";

import "./LayoutBasic.scss";

export default function LayoutBasic(props) {
  const { routes } = props;

  return (
    <>
      <Navbar />

      <LoadRoutes routes={routes} />
      <Footer />
    </>
  );
}

function LoadRoutes({ routes }) {
  return (
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
    </Switch>
  );
}
