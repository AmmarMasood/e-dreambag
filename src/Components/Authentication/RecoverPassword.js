import React, { useState } from "react";
import Nav from "../Quotation/Appbar/QAppbar";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import EmailIcon from "@material-ui/icons/Email";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";
import axios from "axios";
import { server } from "../../Utils/Server";
import LockIcon from "@material-ui/icons/Lock";

const mainStyle = {
  // border: "2px solid red",
  fontFamily: '"Titillium Web", sans-serif'
};
const emailForm = {
  padding: "20px",
  width: "50%",
  marginLeft: "25%",
  textAlign: "center",
  marginTop: "50px"
};

function RecoverPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailCorrect, setIsEmailCorrect] = useState(false);
  const [resToken, setResToken] = useState("");

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

  const handleCheckEmail = () => {
    if (!isEmailCorrect) {
      setIsLoading(true);
      // if (!errors.email) {
      //   axios
      //     .post(`${server}/sehd-reset-email`, {email})
      //     .then(res => {
      //       setIsLoading(false);
      //       setIsEmailCorrect(true);
      //       setResToken(res.data.token);
      //     })
      //     .catch(err => {
      //       setIsLoading(false);
      //       setIsEmailCorrect(false);
      //       setErrors({ ...errors, email: "The email you entered is incorrect" });
      //     });
      // }
    } else {
      // send the other request given the token
      // setIsLoading(true);
    }
  };

  const showEmailForm = () => {
    return (
      <div style={{ padding: "15px" }}>
        <FormControl fullWidth>
          <InputLabel htmlFor="standard-adornment-amount">
            Enter Your Email Address
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
      </div>
    );
  };

  const showPasswordForm = () => {
    return (
      <div>
        <div style={{ padding: "15px" }}>
          <FormControl fullWidth>
            <InputLabel htmlFor="standard-adornment-amount">
              Enter Your New Password
            </InputLabel>
            <Input
              id="standard-adornment-amount"
              value={password}
              error={errors.password}
              type="email"
              helperText={errors.password}
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
        </div>
        <div style={{ padding: "15px" }}>
          <FormControl fullWidth>
            <InputLabel htmlFor="standard-adornment-amount">
              Confirm Your New Password
            </InputLabel>
            <Input
              id="standard-adornment-amount"
              value={password2}
              error={errors.password2}
              type="email"
              helperText={errors.password2}
              onChange={e => setPassword2(e.target.value)}
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
              {errors.password2}
            </label>
          </FormControl>
        </div>
      </div>
    );
  };
  return (
    <>
      <Nav />
      <div style={mainStyle}>
        <div className="Login-form--heading">Recover Your Password</div>
        <div style={emailForm}>
          {isEmailCorrect ? showPasswordForm() : showEmailForm()}
        </div>
        <div>
          {isLoading ? (
            <Fade
              in={isLoading}
              style={{
                transitionDelay: isLoading ? "0ms" : "0ms"
              }}
              unmountOnExit
            >
              <CircularProgress />
            </Fade>
          ) : (
            <Button
              // startIcon={<PersonAddIcon />}
              variant="contained"
              color="primary"
              onClick={handleCheckEmail}
            >
              Submit
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default RecoverPassword;
