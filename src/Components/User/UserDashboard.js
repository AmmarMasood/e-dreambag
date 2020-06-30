import React, { useEffect } from "react";
import QAppbar from "../Quotation/Appbar/QAppbar";
import "./UserDashboard.css";
import {
  TextField,
  Button,
  List,
  ListItem,
  IconButton,
  Divider,
  ListItemText
} from "@material-ui/core";
import ListIcon from "@material-ui/icons/List";
import { withRouter } from "react-router-dom";

function UserDashboard(props) {
  useEffect(() => {
    if (localStorage.getItem("role") === "ADMIN") {
      localStorage.clear();
      props.history.push("/login");
    }
  }, []);
  const showList = () => (
    <div>
      <ListItem
        alignItems="flex-start"
        style={{ textTransform: "capitalize" }}
        className="listitem-userdashboard"
      >
        <div>Returning Director</div>
        <div>2268</div>
        <div>Waiting for Approval</div>
        <div>Complete Information</div>
      </ListItem>
      <Divider variant="inset" component="li" />
    </div>
  );
  return (
    <div className="main-userdashboard">
      <QAppbar colorInvert={true} />
      <div className="container-userdashboard">
        <div className="heading-userdashboard">
          <ListIcon
            style={{
              verticalAlign: "middle",
              diplay: "inline-flex"
            }}
          />{" "}
          <label style={{ fontSize: "17px", padding: "10px" }}>
            My Application List
          </label>
        </div>

        <List dense={false} style={{ margin: "0 5% 0 5%" }}>
          <div
            className="listitem-userdashboard"
            style={{
              padding: "10px",
              backgroundColor: "rgba(189, 189, 189, 0.46)"
            }}
          >
            <div>Application Date</div>
            <div>Order#</div>
            <div>Order Status</div>
            <div>CheckList</div>
          </div>
          {showList()}
        </List>
      </div>
    </div>
  );
}

export default withRouter(UserDashboard);
