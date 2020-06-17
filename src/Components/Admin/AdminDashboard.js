import React, { useState, useContext, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  ListItemText,
  ListItem,
  List
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router";
import { withStyles } from "@material-ui/core/styles";
import { AuthContext } from "../../State/Store";
import axios from "axios";
import { server } from "../../Utils/Server";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(5)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});
const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);
const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography {...other}>
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

function AdminDashboard(props) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [currentDialogData, setCurrentDialogData] = useState(0);
  const [auth, setAuth] = useContext(AuthContext);
  const classes = useStyles();

  useEffect(() => {
    if (localStorage.getItem("token") === auth.token) {
      // make a get request to get items
      axios
        .get(`${server}/easypost/shipments`)
        .then(res => setData(res.data.list))
        .catch(err => window.alert(err));
    } else {
      props.history.push("/admin-login");
    }
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // dialog open box
  const MyDialog = () => {
    if (!Object.keys(data).length == 0) {
      return (
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Label Details
          </DialogTitle>
          <DialogContent dividers>
            <Typography
              gutterBottom
              style={
                {
                  // border: "2px solid red"
                }
              }
            >
              <div style={{ fontWeight: "bold" }}>From Address:</div>
              <div>
                <div>
                  <label>Country: </label>
                  {data[currentDialogData].fromAddress.country}
                </div>
                <div>
                  <label>Street 1: </label>
                  {data[currentDialogData].fromAddress.street1}
                </div>
                <div>
                  <label>Street 2: </label>
                  {data[currentDialogData].fromAddress.street2}
                </div>
                <div>
                  <label>City: </label>
                  {data[currentDialogData].fromAddress.city}
                </div>
                <div>
                  <label>Zip: </label>
                  {data[currentDialogData].fromAddress.zip}
                </div>
                <div>
                  <label>State: </label>
                  {data[currentDialogData].fromAddress.state}
                </div>
                <div>
                  <label>Phone: </label>
                  {data[currentDialogData].fromAddress.phone}
                </div>
              </div>
            </Typography>
            <Typography
              gutterBottom
              style={
                {
                  // border: "2px solid red"
                }
              }
            >
              <div style={{ fontWeight: "bold" }}>To Address:</div>
              <div>
                <div>
                  <label>Country: </label>
                  {data[currentDialogData].toAddress.country}
                </div>
                <div>
                  <label>Street 1: </label>
                  {data[currentDialogData].toAddress.street1}
                </div>
                <div>
                  <label>Street 2: </label>
                  {data[currentDialogData].toAddress.street2}
                </div>
                <div>
                  <label>City: </label>
                  {data[currentDialogData].toAddress.city}
                </div>
                <div>
                  <label>Zip: </label>
                  {data[currentDialogData].toAddress.zip}
                </div>
                <div>
                  <label>State: </label>
                  {data[currentDialogData].toAddress.state}
                </div>
                <div>
                  <label>Phone: </label>
                  {data[currentDialogData].toAddress.phone}
                </div>
              </div>
            </Typography>
            <Typography
              gutterBottom
              style={
                {
                  // border: "2px solid red"
                }
              }
            >
              <div style={{ fontWeight: "bold" }}>Parcel:</div>
              <div>
                <div>
                  <label>Weight: </label>
                  {data[currentDialogData].parcel.weight}
                </div>
                <div>
                  <label>Height: </label>
                  {data[currentDialogData].parcel.height}
                </div>
                <div>
                  <label>Width: </label>
                  {data[currentDialogData].parcel.width}
                </div>
                <div>
                  <label>Length: </label>
                  {data[currentDialogData].parcel.length}
                </div>
              </div>
            </Typography>
            <Typography
              gutterBottom
              style={
                {
                  // border: "2px solid red"
                }
              }
            >
              <div style={{ fontWeight: "bold" }}>Price:</div>
              <div>$ {data[currentDialogData].price}</div>
            </Typography>
            <Typography
              gutterBottom
              style={
                {
                  // border: "2px solid red"
                }
              }
            >
              <div style={{ fontWeight: "bold" }}>Label Url:</div>
              <div>
                <a href={data[currentDialogData].labelUrl}>
                  {data[currentDialogData].labelUrl}
                </a>
              </div>
            </Typography>
            <Typography
              gutterBottom
              style={
                {
                  // border: "2px solid red"
                }
              }
            >
              <div style={{ fontWeight: "bold" }}>Label Price:</div>
              <div>{data[currentDialogData].labelPrice}</div>
            </Typography>
            <Typography
              gutterBottom
              style={
                {
                  // border: "2px solid red"
                }
              }
            >
              <div style={{ fontWeight: "bold" }}>Box Type:</div>
              <div>{data[currentDialogData].boxType}</div>
            </Typography>
            <Typography gutterBottom style={{}}>
              <div style={{ fontWeight: "bold" }}>Number Of Boxes:</div>
              <div>{data[currentDialogData].numberOfBoxes}</div>
            </Typography>
          </DialogContent>
        </Dialog>
      );
    } else {
      return "";
    }
  };

  // Appbar
  const MyAppBar = () => (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <Typography variant="h6" className={classes.title}>
              eDreambag.com
            </Typography>
          </IconButton>
          <Typography variant="h6" className={classes.title}></Typography>
          <Button
            color="inherit"
            onClick={() => {
              setAuth({ role: "", token: "" });
              localStorage.removeItem("token");
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );

  // table to represent data
  const MyList = () => (
    <div style={{ padding: "30px" }}>
      <List>
        {data.map((d, i) => (
          <ListItem
            onClick={() => {
              handleClickOpen(true);
              setCurrentDialogData(i);
            }}
            key={i}
            button
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 4fr 1fr 1fr",
              gridTemplateRows: "1fr",
              border: "1px solid #b7b7b7"
            }}
          >
            <div>
              <ListItemText primary={i + 1} />
            </div>
            <div>
              <ListItemText>
                <a href={d.labelUrl}>{d.labelUrl}</a>
              </ListItemText>
            </div>
            <div></div>
            <div>
              <Button
                variant="contained"
                color="primary"
                style={{ marginLeft: "20px" }}
              >
                {" "}
                &rarr;
              </Button>
            </div>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div style={{ overflowY: "scroll", height: "100vh" }}>
      {MyAppBar()}
      <div
        style={{ fontSize: "35px", fontFamily: '"Titillium Web", sans-serif' }}
      >
        Labels
      </div>
      <div style={{ border: "1px solid #b7b7b7", padding: "20px" }}>
        {MyList()}
      </div>
      {MyDialog()}
    </div>
  );
}

export default withRouter(AdminDashboard);
