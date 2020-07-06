import React, { useEffect, useState } from "react";
import QAppbar from "../Quotation/Appbar/QAppbar";
import BoxManagement from "./BoxManagement";
import { Button } from "@material-ui/core";
import "./BoxManagement.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { server } from "../../Utils/Server";
import setAuthToken from "../../Utils/setAuthToken";

function Box(props) {
  const [activeId, setActiveId] = useState("");
  const [data, setData] = useState({
    id: "",
    parcels: [
      {
        id: "",
        height: 0,
        weight: 0,
        width: 0,
        length: 0,
        contents: []
      }
    ]
  });

  useEffect(() => {
    if (localStorage.getItem("role") === "ADMIN") {
      // localStorage.clear();
      // props.history.push("/login");
    } else {
      setAuthToken(localStorage.getItem("token"));
      axios
        .get(`${server}/boxes?boxId=${props.match.params.boxId}`, { data: {} })
        .then(res => setData(res.data))
        .catch(err => {
          window.alert(err);
          console.log(err);
        });
    }
  }, []);

  const showBoxes = () => {
    return data.parcels ? (
      data.parcels.map((item, i) => (
        <Tab onClick={() => setActiveId(item.id)}>
          <div className="main-box-manangement-show-box">
            <h3>{`Box ${i + 1}`}</h3>
          </div>
        </Tab>
      ))
    ) : (
      <div></div>
    );
  };

  const showManagements = () =>
    data.parcels ? (
      data.parcels.map((item, i) => (
        <TabPanel>
          <BoxManagement key={i} aboutBox={item} />{" "}
        </TabPanel>
      ))
    ) : (
      <div></div>
    );

  return (
    <div className="main-box-manangement">
      <QAppbar colorInvert={true} />
      <Tabs>
        <div className="main-box-manangement-container">
          <div className="main-box-manangement-box-name">
            <img
              style={{ height: "30px", marginRight: "5px" }}
              align="left"
              src={require("../../Images/icons/box.svg")}
            />{" "}
            <h4>{`Shipping List Management: ${props.match.params.id}`}</h4>
          </div>

          <div className="main-box-manangement-box-selection">
            <div className="main-box-manangement-show-box-container">
              <TabList style={{ display: "grid !important" }}>
                {showBoxes()}
              </TabList>
            </div>
            <div
              style={{
                textAlign: "right",
                fontSize: "13px",
                padding: "2px",
                cursor: "pointer",
                display: "block"
              }}
            >
              Box Management
            </div>
          </div>
          {/* this is where box management goes */}

          {showManagements()}
        </div>
      </Tabs>
    </div>
  );
}

export default withRouter(Box);
