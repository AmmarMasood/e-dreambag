import React, { useContext, useRef, useEffect, useState } from "react";
import "./QPayment.css";
import {
  paymentInfoContext,
  priceContext,
  carrierPriceF,
  regularPriceF,
  pickupdateContext,
  returndateContext,
  dropoffdateContext,
  boxContext,
  boxTypeContext,
  QuotationContext,
  fromAddressContext
} from "../../../State/Store";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import moment from "moment";
import axios from "axios";
import { server } from "../../../Utils/Server";

function QPayment(props) {
  const [payInfo, setPayInfo] = useContext(paymentInfoContext);
  const [checked1, setChecked1] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const [price, setPrice] = useContext(priceContext);
  const [regularPrice, SetRegularPrice] = useContext(regularPriceF);
  const [carrierPrice, SetCarrierPrice] = useContext(carrierPriceF);
  const [pickupDate, setPickupDate] = useContext(pickupdateContext);
  const [dropoffDate, setDropoffDate] = useContext(dropoffdateContext);
  const [returnDate, setReturnDate] = useContext(returndateContext);
  const [box, setBox] = useContext(boxContext);
  // new states:
  const [activeStep, setActiveStep] = React.useContext(QuotationContext);
  const [fromAddress, setFromAddress] = useContext(boxTypeContext);
  const [boxTypeToSend, setBoxTypeToSend] = useContext(fromAddressContext);
  // paypal stuff
  const [paidfor, setPaidFor] = useState(false);
  const [loaded, setLoaded] = useState(false);
  let paypalRef = useRef();

  // for paypal script
  useEffect(() => {
    // CHECK IS PREV STEPS ARE COMPLETED
    if (
      box.p <= 0 ||
      boxTypeToSend.length < 0 ||
      Object.keys(fromAddress).length === 0
    ) {
      window.alert("Please complete previous steps to go to payment part");
      setActiveStep(0);
      console.log(box.p);
      console.log(boxTypeToSend);
      console.log(fromAddress);
    }
    // load paypal script
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=ARJgaOMDPOK269qdv4D0mip8m9-w0rE68EoxMHxGxbWwHgp1IUD4eYmjZUGXeLFYIO_zwBpuKoB6WgLO";
    script.addEventListener("load", () => setLoaded(true));
    document.body.appendChild(script);

    if (loaded) {
      setTimeout(() => {
        window.paypal
          .Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    description: "Label for box",
                    amount: {
                      currency_code: "USD",
                      value: box.p
                    }
                  }
                ]
              });
            },
            onApprove: async (data, actions) => {
              const order = await actions.order.capture();
              setPaidFor(true);
              console.log(order);
            }
          })
          .render(paypalRef);
      });
    }
  });

  useEffect(() => {
    if (paidfor) {
      const toAddress = {
        Stree1: "14101 Sullyfield Circle ",
        Street2: "Suite 340",
        City: "Chantilly",
        State: "Virginia or VA",
        Zip: "20151",
        Country: "USA"
      };
      const parcel = { height: 10, width: 10, weight: 10, length: 10 };
      axios
        .post(`${server}/easypost/shipments`, {
          toAddress,
          fromAddress,
          parcel
        })
        .then(res => window.alert("Request send to backend"))
        .catch(err => window.alert(err));
    }
  }, [paidfor]);

  const returnSTotal = () => {
    var total = 0;
    if (price.oneFivekgsPrice) {
      total = total + price.oneFivekgsPrice * 178;
    }
    if (price.twoZeroKgsPrice) {
      total = total + price.twoZeroKgsPrice * 258;
    }
    return total;
  };

  const paymentPrice = () => {
    const sTotal = returnSTotal() * 0.6676;
    const rTotal = 0;
    const cTotal = 0;
    const bTotal = box.p;
    const customFees = 25;

    return (sTotal + rTotal + cTotal + bTotal + customFees).toFixed(2);
  };

  const handleChange1 = event => {
    setChecked1(event.target.checked);
  };
  const handleChange2 = event => {
    setChecked2(event.target.checked);
  };

  const onEditClick = () => {
    props.onChange(0);
  };

  const getRegularCard = () =>
    regularPrice.map(e => (
      <div key={e.i} className="payment-info-standard-i">
        <div>{e.w} lbs</div>
        <div>
          {e.h}x{e.hori}x{e.vert} in
        </div>
        <div>1</div>
        <div>$ NA</div>
      </div>
    ));

  const getCarrierCard = () =>
    carrierPrice.map(e => (
      <div key={e.i} className="payment-info-standard-i">
        <div>{e.w} lbs</div>
        <div>
          {e.h}x{e.hori}x{e.vert} in
        </div>
        <div>1</div>
        <div>$ NA</div>
      </div>
    ));

  return (
    <div className="payment">
      <div className="payment-image">
        <div className="payment-user">
          {/* <div className="payment-user-form">
            <div>
              <TextField
                disabled
                style={{ width: "100%" }}
                id="filled-basic"
                label="Name(Korean)"
                variant="filled"
                value={payInfo.nameKorean}
                onChange={e =>
                  setPayInfo({ ...payInfo, nameKorean: e.target.value })
                }
              />
            </div>
            <div>
              <TextField
                disabled
                style={{ width: "100%" }}
                id="filled-basic"
                label="Phone Number"
                variant="filled"
                value={payInfo.phoneNumber}
                onChange={e =>
                  setPayInfo({ ...payInfo, phoneNumber: e.target.value })
                }
              />
            </div>
            <div>
              <TextField
                disabled
                style={{ width: "100%" }}
                id="filled-basic"
                label="First Name"
                variant="filled"
                value={payInfo.firstName}
                onChange={e =>
                  setPayInfo({ ...payInfo, firstName: e.target.value })
                }
              />
            </div>
            <div>
              <TextField
                disabled
                style={{ width: "100%" }}
                id="filled-basic"
                label="Last Name"
                variant="filled"
                value={payInfo.lastName}
                onChange={e =>
                  setPayInfo({ ...payInfo, lastName: e.target.value })
                }
              />
            </div>
            <div>
              <TextField
                disabled
                style={{ width: "100%" }}
                id="filled-basic"
                label="Email Address"
                variant="filled"
                value={payInfo.emailAddress}
                onChange={e =>
                  setPayInfo({ ...payInfo, emailAddress: e.target.value })
                }
              />
            </div>
            <div>
              <TextField
                disabled
                style={{ width: "100%" }}
                id="filled-basic"
                label="Password"
                variant="filled"
                value={payInfo.password}
                onChange={e =>
                  setPayInfo({ ...payInfo, password: e.target.value })
                }
                type="password"
              />
            </div>
          </div>
          <div className="payment-user-check">
            <div>
              <FormControlLabel
                // style={{ paddingLeft: "50px", fontSize: "14px" }}
                control={
                  <Checkbox
                    disabled
                    checked={checked1}
                    onChange={handleChange1}
                    name="checked1"
                    color="primary"
                  />
                }
                label="ISD SERVICES, INC's personal information processing policy and
                third-party information are agreed upon and then applied."
              />
            </div>
            <div>
              <FormControlLabel
                // style={{ paddingLeft: "50px", fontSize: "14px" }}
                control={
                  <Checkbox
                    disabled
                    checked={checked2}
                    onChange={handleChange2}
                    name="checked2"
                    color="primary"
                  />
                }
                label="I agree to ISD SERVICES, INC's contract terms and conditions of
                carriage."
              />
            </div>
          </div> */}
        </div>
        <div className="payment-proc">
          <div className="payment-proc-adv">
            <div>
              <h4 style={{ padding: 2, margin: 0 }}>Payment in advance</h4>
              <p style={{ padding: 2, margin: 0 }}>
                Reservation fee for shipping. Please pay deposit for reservation
                request.
              </p>
              <p style={{ padding: 2, margin: 0 }}>
                ※ After reservation, it can be modified up to two days before
                the shipment date (excluding weekends).
              </p>
            </div>
          </div>
          <div className="payment-proc-card">
            {/* <div className="payment-proc-card-head">
              Service application deposit: $ 40
            </div> */}
            <div className="payment-proc-card-choose">
              {paidfor ? (
                <div style={{ padding: "40px" }}>
                  <h3>Payment complete please check your dashboard</h3>
                </div>
              ) : (
                <div>
                  {/* <Button variant="outlined" color="primary">
                    Pay with paypal
                  </Button> */}
                  <div ref={v => (paypalRef = v)} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="payment-info">
        <div className="payment-info-img">
          <img src={require("../../../Images/final_box_img.png")} alt="" />
        </div>
        <div className="payment-info-head">
          <h4>Shipment summary</h4>
          <Button href="#text-buttons" color="primary" onClick={onEditClick}>
            &#8592; Edit
          </Button>
        </div>
        {/* <div className="payment-info-standard">
          <p>Standard Box</p>
          {price.oneFivekgsPrice ? (
            <div className="payment-info-standard-i">
              {console.log(price)}

              <div>15 kg</div>
              <div>20 * 20 * 12 in</div>
              <div>{price.oneFivekgsPrice}</div>
              <div>$ {price.oneFivekgsPrice * 178}</div>
            </div>
          ) : (
            ""
          )}
          {price.twoZeroKgsPrice ? (
            <div className="payment-info-standard-i">
              <div>30 kg</div>
              <div>20 * 20 * 12 in</div>
              <div>{price.twoZeroKgsPrice}</div>
              <div>$ {price.twoZeroKgsPrice * 258}</div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="payment-info-standard-regular">
          <p>Regular Box</p>
          {getRegularCard()}
        </div>
        <div className="payment-info-standard-regular">
          <p>Carrier</p>
          {getCarrierCard()}
        </div>
        <div className="payment-info-date">
          <div className="payment-info-date-r">
            <p>Return Date:</p>
            <div>
              {" "}
              {returnDate
                ? moment(returnDate._d).format("MMM Do YYYY")
                : "Not Choosen"}
            </div>
          </div>
          <div className="payment-info-date-r">
            <p>Dropoff Date:</p>
            <div>
              {dropoffDate
                ? moment(pickupDate._d).format("MMM Do YYYY")
                : "Not Choosen"}
            </div>
          </div>
          <div className="payment-info-date-r">
            <p>Pickup Date:</p>
            <div>
              {" "}
              {pickupDate
                ? moment(pickupDate._d).format("MMM Do YYYY")
                : "Not Choosen"}
            </div>
          </div>
        </div> */}
        <div className="payment-info-estimate">
          <div className="payment-info-estimate-head">Estimated cost</div>
          {/* <div className="payment-info-estimate-i">
            <div>Price before discount</div>
            <div>$ {returnSTotal()}</div>
          </div>
          <div className="payment-info-estimate-i">
            <div>Price after discount</div>
            <div>$ {(returnSTotal() * 0.6676).toFixed(2)}</div>
          </div> */}
          <div className="payment-info-estimate-i">
            <div>Box / label delivery</div>
            <div>$ {box.p}</div>
          </div>
          {/* <div className="payment-info-estimate-i">
            <div>Customs fees</div>
            <div>$ 25.00</div>
          </div> */}
          <div className="payment-info-estimate-i">
            <div>TOTAL</div>
            {/* <div>$ {paymentPrice()}</div> */}
            <div>$ {paymentPrice() - 25}</div>
          </div>
        </div>

        {/* <div className="payment-info-estimate-t">
          <div>Service reservation amount</div>
          <div>$ 40</div>
        </div> */}
      </div>
    </div>
  );
}
export default QPayment;
