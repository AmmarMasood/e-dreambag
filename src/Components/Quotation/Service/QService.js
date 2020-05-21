import React, { useState, useContext } from "react";
import "./QService.css";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import {
  priceContext,
  carrierPriceF,
  regularPriceF
} from "../../../State/Store";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Estimate from "./Estimate";

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});
const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const ExpansionPanel = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0
    },
    "&:before": {
      display: "none"
    },
    "&$expanded": {
      margin: "auto"
    }
  },
  expanded: {}
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56
    }
  },
  content: {
    "&$expanded": {
      margin: "12px 0"
    }
  },
  expanded: {}
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(1)
  }
}))(MuiExpansionPanelDetails);

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

function QService() {
  const [regularPrice, SetRegularPrice] = useContext(regularPriceF);
  const [carrierPrice, SetCarrierPrice] = useContext(carrierPriceF);
  const [expanded, setExpanded] = React.useState("panel1");
  const [price, setPrice] = useContext(priceContext);
  const [regularDetails, setRegularDetails] = useState({
    weight: "",
    height: "",
    horizontal: "",
    vertical: ""
  });
  const [carrierDetails, setCarrierDetails] = useState({
    weight: "",
    height: "",
    horizontal: "",
    vertical: ""
  });
  const [boxType, setBoxType] = useState({
    standard: true,
    normal: false,
    carrier: false
  });
  const classes = useStyles();
  const [state, setState] = React.useState({
    oneFivekgsPrice: "",
    twoZeroKgsPrice: ""
  });
  const [openB, setOpenB] = React.useState(false);
  const [openR, setOpenR] = React.useState(false);
  const [openC, setOpenC] = React.useState(false);
  const [openPrice, setOpenPrice] = React.useState(false);
  const handleRegularBoxButton = w => {
    const b = {
      i: regularPrice.length,
      w: regularDetails.weight,
      h: regularDetails.height,
      hori: regularDetails.horizontal,
      vert: regularDetails.vertical
    };
    if (
      regularDetails.weight &&
      regularDetails.height &&
      regularDetails.horizontal &&
      regularDetails.vertical
    ) {
      SetRegularPrice(regularPrice.concat([b]));
      setRegularDetails({
        weight: "",
        height: "",
        horizontal: "",
        vertical: ""
      });
    }
    console.log(regularPrice);
  };

  const handleCarrierBoxButton = w => {
    const b = {
      i: carrierPrice.length,
      w: carrierDetails.weight,
      h: carrierDetails.height,
      hori: carrierDetails.horizontal,
      vert: carrierDetails.vertical
    };
    if (
      carrierDetails.weight &&
      carrierDetails.height &&
      carrierDetails.horizontal &&
      carrierDetails.vertical
    ) {
      SetCarrierPrice(carrierPrice.concat([b]));
      setCarrierDetails({
        weight: "",
        height: "",
        horizontal: "",
        vertical: ""
      });
    }
    console.log(carrierPrice);
  };
  const handleCloseB = () => {
    setOpenB(false);
  };
  const handleToggleB = () => {
    setOpenB(!openB);
  };
  const handleCloseR = () => {
    setOpenR(false);
  };
  const handleToggleR = () => {
    setOpenR(!openR);
  };
  const handleCloseC = () => {
    setOpenC(false);
  };
  const handleToggleC = () => {
    setOpenC(!openC);
  };
  const handleClosePrice = () => {
    setOpenPrice(false);
  };
  const handleTogglePrice = () => {
    setOpenPrice(!openPrice);
  };
  const closeReg = e => {
    console.log(e.i);
    var filtered = regularPrice.filter(function(el) {
      return el.i != e.i;
    });
    SetRegularPrice(filtered);
  };
  const closeCar = e => {
    console.log(e.i);
    var filtered = carrierPrice.filter(function(el) {
      return el.i != e.i;
    });
    SetCarrierPrice(filtered);
  };
  const getRegularCard = () =>
    regularPrice.map(e => (
      <ListItem style={{ padding: "0 5px 0 5px" }}>
        <div key={e.w} className="listRegular">
          <div>{e.w} lbs</div>
          <div>
            {e.h}x{e.hori}x{e.vert}
          </div>
          <div>$ NA</div>
          <div>
            <CloseIcon
              onClick={() => closeReg(e)}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      </ListItem>
    ));
  const getCarrierCard = () =>
    carrierPrice.map(e => (
      <ListItem style={{ padding: "0 5px 0 5px" }}>
        <div key={e.w} className="listRegular">
          <div>{e.w} lbs</div>
          <div>
            {e.h}x{e.hori}x{e.vert}
          </div>
          <div>$ NA</div>
          <div>
            <CloseIcon
              onClick={() => closeCar(e)}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      </ListItem>
    ));

  const handleChange2 = event => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value
    });

    if (name === "oneFivekgsPrice") {
      setPrice({ ...price, [name]: event.target.value });
    }
    if (name === "twoZeroKgsPrice") {
      setPrice({ ...price, [name]: event.target.value });
    }
  };
  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
    if (panel === "panel1") {
      setBoxType({
        standard: true,
        normal: false,
        carrier: false
      });
    }
    if (panel === "panel2") {
      setBoxType({
        standard: false,
        normal: true,
        carrier: false
      });
    }
    if (panel === "panel3") {
      setBoxType({
        standard: false,
        normal: false,
        carrier: true
      });
    }
  };

  const standardImage = () => {
    return (
      <>
        <div className="image">
          {/* <img src="../Images/standard.jpg" alt="" style={{ width: "500px" }} /> */}
          <img
            src={require("../../../Images/standard.jpg")}
            alt=""
            height="300px"
          />
        </div>
        <div className="image-info">
          <div className="image-info--1">Standard box service</div>
          <div className="image-info--2">Volume 20 * 20 * 12 inch</div>
          <div className="image-info--3">
            <div className="image-info--3-1">
              <div>15 kg</div>
              <div style={{ fontSize: "14px" }}>Bulky and light load</div>
            </div>
            <div className="image-info--3-2">
              <div>20 kg</div>
              <div style={{ fontSize: "14px" }}>
                {" "}
                Perfect for a small amount
                <br /> of return luggage
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  const normalImage = () => {
    return (
      <>
        <div className="image">
          {/* <img src="../Images/standard.jpg" alt="" style={{ width: "500px" }} /> */}
          <img
            src={require("../../../Images/normalBox.jpg")}
            alt=""
            height="300px"
          />
        </div>
        <div className="image-info">
          <div className="image-info--1">General box service</div>
          <div className="image-info--2">Recommended weight</div>
          <div className="image-info--3">
            <div className="image-info--3-1">
              <div>44</div>
              <div style={{ fontSize: "14px" }}> LBS / Box</div>
            </div>
            <div className="image-info--3-2">
              <div>55 inches </div>
              <div style={{ fontSize: "14px" }}> of three sides</div>
            </div>
          </div>
        </div>
      </>
    );
  };
  const carrierImage = () => {
    return (
      <>
        <div className="image">
          {/* <img src="../Images/standard.jpg" alt="" style={{ width: "500px" }} /> */}
          <img
            src={require("../../../Images/carrier.png")}
            alt=""
            height="250px"
          />
        </div>
        <div className="image-info">
          <div className="image-info--1">Carrier service</div>
          <div className="image-info--2"></div>
          <div className="image-info--3">
            <div className="image-info--3-1">
              <div>Recommended weight</div>
              <div style={{ fontSize: "14px" }}>
                44 LBS / Pack Carrier <br />
                less than 28 inches
              </div>
            </div>
            <div className="image-info--3-2">
              <div>Service available</div>
              <div style={{ fontSize: "14px" }}>
                {" "}
                Volume / weight up to 70 LBS up to <br />
                35 inch carrier
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div>
        <Dialog
          onClose={handleClosePrice}
          aria-labelledby="customized-dialog-title"
          open={openPrice}
        >
          <DialogTitle id="customized-dialog-title" onClose={handleClosePrice}>
            Estimated Shipping Cost
          </DialogTitle>
          <Estimate />
          {/* <DialogActions>
            <Button autoFocus color="primary">
              Save changes
            </Button>
          </DialogActions> */}
        </Dialog>
      </div>
      <div>
        <Dialog
          onClose={handleCloseB}
          aria-labelledby="customized-dialog-title"
          open={openB}
        >
          <DialogTitle id="customized-dialog-title" onClose={handleCloseB}>
            Standard box
          </DialogTitle>
          <DialogContent dividers style={{ padding: "30px" }}>
            <Typography gutterBottom>
              <h4 style={{ margin: 0, padding: 0 }}>
                Advantages of using a standard box:
              </h4>
              <p style={{ margin: 0, padding: 0 }}>
                - Standard size box to prevent overweight and volume
              </p>
              <p style={{ margin: 0, padding: 0 }}>
                - When using a regular box, it provides a lower price table than
                the rate table
              </p>
              <p style={{ margin: 0, padding: 0 }}>
                - In case of price promotion, the standard box is given first.
              </p>
              <p style={{ margin: 0, padding: 0 }}>
                - It is unlikely that additional charges will be incurred when
                shipping to Korea in a standard volume.
              </p>
            </Typography>
            <Typography gutterBottom>
              <h4 style={{ margin: 0, padding: 0 }}>
                Standard box size information:
              </h4>
              <p style={{ margin: 0, padding: 0 }}>
                - 20 * 20 * 12 inch box ($ 4 + Tax / box) sold by FedEx Office
              </p>
              <p style={{ margin: 0, padding: 0 }}>
                - Box sent when applying at the box / label delivery service
                (optional item)
              </p>
              <p style={{ margin: 0, padding: 0 }}>
                - Minimum weight 33LBS (15kg) ~ maximum 44LBS (20kg) / pack
                available
              </p>
            </Typography>
            <Typography gutterBottom>
              <h4 style={{ margin: 0, padding: 0 }}>
                When it is difficult to purchase a standard box:
              </h4>
              <p style={{ margin: 0, padding: 0 }}>
                - When applying for service, if you request the delivery of the
                box and label of option 3, the same rate table and special price
                as the standard box may be applied.
              </p>
            </Typography>
            <Typography gutterBottom>
              <h4 style={{ margin: 0, padding: 0 }}>
                Precautions when applying with the standard box:
              </h4>
              <p style={{ margin: 0, padding: 0 }}>
                - The 20 * 20 * 20 size of the Fedex purchase box is not
                recognized as a standard box.
              </p>
              <p style={{ margin: 0, padding: 0 }}>
                - If you use the box of another store (UPS, Home Depot, You
                Hall) even if it is the same size, an additional fee may be
                charged later if you apply as a standard box.
              </p>
              <p style={{ margin: 0, padding: 0 }}>
                - Even if the box size is reduced to the same size as the
                standard box, it is not recognized as a standard box.
              </p>
              <p style={{ margin: 0, padding: 0, color: "red" }}>
                If you cannot obtain a standard box, please use the box / label
                delivery service.
              </p>
            </Typography>
          </DialogContent>
          {/* <DialogActions>
            <Button autoFocus color="primary">
              Save changes
            </Button>
          </DialogActions> */}
        </Dialog>
      </div>
      <div>
        <Dialog
          onClose={handleCloseR}
          aria-labelledby="customized-dialog-title"
          open={openR}
        >
          <DialogTitle id="customized-dialog-title" onClose={handleCloseR}>
            Regular box
          </DialogTitle>
          <DialogContent dividers style={{ padding: "30px" }}>
            <Typography gutterBottom>
              <p style={{ margin: 5, padding: 0 }}>
                - For items with a length of 28 inches on one side and 55 inches
                on the three sides, a calculation fee + additional handling will
                be incurred.
              </p>
              <p style={{ margin: 5, padding: 0 }}>
                - It is settled to the higher of the actual weight and the bulk
                weight.
              </p>
              <p style={{ margin: 5, padding: 0 }}>
                - Shipping costs are settled according to the volume and weight
                of the packaged condition.
              </p>
              <p style={{ margin: 5, padding: 0 }}>
                - In the case of electronic devices or fragile items (bowl,
                etc.), damage caused by self-packing will be indemnified. Pack
                with Fedex for a fee.
              </p>
            </Typography>
          </DialogContent>
          {/* <DialogActions>
            <Button autoFocus color="primary">
              Save changes
            </Button>
          </DialogActions> */}
        </Dialog>
      </div>
      <div>
        <Dialog
          onClose={handleCloseC}
          aria-labelledby="customized-dialog-title"
          open={openC}
        >
          <DialogTitle id="customized-dialog-title" onClose={handleCloseC}>
            Carrier
          </DialogTitle>
          <DialogContent dividers style={{ padding: "30px" }}>
            <Typography gutterBottom>
              <p style={{ margin: 5, padding: 0 }}>
                - Only carriers of 28 inches or less and 20 kg or less can be
                shipped.
              </p>
              <p style={{ margin: 5, padding: 0 }}>
                - The carrier must be packed for safe shipment.
              </p>
              <p style={{ margin: 5, padding: 0 }}>
                - Volume charges may increase due to packing.
              </p>
              <p style={{ margin: 5, padding: 0 }}>
                - Damage due to delivery due to unpacking is subject to
                exemption.
              </p>
              <p style={{ margin: 5, padding: 0 }}>
                - Shipping costs are settled according to the volume and weight
                of the packing.
              </p>
            </Typography>
          </DialogContent>
          {/* <DialogActions>
            <Button autoFocus color="primary">
              Save changes
            </Button>
          </DialogActions> */}
        </Dialog>
      </div>
      <div className="services">
        {/* {console.log(price)} */}
        <div className="services-image">
          {boxType.standard
            ? standardImage()
            : boxType.normal
            ? normalImage()
            : boxType.carrier
            ? carrierImage()
            : ""}
        </div>
        <div className="services-info">
          <div>
            <ExpansionPanel
              square
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <ExpansionPanelSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography>Use a Standard Box</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div className="standard-box-style">
                  <Typography
                    style={{
                      textAlign: "left",
                      margin: "0",
                      paddingLeft: "10px"
                    }}
                  >
                    <Button
                      style={{ margin: 0, padding: 0 }}
                      color="primary"
                      onClick={handleToggleB}
                    >
                      Check Details
                    </Button>
                  </Typography>
                  <div>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <InputLabel htmlFor="outlined-age-native-simple">
                        15 KG
                      </InputLabel>
                      <Select
                        native
                        value={state.oneFivekgsPrice}
                        onChange={handleChange2}
                        label="Age"
                        style={{ width: "150px" }}
                        inputProps={{
                          name: "oneFivekgsPrice",
                          id: "outlined-age-native-simple"
                        }}
                      >
                        <option aria-label="None" value="" />

                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                        <option value={10}>10</option>
                        <option value={11}>11</option>
                        <option value={12}>12</option>
                        <option value={13}>13</option>
                        <option value={14}>14</option>
                        <option value={15}>15</option>
                        <option value={16}>16</option>
                        <option value={17}>17</option>
                        <option value={18}>18</option>
                        <option value={19}>19</option>
                        <option value={20}>20</option>
                      </Select>
                    </FormControl>
                    <TextField
                      style={{ width: "90px", margin: "8px" }}
                      id="outlined-basic"
                      value={`$ ${
                        price.oneFivekgsPrice * 178
                          ? price.oneFivekgsPrice * 178
                          : ""
                      }`}
                      disabled
                      variant="outlined"
                    />
                  </div>

                  <div>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <InputLabel htmlFor="outlined-age-native-simple">
                        30 KG
                      </InputLabel>
                      <Select
                        native
                        value={state.twoZeroKgsPrice}
                        onChange={handleChange2}
                        label="Age"
                        style={{ width: "150px" }}
                        inputProps={{
                          name: "twoZeroKgsPrice",
                          id: "outlined-age-native-simple"
                        }}
                      >
                        <option aria-label="None" value="" />
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                        <option value={10}>10</option>
                        <option value={11}>11</option>
                        <option value={12}>12</option>
                        <option value={13}>13</option>
                        <option value={14}>14</option>
                        <option value={15}>15</option>
                        <option value={16}>16</option>
                        <option value={17}>17</option>
                        <option value={18}>18</option>
                        <option value={19}>19</option>
                        <option value={20}>20</option>
                      </Select>
                    </FormControl>
                    <TextField
                      style={{ width: "90px", margin: "8px" }}
                      id="outlined-basic"
                      value={`$ ${
                        price.twoZeroKgsPrice * 258
                          ? price.twoZeroKgsPrice * 258
                          : ""
                      }`}
                      disabled
                      variant="outlined"
                    />
                  </div>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              square
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <ExpansionPanelSummary
                aria-controls="panel2d-content"
                id="panel2d-header"
              >
                <Typography>Use a Regular Box</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div className="setRegular">
                  {/* first div check details */}
                  <div>
                    <Typography
                      style={{
                        textAlign: "left",
                        margin: "0",
                        paddingLeft: "0px"
                      }}
                    >
                      <Button
                        style={{ margin: 0, padding: 0 }}
                        color="primary"
                        onClick={handleToggleR}
                      >
                        Check Details
                      </Button>
                    </Typography>
                  </div>
                  {/* ends */}
                  {/* 2nd div for add and heading */}
                  <div className="r-head">
                    Enter the packed weight (lbs) and volume (inch).
                    <div>
                      <Button onClick={handleRegularBoxButton}>+ Add</Button>
                    </div>
                  </div>
                  {/* end */}
                  {/* 3 div for volume show */}
                  <div className="regular-volume">
                    {/* 3 div first part */}
                    <div className="regular-volume-1">
                      <div
                        className="label"
                        style={{
                          fontSize: "14px",
                          textAlign: "left",
                          paddingBottom: "10px"
                        }}
                      >
                        Weight
                      </div>
                      <div
                        className="label"
                        style={{
                          fontSize: "14px",
                          textAlign: "left",
                          paddingBottom: "10px"
                        }}
                      >
                        Volume
                      </div>
                    </div>
                    {/* 3 div 2 part */}
                    <div className="regular-volume-2">
                      <div>
                        <TextField
                          value={regularDetails.weight}
                          onChange={e =>
                            setRegularDetails({
                              ...regularDetails,
                              weight: e.target.value
                            })
                          }
                          style={{ width: "60px", fontSize: "20px" }}
                          id="outlined-basic"
                          label="LBS"
                          variant="outlined"
                        />
                      </div>
                      <div>
                        <TextField
                          style={{ width: "100px" }}
                          id="outlined-basic"
                          label="Horizontal"
                          variant="outlined"
                          value={regularDetails.horizontal}
                          onChange={e =>
                            setRegularDetails({
                              ...regularDetails,
                              horizontal: e.target.value
                            })
                          }
                        />
                      </div>
                      <div>
                        <TextField
                          style={{ width: "80px" }}
                          id="outlined-basic"
                          label="Vertical"
                          variant="outlined"
                          value={regularDetails.vertical}
                          onChange={e =>
                            setRegularDetails({
                              ...regularDetails,
                              vertical: e.target.value
                            })
                          }
                        />
                      </div>

                      <div>
                        <TextField
                          style={{ width: "80px" }}
                          id="outlined-basic"
                          label="Height"
                          variant="outlined"
                          value={regularDetails.height}
                          onChange={e =>
                            setRegularDetails({
                              ...regularDetails,
                              height: e.target.value
                            })
                          }
                        />
                      </div>
                    </div>
                    {/* end of 3 part */}
                  </div>
                  {/* end of 3rd */}
                  <div>
                    <List>{getRegularCard()}</List>
                  </div>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              square
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
            >
              <ExpansionPanelSummary
                aria-controls="panel3d-content"
                id="panel3d-header"
              >
                <Typography>Use a Standard Carrier</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div className="setRegular">
                  {/* first div check details */}
                  <div>
                    <Typography
                      style={{
                        textAlign: "left",
                        margin: "0",
                        paddingLeft: "0px"
                      }}
                    >
                      <Button
                        style={{ margin: 0, padding: 0 }}
                        color="primary"
                        onClick={handleToggleC}
                      >
                        Check Details
                      </Button>
                    </Typography>
                  </div>
                  {/* ends */}
                  {/* 2nd div for add and heading */}
                  <div className="r-head">
                    Enter the packed weight (lbs) and volume (inch).
                    <div>
                      <Button onClick={handleCarrierBoxButton}>+ Add</Button>
                    </div>
                  </div>
                  {/* end */}
                  {/* 3 div for volume show */}
                  <div className="regular-volume">
                    {/* 3 div first part */}
                    <div className="regular-volume-1">
                      <div
                        className="label"
                        style={{
                          fontSize: "14px",
                          textAlign: "left",
                          paddingBottom: "10px"
                        }}
                      >
                        Weight
                      </div>
                      <div
                        className="label"
                        style={{
                          fontSize: "14px",
                          textAlign: "left",
                          paddingBottom: "10px"
                        }}
                      >
                        Volume
                      </div>
                    </div>
                    {/* 3 div 2 part */}
                    <div className="regular-volume-2">
                      <div>
                        <TextField
                          value={carrierDetails.weight}
                          onChange={e =>
                            setCarrierDetails({
                              ...carrierDetails,
                              weight: e.target.value
                            })
                          }
                          style={{ width: "60px", fontSize: "20px" }}
                          id="outlined-basic"
                          label="LBS"
                          variant="outlined"
                        />
                      </div>
                      <div>
                        <TextField
                          style={{ width: "100px" }}
                          id="outlined-basic"
                          label="Horizontal"
                          variant="outlined"
                          value={carrierDetails.horizontal}
                          onChange={e =>
                            setCarrierDetails({
                              ...carrierDetails,
                              horizontal: e.target.value
                            })
                          }
                        />
                      </div>
                      <div>
                        <TextField
                          style={{ width: "80px" }}
                          id="outlined-basic"
                          label="Vertical"
                          variant="outlined"
                          value={carrierDetails.vertical}
                          onChange={e =>
                            setCarrierDetails({
                              ...carrierDetails,
                              vertical: e.target.value
                            })
                          }
                        />
                      </div>

                      <div>
                        <TextField
                          style={{ width: "80px" }}
                          id="outlined-basic"
                          label="Height"
                          variant="outlined"
                          value={carrierDetails.height}
                          onChange={e =>
                            setCarrierDetails({
                              ...carrierDetails,
                              height: e.target.value
                            })
                          }
                        />
                      </div>
                    </div>
                    {/* end of 3 part */}
                  </div>
                  {/* end of 3rd */}
                  <div>
                    <List>{getCarrierCard()}</List>
                  </div>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <Button
              variant="contained"
              color="primary"
              style={{ margin: "10px" }}
              onClick={handleTogglePrice}
            >
              Estimate Delivery Cost
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default QService;
