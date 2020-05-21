import React from "react";
import "./App.css";
import Quotation from "./Components/Quotation/Quotation";
import Home from "./Components/Home/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/estimate" component={Quotation} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
