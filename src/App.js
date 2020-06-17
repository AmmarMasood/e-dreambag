import React from "react";
import "./App.css";
import Quotation from "./Components/Quotation/Quotation";
import Home from "./Components/Home/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "./Components/Authentication/Signup";
import Login from "./Components/Authentication/Login";
import RecoverPassword from "./Components/Authentication/RecoverPassword";
import RecoverPassword2 from "./Components/Authentication/RecoverPassword2";
import Form1 from "./Components/Forms/Form1";
import Form2 from "./Components/Forms/Form2";
import AdminLogin from "./Components/Admin/AdminLogin";
import AdminDashboard from "./Components/Admin/AdminDashboard";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/estimate" component={Quotation} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/Signup" component={Signup} />
          <Route exact path="/recover-account" component={RecoverPassword} />
          <Route
            exact
            path="/reset-password/:token"
            component={RecoverPassword2}
          />
          <Route exact path="/form" component={Form1} />
          <Route exact path="/form-shipment" component={Form2} />
          <Route exact path="/admin-login" component={AdminLogin} />
          <Route exact path="/admin-dashboard" component={AdminDashboard} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
