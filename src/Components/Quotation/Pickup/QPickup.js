import React, { useState, useContext } from "react";
import "./QPickup.css";
import Radio from "@material-ui/core/Radio";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import "moment";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { pickupdateContext } from "../../../State/Store";
import { returndateContext } from "../../../State/Store";
import { dropoffdateContext } from "../../../State/Store";

function Pickup() {
  const [selectType, SetSelectType] = useState({ pick: true, drop: false });
  const [pickupDate, setPickupDate] = useContext(pickupdateContext);
  const [dropoffDate, setDropoffDate] = useContext(dropoffdateContext);
  const [returnDate, setReturnDate] = useContext(returndateContext);

  const handleReturnDateChange = date => {
    setReturnDate(date);
  };
  const handleDateChange = date => {
    setPickupDate(date);
  };
  const handleDropDateChange = date => {
    setDropoffDate(date);
  };
  const onPickChange = () => {
    SetSelectType({ pick: true, drop: false });
  };
  const onDropChange = () => {
    SetSelectType({ pick: false, drop: true });
  };

  const setDateComponent = () => {
    if (selectType.pick) {
      return (
        <div>
          <div>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="DD/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Select a Pickup Date"
                value={pickupDate ? pickupDate : new Date()}
                onChange={handleDateChange}
              />
            </MuiPickersUtilsProvider>
          </div>
          <div
            style={{
              textAlign: "left",
              paddingLeft: "15px",
              paddingRight: "15px"
            }}
          >
            <h4 style={{ margin: "0" }}>Pick Up</h4>
            <p style={{ fontSize: "15px", margin: "5px" }}>
              · The FedEx pick-up driver will visit you on the date you booked
              the pickup.
            </p>
            <p style={{ fontSize: "15px", margin: "5px" }}>
              · Cancellation on the day of pickup will not be refunded.
            </p>
            <p style={{ fontSize: "15px", margin: "5px" }}>
              · If the pick-up date is delayed, the discount may not be
              available.
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="DD/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Select a Drop Off Date"
                value={dropoffDate ? dropoffDate : new Date()}
                onChange={handleDropDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
          <div
            style={{
              textAlign: "left",
              paddingLeft: "15px",
              paddingRight: "15px"
            }}
          >
            <h4 style={{ margin: "0" }}>Drop Off</h4>
            <p style={{ fontSize: "15px" }}>
              · We will return your packed return luggage to the FedEx Office.
            </p>
            <p style={{ fontSize: "15px" }}>
              · Before you go to the Fedex office, be sure to put the issued
              labelble.
            </p>
          </div>
        </div>
      );
    }
  };
  return (
    <div className="pickup">
      {console.log(pickupdateContext)}
      <div className="pickup-image">
        <Card style={{ width: "80%", display: "flex" }}>
          <CardActionArea>
            <CardContent>
              {selectType.pick ? (
                <div>
                  <Typography gutterBottom variant="h4" component="h1">
                    Pickup Date
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    component="h4"
                  >
                    {pickupDate
                      ? moment(pickupDate._d).format("MMM Do YYYY")
                      : "Not Choosen"}
                  </Typography>
                </div>
              ) : (
                <div>
                  <Typography gutterBottom variant="h4" component="h1">
                    Dropoff Date
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    component="h4"
                  >
                    {dropoffDate
                      ? moment(dropoffDate._d).format("MMM Do YYYY")
                      : "Not Choosen"}
                  </Typography>
                </div>
              )}
            </CardContent>
          </CardActionArea>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h4" component="h1">
                Return Date
              </Typography>
              <Typography variant="body1" color="textSecondary" component="h4">
                {returnDate
                  ? moment(returnDate._d).format("MMM Do YYYY")
                  : "Not Choosen"}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
      <div className="pickup-info">
        <div>
          <div
            style={{
              display: "flex",
              fontSize: "15px",
              fontWeight: "500",
              justifyContent: "center"
            }}
          >
            <div>
              <Radio
                checked={selectType.pick}
                onClick={onPickChange}
                name="radio-button-demo"
                inputProps={{ "aria-label": "A" }}
                color="primary"
              />
              Pickup Date
            </div>
            <div>
              <Radio
                checked={selectType.drop}
                onClick={onDropChange}
                name="radio-button-demo"
                inputProps={{ "aria-label": "B" }}
                color="primary"
              />
              Dropoff Date
            </div>
          </div>
        </div>
        {setDateComponent()}
        <div className="return-date">
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <h4 style={{ margin: "0px 0 5px 0" }}>Estimate Return Date</h4>
            <KeyboardDatePicker
              style={{ margin: "0" }}
              disableToolbar
              variant="inline"
              format="DD/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Select a Return Date"
              value={returnDate ? returnDate : new Date()}
              onChange={handleReturnDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </MuiPickersUtilsProvider>
        </div>
      </div>
    </div>
  );
}

export default Pickup;
