import React, { useState } from "react";
import MomentUtils from "@date-io/moment";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";

function ShipmentDate() {
  const [shipmentDate, setShipmentDate] = useState("");
  const [type, setType] = useState("personal");
  const handleDateChange = date => {
    setShipmentDate(date);
  };

  const onButtonSubmit = () => {
    console.log(shipmentDate, type);
  };

  return (
    <div>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <KeyboardDatePicker
          style={{ width: "60%" }}
          disableToolbar
          variant="inline"
          format="DD/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Select a Shipment Date"
          value={shipmentDate ? shipmentDate : new Date()}
          onChange={handleDateChange}
        />
      </MuiPickersUtilsProvider>
      <div>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="type"
            name="type"
            value={type}
            onChange={e => setType(e.target.value)}
          >
            <FormControlLabel
              value="personal"
              control={<Radio />}
              label="Pickup on the above date"
            />
            <FormControlLabel
              value="fedex"
              control={<Radio />}
              label="Fedex drop off"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <div>
        <Button
          variant="contained"
          color="default"
          style={{ marginTop: "50px", marginBotton: "100px" }}
          onClick={onButtonSubmit}
        >
          Update
        </Button>
      </div>
    </div>
  );
}

export default ShipmentDate;
