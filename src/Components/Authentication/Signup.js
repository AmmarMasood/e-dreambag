import React, { useState, useEffect } from "react";
import Nav from "../Quotation/Appbar/QAppbar";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import FormControl from "@material-ui/core/FormControl";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { Link, withRouter } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import "./Authentication.css";
import axios from "axios";
import { server } from "../../Utils/Server";
import CircularProgress from "@material-ui/core/CircularProgress";

function Signup(props) {
  // i have made username as firstname
  const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("role")) {
      localStorage.getItem("role") === "USER"
        ? props.history.push("/user-dashboard")
        : props.history.push("/admin-dashboard");
    } else {
      localStorage.clear();
    }
  }, []);

  const validateEmail = email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmail = () => {
    if (!validateEmail(email)) {
      setErrors({ ...errors, email: "Please enter valid Email Address" });
      return true;
    } else {
      setErrors({ ...errors, email: "" });
      return false;
    }
  };

  const handleName = () => {
    if (firstName.length <= 0) {
      setErrors({ ...errors, firstName: "Please enter valid Username" });
      return true;
    } else {
      setErrors({ ...errors, firstName: "" });
      return false;
    }
  };

  const handlePassword = () => {
    if (password.length <= 0 || password.length <= 8) {
      setErrors({
        ...errors,
        password: "Password must have a length greater than 8 characters"
      });
      return true;
    } else {
      setErrors({
        ...errors,
        password: ""
      });
      return false;
    }
  };

  const onHandleSignUp = () => {
    // console.log(
    //   handleEmail() || handlePassword() || handleName() ? true : false
    // );
    if (!(handleEmail() || handlePassword() || handleName() ? true : false)) {
      const obj = {
        username: firstName,
        // lastName,
        email,
        password,
        roles: [1]
      };
      setLoading(true);
      axios
        .post(`${server}/auth/signup`, obj)
        .then(res => {
          setLoading(false);
          window.alert("Registration successful");
          props.history.push("/login");
        })
        .catch(err => window.alert(err));
    }
  };

  return (
    <div className="signup-main">
      <Nav />
      <div className="signup-form">
        <div className="signup-form--heading">Sign Up Now</div>
        <div className="signup-form--fields">
          <FormControl fullWidth>
            <InputLabel htmlFor="standard-adornment-amount">
              User Name
            </InputLabel>
            <Input
              id="standard-adornment-amount"
              value={firstName}
              onChange={e => {
                setFirstName(e.target.value);
                handleName();
              }}
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircleIcon />
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
              {errors.firstName}
            </label>
          </FormControl>
          {/* <FormControl fullWidth>
            <InputLabel htmlFor="standard-adornment-amount">
              Last Name
            </InputLabel>
            <Input
              id="standard-adornment-amount"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  {" "}
                  <AccountCircleIcon />
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
              {errors.lastName}
            </label>
          </FormControl> */}
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
              onChange={e => {
                setEmail(e.target.value);
                handleEmail();
              }}
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
              onChange={e => {
                setPassword(e.target.value);
                handlePassword();
              }}
              startAdornment={
                <InputAdornment position="start">
                  <LockIcon />
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
              {errors.password}
            </label>
          </FormControl>
          <div>
            {loading ? (
              <div>
                <CircularProgress />
              </div>
            ) : (
              <Button
                startIcon={<PersonAddIcon />}
                variant="contained"
                color="primary"
                onClick={onHandleSignUp}
              >
                Submit
              </Button>
            )}
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
              to={"/login"}
            >
              Go To Login
            </MenuItem>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Signup);
