import React, { useState } from "react";
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
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import "./Authentication.css";
import axios from "axios";
import { server } from "../../Utils/Server";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = React.useState(false);

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

  const onHandleSignUp = () => {
    if (firstName.length <= 0) {
      setErrors({ ...errors, firstName: "Please enter first name" });
    } else if (lastName.length <= 0) {
      setErrors({ ...errors, lastName: "Please enter last name" });
    } else if (password.length <= 0) {
      setErrors({ ...errors, password: "Please enter password" });
    } else if (!validateEmail(email)) {
      setErrors({
        ...errors,
        email: "Please enter valid Email Address"
      });
    } else {
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
          window.alert("SignUp successfull");
        })
        .catch(err => console.log(err));
    }

    // if(email.errors ){}
  };

  return (
    <div className="signup-main">
      <Nav />
      <div className="signup-form">
        <div className="signup-form--heading">Sign Up Now</div>
        <div className="signup-form--fields">
          <FormControl fullWidth>
            <InputLabel htmlFor="standard-adornment-amount">
              First Name
            </InputLabel>
            <Input
              id="standard-adornment-amount"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
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
          <FormControl fullWidth>
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
          </FormControl>
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

export default Signup;
