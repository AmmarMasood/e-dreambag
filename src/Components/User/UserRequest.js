import React, { useEffect, useState } from "react";
import QAppbar from "../Quotation/Appbar/QAppbar";
import DoneIcon from "@material-ui/icons/Done";
import { withRouter } from "react-router";
import "./UserRequest.css";
import UserStepper from "./UserStepper";
import axios from "axios";
import { server } from "../../Utils/Server";
import setAuthToken from "../../Utils/setAuthToken";

function UserRequest(props) {
  const [stepperInfo, setStepperInfo] = useState({});
  useEffect(() => {
    setAuthToken(localStorage.getItem("token"));
    axios
      .get(`${server}/luggageprogress/?shipmentId=${props.match.params.id}`, {
        data: {}
      })
      .then(res => setStepperInfo(res.data))
      .catch(err => {
        console.log(err);
        window.alert(err);
      });
  }, []);

  return (
    <div className="main-userrequest">
      <QAppbar colorInvert={true} />
      <div className="container-userrequest">
        <div className="heading-userrequest">
          <DoneIcon
            style={{
              verticalAlign: "middle",
              diplay: "inline-flex"
            }}
          />{" "}
          <label style={{ fontSize: "17px", padding: "10px" }}>
            My Page: Order No: {`${props.match.params.id}`}
          </label>
        </div>
        <div className="stepper-userrequest">
          <UserStepper
            stepperInfo={stepperInfo}
            id={props.match.params.id}
            boxId={props.match.params.boxId}
          />
        </div>
      </div>
    </div>
  );
}

export default withRouter(UserRequest);
