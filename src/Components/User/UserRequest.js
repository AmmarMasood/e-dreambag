import React, { useEffect, useState } from "react";
import QAppbar from "../Quotation/Appbar/QAppbar";
import DoneIcon from "@material-ui/icons/Done";
import { withRouter } from "react-router";
import "./UserRequest.css";
import UserStepper from "./UserStepper";

function UserRequest(props) {
  const [stepperInfo, setStepperInfo] = useState({
    userAddressPhase: false,
    koreanAddressPhase: true,
    dateOfShipmentPhase: false,
    shipmentListInputPhase: false,
    labelOutPut: false,
    waitingForUsDeliveryPhase: false,
    paymentPhase: false,
    customDocumentPhase: false,
    shipmentRequestPhase: false,
    trackingPhase: false
  });

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
            My Page: Order No: {`${props.match.params.orderid}`}
          </label>
        </div>
        <div className="stepper-userrequest">
          <UserStepper
            stepperInfo={stepperInfo}
            orderId={props.match.params.orderid}
          />
        </div>
      </div>
    </div>
  );
}

export default withRouter(UserRequest);
