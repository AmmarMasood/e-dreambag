import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Store from "./State/Store";
import setAuthToken from "./Utils/setAuthToken";

if (localStorage.getItem("token") && localStorage.getItem("role")) {
  setAuthToken(localStorage.getItem("token"));
  console.log("setting up token");
}
ReactDOM.render(
  <React.StrictMode>
    <Store>
      <App />
    </Store>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
