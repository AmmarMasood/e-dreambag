import React, { useEffect, useState } from "react";
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
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import { server } from "../../Utils/Server";
import setAuthToken from "../../Utils/setAuthToken";
import CircularProgress from "@material-ui/core/CircularProgress";

function UserDashboard(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("role") === "ADMIN") {
      localStorage.clear();
      props.history.push("/login");
    } else {
      setAuthToken(localStorage.getItem("token"));
      setLoading(true);
      axios
        .get(`${server}/studentbag`, { data: {} })
        .then(res => {
          setData(res.data);
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
          window.alert(err);
          console.log(err);
        });
    }
  }, []);
  const showList = () =>
    data.map((item, i) => (
      <div>
        <ListItem
          alignItems="flex-start"
          key={i}
          style={{ textTransform: "capitalize" }}
          className="listitem-userdashboard"
        >
          <div>{item.id ? item.id : ""}</div>
          <div>{item.numberOfBoxes ? item.numberOfBoxes : ""}</div>
          <div>Waiting for Approval</div>
          <div>
            <Link to={`/user-request/${item.id}/${item.boxId}`}>
              Complete Information
            </Link>
          </div>
        </ListItem>
        <Divider variant="inset" component="li" />
      </div>
    ));

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
            {/* <div>Application Date</div> */}
            <div>Order#</div>
            <div>Boxes</div>
            <div>Order Status</div>
            <div>CheckList</div>
          </div>
          {loading ? <CircularProgress /> : showList()}
        </List>
      </div>
    </div>
  );
}

export default withRouter(UserDashboard);
