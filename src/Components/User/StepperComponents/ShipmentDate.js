import React, { useState, useEffect } from "react";
import MomentUtils from "@date-io/moment";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
// import Radio from "@material-ui/core/Radio";
// import RadioGroup from "@material-ui/core/RadioGroup";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import moment from "moment";
import setAuthToken from "../../../Utils/setAuthToken";
import axios from "axios";
import { server } from "../../../Utils/Server";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ShipmentDate({ id }) {
  const [loading, setLoading] = useState(false);
  const [shipmentDate, setShipmentDate] = useState("");
  const [openNotification, setOpenNotification] = useState(false);
  const [notificationType, setNotificationType] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  // const [type, setType] = useState("personal");

  useEffect(() => {
    setLoading(true);
    setAuthToken(localStorage.getItem("token"));
    axios
      .get(`${server}/shipmentdate?luggageId=${id}`, { data: {} })
      .then(res => {
        setShipmentDate({ _d: res.data.shipmentDate });
        setLoading(false);
      })
      .catch(err => {
        // window.alert(err);
        console.log(err);
        setNotificationMessage("Error: Unable get the Date ");
        setNotificationType("error");
        setOpenNotification(true);
        setLoading(false);
      });
  }, []);

  const handleDateChange = date => {
    setShipmentDate(date);
  };

  const onButtonSubmit = () => {
    setAuthToken(localStorage.getItem("token"));
    const obj = {
      shipmentDate: shipmentDate._d
        ? moment(shipmentDate._d).format(moment.HTML5_FMT.DATE)
        : moment(new Date()).format(moment.HTML5_FMT.DATE)
    };
    axios
      .post(`${server}/shipmentdate?luggageId=${id}`, obj)
      .then(res => {
        setNotificationMessage("Success: Updated the date");
        setNotificationType("success");
        setOpenNotification(true);
      })
      .catch(err => {
        console.log(err);
        setNotificationMessage("Error: Unable to update the Address");
        setNotificationType("error");
        setOpenNotification(true);
      });
    console.log(obj);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      setOpenNotification(false);
    }

    setOpenNotification(false);
  };
  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          <Snackbar
            open={openNotification}
            autoHideDuration={2000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity={notificationType}>
              {notificationMessage}
            </Alert>
          </Snackbar>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
              style={{ width: "60%" }}
              disableToolbar
              variant="inline"
              format="DD/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Select a Shipment Date"
              value={shipmentDate._d}
              onChange={handleDateChange}
            />
          </MuiPickersUtilsProvider>
          <div>
            {/* <FormControl component="fieldset">
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
            </FormControl> */}
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
      )}
    </div>
  );
}

export default ShipmentDate;
