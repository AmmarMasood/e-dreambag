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

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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
          </FormControl>
          <div>
            <Button
              startIcon={<PersonAddIcon />}
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
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