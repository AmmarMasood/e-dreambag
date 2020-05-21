import React, { useContext } from "react";
import Typography from "@material-ui/core/Typography";
import MuiDialogContent from "@material-ui/core/DialogContent";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {
  priceContext,
  carrierPriceF,
  regularPriceF,
  boxContext
} from "../../../State/Store";

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

function Estimate() {
  const [regularPrice, SetRegularPrice] = useContext(regularPriceF);
  const [carrierPrice, SetCarrierPrice] = useContext(carrierPriceF);
  const [box, setBox] = useContext(boxContext);
  const [price, setPrice] = useContext(priceContext);
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
  const getRegularCard = () =>
    regularPrice.map(e => (
      <div key={e.i} className="standard-o-each">
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
      <div key={e.i} className="standard-o-each">
        <div>{e.w} lbs</div>
        <div>
          {e.h}x{e.hori}x{e.vert} in
        </div>
        <div>1</div>
        <div>$ NA</div>
      </div>
    ));

  return (
    <DialogContent dividers style={{ padding: "40px" }}>
      <Card style={{ width: "100%" }} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2">
            <div className="payment-p">
              <div>Payment Price</div>
              <div>$ {paymentPrice()}</div>
            </div>
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            <div className="payment-o">
              <div className="payment-o-each">
                <div>Before applying discount</div>
                <div>$ {returnSTotal()}</div>
              </div>
              <div className="payment-o-each">
                <div>When you use referral code</div>
                <div>$ 0</div>
              </div>
              <div className="payment-o-each">
                <div>After applying discount</div>
                <div>$ {(returnSTotal() * 0.6676).toFixed(2)}</div>
              </div>
              <div className="payment-o-each">
                <div>Box / label delivery service</div>
                <div>$ {box.p}</div>
              </div>
              <div className="payment-o-each">
                <div>Customs fees</div>
                <div>$ 25</div>
              </div>
            </div>
          </Typography>
        </CardContent>
      </Card>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="p" component="h3">
            <div>Standard Box</div>
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            <div className="standard-o">
              {price.oneFivekgsPrice ? (
                <div className="standard-o-each">
                  {console.log(price)}

                  <div>15 kg</div>
                  <div>20 * 20 * 12 in</div>
                  <div>{price.oneFivekgsPrice}</div>
                  <div>$ {price.oneFivekgsPrice * 119}</div>
                </div>
              ) : (
                ""
              )}
              {price.twoZeroKgsPrice ? (
                <div className="standard-o-each">
                  <div>30 kg</div>
                  <div>20 * 20 * 12 in</div>
                  <div>{price.twoZeroKgsPrice}</div>
                  <div>$ {price.twoZeroKgsPrice * 172}</div>
                </div>
              ) : (
                ""
              )}
            </div>
          </Typography>
        </CardContent>
        <CardContent>
          <Typography variant="p" component="h3">
            <div>Regular Box</div>
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            <div className="standard-o">{getRegularCard()}</div>
          </Typography>
        </CardContent>
        <CardContent>
          <Typography variant="p" component="h3">
            <div>Carrier Box</div>
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            <div className="standard-o">
              <div className="standard-o">{getCarrierCard()}</div>
            </div>
          </Typography>
        </CardContent>
      </Card>
    </DialogContent>
  );
}

export default Estimate;
