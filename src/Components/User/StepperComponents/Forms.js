import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { server } from "../../../Utils/Server";

function Forms({ usa, orderId }) {
  const [state, setState] = useState({
    name: "",
    company: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    zip: "",
    phone: "",
    state: "",
    email: ""
  });

  const onButtonSubmit = () => {
    console.log(state, orderId);
  };

  const handleChange = e => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value
    });
  };
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            style={{ width: "100%" }}
            id="Outlined"
            label="Name"
            type="text"
            name="name"
            value={state.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            style={{ width: "100%" }}
            id="Outlined"
            label="Country"
            type="text"
            name="country"
            value={state.country}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            style={{ width: "100%" }}
            id="Outlined"
            label="Company"
            type="text"
            name="company"
            value={state.company}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            style={{ width: "100%" }}
            id="Outlined"
            label="Street 1"
            type="text"
            name="street1"
            value={state.street1}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            style={{ width: "100%" }}
            id="Outlined"
            label="Street 2"
            type="text"
            name="street2"
            value={state.street2}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            style={{ width: "100%" }}
            id="Outlined"
            label="City"
            type="text"
            name="city"
            value={state.city}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            style={{ width: "100%" }}
            id="Outlined"
            label="Zip"
            type="text"
            name="zip"
            value={state.zip}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            style={{ width: "100%" }}
            id="Outlined"
            label="State"
            type="text"
            name="state"
            value={state.state}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            style={{ width: "100%" }}
            id="Outlined"
            label="Phone"
            type="text"
            name="phone"
            value={state.phone}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            style={{ width: "100%" }}
            id="Outlined"
            label="Email"
            type="text"
            name="email"
            value={state.email}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} style={{ textAlign: "center" }}>
        <Button
          variant="contained"
          color="default"
          style={{ marginTop: "50px", marginBotton: "100px" }}
          onClick={onButtonSubmit}
        >
          Update
        </Button>
      </Grid>
    </div>
  );
}

export default Forms;
