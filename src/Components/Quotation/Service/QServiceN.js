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
  regularPriceF,
  boxTypeContext
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

function QServiceN() {
  const [boxTypeToSend, setBoxTypeToSend] = useContext(boxTypeContext);
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
    hamnipostBox: false,
    hamnipostCarrier: false,
    ownBox: false,
    homedepotBox: false
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
        hamnipostBox: true,
        hamnipostCarrier: false,
        ownBox: false,
        homedepotBox: false
      });
      setBoxTypeToSend("hamnipost-box");
    }
    if (panel === "panel2") {
      setBoxType({
        hamnipostBox: false,
        hamnipostCarrier: true,
        ownBox: false,
        homedepotBox: false
      });
      setBoxTypeToSend("carrier");
    }
    if (panel === "panel3") {
      setBoxType({
        hamnipostBox: false,
        hamnipostCarrier: false,
        ownBox: true,
        homedepotBox: false
      });
      setBoxTypeToSend("own-box");
    }
    if (panel === "panel4") {
      setBoxType({
        hamnipostBox: false,
        hamnipostCarrier: false,
        ownBox: false,
        homedepotBox: true
      });
      setBoxTypeToSend("homedepot-box");
    }
  };

  const hamnipostBoxImage = () => {
    return (
      <>
        <div className="image">
          {/* <img src="../Images/standard.jpg" alt="" style={{ width: "500px" }} /> */}
          <img
            src={require("../../../Images/hanmipost_Box.jpg")}
            alt=""
            height="300px"
          />
          <h2>Hamnipost Box</h2>
        </div>
      </>
    );
  };
  const hamnipostCarrierImage = () => {
    return (
      <>
        <div className="image">
          {/* <img src="../Images/standard.jpg" alt="" style={{ width: "500px" }} /> */}
          <img
            src={require("../../../Images/carrier-box.jpg")}
            alt=""
            height="300px"
          />
          <h2>Carrier</h2>
        </div>
      </>
    );
  };
  const ownBoxImage = () => {
    return (
      <>
        <div className="image">
          {/* <img src="../Images/standard.jpg" alt="" style={{ width: "500px" }} /> */}
          <img
            src={require("../../../Images/UR-box.jpg")}
            alt=""
            height="250px"
          />
          <h2>Own Box</h2>
        </div>
      </>
    );
  };
  const homedepotBoxImage = () => {
    return (
      <>
        <div className="image">
          {/* <img src="../Images/standard.jpg" alt="" style={{ width: "500px" }} /> */}
          <img
            src={require("../../../Images/HD-box.jpg")}
            alt=""
            height="250px"
          />
          <h2>Homedepot Box</h2>
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

      <div className="services">
        {/* {console.log(price)} */}

        <div className="services-image">
          <div
            style={{
              textAlign: "left",
              padding: "0 0 0 20px"
            }}
          >
            <h3>Box Choosen:</h3>
          </div>

          {boxType.hamnipostBox
            ? hamnipostBoxImage()
            : boxType.hamnipostCarrier
            ? hamnipostCarrierImage()
            : boxType.ownBox
            ? ownBoxImage()
            : boxType.homedepotBox
            ? homedepotBoxImage()
            : ""}
        </div>
        <div className="services-info">
          <div>
            <ExpansionPanel
              square
              expanded={
                expanded === "panel1" ||
                expanded === "panel3" ||
                expanded === "panel4"
              }
              onChange={handleChange("panel1")}
            >
              <ExpansionPanelSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography>Choose A Box</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div className="standard-box-style">
                  <div className="hamnipost-image-parent">
                    <img
                      onClick={handleChange("panel1")}
                      className="hamnipost-image-1"
                      src={require("../../../Images/hanmipost_Box.jpg")}
                    />
                    <p>Hanmipost Box</p>
                  </div>
                  <div className="hamnipost-image-parent">
                    <img
                      onClick={handleChange("panel3")}
                      className="hamnipost-image-2"
                      src={require("../../../Images/UR-box.jpg")}
                    />
                    <p>Your own box</p>
                  </div>
                  <div className="hamnipost-image-parent">
                    <img
                      onClick={handleChange("panel4")}
                      className="hamnipost-image-2"
                      src={require("../../../Images/HD-box.jpg")}
                    />
                    <p>Home depot box</p>
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
                <Typography>Choose Carrier</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div className="carrier-image-parent">
                  <img
                    onClick={handleChange("panel2")}
                    className="carrier-image"
                    src={require("../../../Images/carrier-box.jpg")}
                  />
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            {/* <Button
              variant="contained"
              color="primary"
              style={{ margin: "10px" }}
              onClick={handleTogglePrice}
            >
              Estimate Delivery Cost
            </Button> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default QServiceN;
