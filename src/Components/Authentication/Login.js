import React, { useState, useEffect } from "react";
import Nav from "../Quotation/Appbar/QAppbar";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { Link, withRouter } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import "./Authentication.css";
import axios from "axios";
import { server } from "../../Utils/Server";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("role")) {
      localStorage.getItem("role") === "USER"
        ? props.history.push("/user-dashboard")
        : props.history.push("/admin-dashboard");
    } else {
      localStorage.clear();
    }
  }, []);

  const onHandleSubmit = () => {
    localStorage.setItem(
      "token",
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImp0aSI6ImM1M2VmZjFiLTExNGItNDE5Yy1iMWI1LTEzZDk4ZmUzZmY4NCIsImlhdCI6MTU5MzQyNjAxMywiZXhwIjoxNTkzNDI5NjEzfQ.viDrxV9-8Y70ovalIvLA8GvGRU4FSrimE5v4lfzZcMI"
    );
    localStorage.setItem("role", "USER");
    const obj = {
      username: email,
      password
    };
    axios
      .post(`${server}/auth/login`, obj)
      .then(res => {
        const token = res.data.accessToken;
        const role = res.data.roles[0].name;
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        role === "USER"
          ? props.history.push("/user-dashboard")
          : props.history.push("/admin-dashboard");
      })
      .catch(err => {
        window.alert(err);
        console.log(err);
      });
  };

  return (
    <div className="Login-main">
      <Nav />
      <div className="Login-form">
        <div className="Login-form--heading">Login Now</div>
        <div className="Login-form--fields">
          <FormControl fullWidth>
            <InputLabel htmlFor="standard-adornment-amount">
              Username
            </InputLabel>
            <Input
              id="standard-adornment-amount"
              value={email}
              // error={errors.email}
              type="email"
              // helperText={errors.email}
              onChange={e => setEmail(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              }
            />
            {/* <label
              style={{
                textAlign: "left",
                color: "red",
                padding: "3px",
                fontSize: "13px"
              }}
            >
              {errors.email}
            </label> */}
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
              onClick={() => onHandleSubmit()}
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
          <div>
            Are you an Admin?{" "}
            <MenuItem
              style={{
                display: "inline",
                color: "blue",
                textDecoration: "underline",
                padding: "2px"
              }}
              component={Link}
              to={"/admin-login"}
            >
              Admin Login
            </MenuItem>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Login);
