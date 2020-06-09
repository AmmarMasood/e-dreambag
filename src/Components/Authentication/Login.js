import React, { useState } from "react";
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
import "./Authentication.css";
import axios from "axios";
import { server } from "../../Utils/Server";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateEmail = email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmail = e => {
    setEmail(e.target.value);
    if (!validateEmail(email)) {
      setErrors({ ...errors, email: "Please enter valid Email Address" });
    } else {
      setErrors({ ...errors, email: "" });
    }
  };
  const onHandleSubmit = () => {
    // if (!errors.email) {
    const obj = {
      username: email,
      password
    };
    axios
      .post(`${server}/auth/login`, obj)
      .then(res => console.log("Successfully LoggedIn"))
      .catch(err => console.log(err));
    // }
  };

  return (
    <div className="Login-main">
      <Nav />
      <div className="Login-form">
        <div className="Login-form--heading">Login Now</div>
        <div className="Login-form--fields">
          <FormControl fullWidth>
            <InputLabel htmlFor="standard-adornment-amount">
              Email Address
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
          <div>
            Forgot your password?{" "}
            <MenuItem
              style={{
                display: "inline",
                color: "blue",
                textDecoration: "underline",
                padding: "0px"
              }}
              component={Link}
              to={"/recover-account"}
            >
              Recover Password
            </MenuItem>
          </div>
          <div>
            Already A Member?{" "}
            <MenuItem
              style={{
                display: "inline",
                color: "blue",
                textDecoration: "underline",
                padding: "2px"
              }}
              component={Link}
              to={"/signup"}
            >
              Go To SignUp
            </MenuItem>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
