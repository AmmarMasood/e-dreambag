import React, { useState, useContext } from "react";
import "./Form.css";
import QAppbar from "../Quotation/Appbar/QAppbar";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { server } from "../../Utils/Server";
import { fromAddressContext } from "../../State/Store";

function Form2() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [country, setCountry] = useState("");
  const [street1, setStreet1] = useState("");
  const [street2, setStreet2] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("");
  const [email, setEmail] = useState("");
  const [fromAddress, setFromAddress] = useContext(fromAddressContext);

  // const [weight, setWeight] = useState("");
  // const [height, setHeight] = useState("");
  // const [width, setWidth] = useState("");
  // const [length, setLength] = useState("");
  const onButtonSubmit = () => {
    const obj = {
      name,
      country,
      company,
      street1,
      street2,
      city,
      zip,
      phone,
      state,
      email
    };
    setFromAddress(obj);
    window.alert("Address Added");
  };

  return (
    <div className="Form-main">
      <div className="Form1-main">
        <Grid container spacing={3}>
          <h3 style={{ textDecoration: "underline" }}>From Address:</h3>
          <Grid item xs={12}>
            <TextField
              style={{ width: "100%" }}
              id="Outlined"
              label="Name"
              type="text"
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              style={{ width: "100%" }}
              id="Outlined"
              label="Country"
              type="text"
              name="country"
              value={country}
              onChange={e => setCountry(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              style={{ width: "100%" }}
              id="Outlined"
              label="Company"
              type="text"
              name="company"
              value={company}
              onChange={e => setCompany(e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              style={{ width: "100%" }}
              id="Outlined"
              label="Street 1"
              type="text"
              name="street1"
              value={street1}
              onChange={e => setStreet1(e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              style={{ width: "100%" }}
              id="Outlined"
              label="Street 2"
              type="text"
              name="street2"
              value={street2}
              onChange={e => setStreet2(e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              style={{ width: "100%" }}
              id="Outlined"
              label="City"
              type="text"
              name="city"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              style={{ width: "100%" }}
              id="Outlined"
              label="Zip"
              type="text"
              name="zip"
              value={zip}
              onChange={e => setZip(e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              style={{ width: "100%" }}
              id="Outlined"
              label="State"
              type="text"
              name="state"
              value={state}
              onChange={e => setState(e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              style={{ width: "100%" }}
              id="Outlined"
              label="Phone"
              type="text"
              name="phone"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              style={{ width: "100%" }}
              id="Outlined"
              label="Email"
              type="text"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </Grid>
        </Grid>
        {/* <Grid container spacing={3} style={{ marginTop: "30px" }}>
          <h3
            style={{
              textDecoration: "underline",
              width: "100%",
              textAlign: "left"
            }}
          >
            Parcel Dimensions:
          </h3>

          <Grid item xs={3}>
            <TextField
              style={{ width: "100%" }}
              id="Outlined"
              label="Weight"
              type="text"
              name="weight"
              value={weight}
              onChange={e => setWeight(e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              style={{ width: "100%" }}
              id="Outlined"
              label="Height"
              type="text"
              name="height"
              value={height}
              onChange={e => setHeight(e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              style={{ width: "100%" }}
              id="Outlined"
              label="Width"
              type="text"
              name="width"
              value={width}
              onChange={e => setWidth(e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              style={{ width: "100%" }}
              id="Outlined"
              label="Length"
              type="text"
              name="length"
              value={length}
              onChange={e => setLength(e.target.value)}
            />
          </Grid>
        </Grid> */}

        <Grid item xs={12} style={{ textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "50px", marginBotton: "100px" }}
            onClick={onButtonSubmit}
          >
            Click to Enter Address
          </Button>
        </Grid>
      </div>
    </div>
  );
}

export default Form2;
