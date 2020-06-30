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

function Box(props) {
  const [activeId, setActiveId] = useState("");
  const [data, setData] = useState({
    id: "029be58700504afb8f78bf3057dfe6fa",
    parcels: [
      {
        id: "07a948a89b704af18dc2f4ab6b871fba",
        height: 0,
        weight: 0,
        width: 0,
        length: 0,
        contents: []
      },
      {
        id: "162b29e02d7a4fb186f6ec9d6339023c",
        height: 0,
        weight: 0,
        width: 0,
        length: 0,
        contents: []
      },
      {
        id: "61af5032d4ce4b588746f874584ca5f5",
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
      const id = "029be58700504afb8f78bf3057dfe6fa";
      axios(`${server}/boxes?boxId=${props.match.params.orderid}`)
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
          <BoxManagement aboutBox={item} />{" "}
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
            <h4>{`Shipping List Management: ${
              data.id ? data.id : "Not Availeble"
            }`}</h4>
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
