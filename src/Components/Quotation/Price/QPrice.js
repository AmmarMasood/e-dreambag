import React, { useContext } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
// import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
// import RestoreIcon from "@material-ui/icons/Restore";
// import FavoriteIcon from "@material-ui/icons/Favorite";
// import LocationOnIcon from "@material-ui/icons/LocationOn";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
// import MuiDialogContent from "@material-ui/core/DialogContent";
import { priceContext, boxContext } from "../../../State/Store";
import Estimate from "../Service/Estimate";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

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

const useStyles = makeStyles({
  root: {
    width: "100%",
    backgroundColor: "#333333",
    height: "150px"
  }
});

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

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [price, setPrice] = useContext(priceContext);
  const [box, setBox] = useContext(boxContext);
  const [openPrice, setOpenPrice] = React.useState(false);
  const totalPrice = () => {
    var total = 0;
    if (price.oneFivekgsPrice) {
      total = total + price.oneFivekgsPrice * 178;
    }
    if (price.twoZeroKgsPrice) {
      total = total + price.twoZeroKgsPrice * 258;
    }
    return total;
  };
  const handleClosePrice = () => {
    setOpenPrice(false);
  };
  const handleTogglePrice = () => {
    setOpenPrice(!openPrice);
  };
  return (
    <>
      {/* should be uncommented to get original */}
      {/* <div>
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
      {/* </Dialog> */}
      {/* </div>  */}
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        {/*  border: "2px solid red", */}
        {/* should be uncommented to get original */}
        {/* <div
          style={{
            zIndex: "2",
            display: "flex",
            justifyContent: "flexStart",
            width: "100%",
            color: "white",
            display: "grid",
            gridTemplateColumns: "20% 20% 25%",
            gridTemplateRows: "1fr"
          }}
        >
          <div style={{ padding: "0 30px 0 30px" }}>
            <h4 style={{ margin: "5px" }}>{`$ ${totalPrice() + box.p}.00`}</h4>
            <p style={{ margin: "0", fontSize: "13px" }}>
              Before Discount is applied
            </p>
          </div>
          <div style={{ padding: "0 30px 0 30px" }}>
            <h4 style={{ margin: "5px" }}>{`$ ${(
              (totalPrice() + box.p) *
              0.6676
            ).toFixed(2)}`}</h4>
            <p style={{ margin: "0", fontSize: "13px" }}>
              After Applying Discount
            </p>
          </div>
          <div style={{ padding: "0 40px 0 40px" }}>
            <h3
              style={{
                margin: "15px 2px 2px 2px",
                cursor: "pointer",
                textDecoration: "underline"
              }}
              onClick={handleTogglePrice}
            >
              Estimated Shipping Cost
            </h3>
          </div>
        </div> */}
      </BottomNavigation>
    </>
  );
}
