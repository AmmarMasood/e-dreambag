import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import QAppbar from "./Appbar/QAppbar";
import QPrice from "./Price/QPrice";
import QService from "./Service/QService";
import { priceContext, QuotationContext } from "../../State/Store";
import QPickup from "./Pickup/QPickup";
import QOptions from "./Options/QOptions";
import QPayment from "./Payment/QPayment";
import QServiceN from "./Service/QServiceN";
import QOptionsN from "./Options/QOptionsN";
import Form2 from "../Forms/Form2";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  backButton: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

export default function HorizontalLabelPositionBelowStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useContext(QuotationContext);
  const [price, setPrice] = React.useState(priceContext);
  const steps = getSteps();
  function getSteps() {
    // return ["1. Quotation", "2. Pickup", "3. Options", "4. Payment"];
    return ["1. Quotation", "2. Pickup Address", "3. Options", "4. Payment"];
  }

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <div style={{ height: "100%" }}>
            <QServiceN />
          </div>
        );
      case 1:
        return (
          <div style={{ height: "100%" }}>
            {/* <QPickup /> */}
            <Form2 />
          </div>
        );
      case 2:
        return (
          <div style={{ height: "100%" }}>
            <QOptionsN />
          </div>
        );
      case 3:
        return (
          <div style={{ height: "100%" }}>
            <QPayment onChange={setActiveStep} />
          </div>
        );
      default:
        return "Unknown stepIndex";
    }
  }

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
      <QAppbar />
      <div className={classes.root}>
        <Stepper
          style={{ padding: "10px" }}
          activeStep={activeStep}
          alternativeLabel
        >
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed
              </Typography>
              <Button onClick={handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
              <Typography className={classes.instructions}>
                {getStepContent(activeStep)}
              </Typography>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.backButton}
                  color="primary"
                  variant="contained"
                  style={{
                    position: "absolute",
                    top: "90%",
                    left: "70%",
                    zIndex: "1000",
                    padding: "5px 0 5px 0",
                    margin: "10px 15px 0 0"
                  }}
                >
                  Back
                </Button>

                <Button
                  style={{
                    position: "absolute",
                    top: "90%",
                    left: "80%",
                    zIndex: "100",
                    padding: "5px 90px 5px 90px",
                    margin: "10px 0 0 0"
                  }}
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  disabled={activeStep === steps.length - 1 ? true : false}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </div>
            </div>
          )}
        </div>
        <div
          style={{
            position: "absolute",
            // border: "2px solid black",
            top: "90%",
            width: "100%",
            zIndex: "2"
          }}
        >
          <QPrice price={price} />
        </div>
      </div>
    </>
  );
}
