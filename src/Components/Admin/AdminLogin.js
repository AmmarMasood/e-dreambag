import React, { useState, useContext } from "react";
import Nav from "../Quotation/Appbar/QAppbar";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import "../Authentication/Authentication.css";
import axios from "axios";
import { server } from "../../Utils/Server";
import { AuthContext } from "../../State/Store";
import { withRouter } from "react-router";
import setAuthToken from "../../Utils/setAuthToken";
function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [auth, setAuth] = useContext(AuthContext);

  const validateEmail = email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmail = e => {
    setEmail(e.target.value);
    // if (!validateEmail(email)) {
    //   setErrors({ ...errors, email: "Please enter valid Email Address" });
    // } else {
    //   setErrors({ ...errors, email: "" });
    // }
  };
  const onHandleSubmit = () => {
    // if (!errors.email) {
    const obj = {
      username: email,
      password
    };
    axios
      .post(`${server}/auth/login`, obj)
      .then(res => {
        setAuth({
          token: res.data.accessToken,
          role: ""
        });
        localStorage.setItem("token", res.data.accessToken);
        setAuthToken(res.data.accessToken);
        this.history.push("/admin-dashboard");
      })
      .catch(err => {
        window.alert(err);
        console.log(err);
      });
    // }
  };

  return (
    <div className="Login-main">
      <Nav />

      <div className="Login-form">
        <div className="Login-form--heading">Admin Login</div>
        <div className="Login-form--fields">
          <FormControl fullWidth>
            <InputLabel htmlFor="standard-adornment-amount">
              Username
            </InputLabel>
            <Input
              id="standard-adornment-amount"
              value={email}
              error={errors.email}
              type="email"
              helperText={errors.email}
              onChange={e => handleEmail(e)}
              startAdornment={
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              }
            />
            <label
              style={{
                textAlign: "left",
                color: "red",
                padding: "3px",
                fontSize: "13px"
              }}
            >
              {errors.email}
            </label>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="standard-adornment-amount">
              Password
            </InputLabel>
            <Input
              id="standard-adornment-amount"
              value={password}
              type="password"
              onChange={e => setPassword(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              }
            />
          </FormControl>
          <div>
            <Button
              startIcon={<PersonAddIcon />}
              variant="contained"
              color="primary"
              onClick={onHandleSubmit}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(AdminLogin);
