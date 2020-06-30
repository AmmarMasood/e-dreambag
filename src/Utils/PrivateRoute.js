//this route will be used as a component for protected tourtes
import React from "react";
import { Route, Redirect } from "react-router-dom";
import jwtDecode from "jwt-decode";

const checkIsAuthenticated = () => {
  if (localStorage.getItem("token") && localStorage.getItem("role")) {
    if (jwtDecode(localStorage.getItem("token")).exp < Date.now() / 1000) {
      localStorage.clear();
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      checkIsAuthenticated() === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

export default PrivateRoute;
