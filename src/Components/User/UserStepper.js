import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import StepButton from "@material-ui/core/StepButton";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import Forms from "./StepperComponents/Forms";
import ShipmentDate from "./StepperComponents/ShipmentDate";
import { withRouter } from "react-router-dom";
import Payment from "./StepperComponents/Payment";
import UploadFiles from "./StepperComponents/UploadFiles";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  actionsContainer: {
    marginBottom: theme.spacing(2)
  },
  resetContainer: {
    padding: theme.spacing(3)
  }
}));

function getSteps() {
  return [
    "US Address",
    "Korean Address",
    "Enter the date of Shipment",
    "Shipment List Management",
    "Label Output",
    "Waiting for delivery in US",
    "Payment Required",
    "Enter Custom Documents",
    "Shipping Request",
    "Delivery Tracking"
  ];
}

function getStepContent(step, orderId, history) {
  switch (step) {
    case 0:
      return <Forms usa={true} orderId={orderId} />;
    case 1:
      return <Forms usa={false} orderId={orderId} />;
    case 2:
      return <ShipmentDate />;
    case 3:
      return (
        <Button
          variant="outlined"
          color="default"
          style={{ padding: "15px 55px 15px 55px" }}
          onClick={() => history.push(`/box-management/${orderId}`)}
          startIcon={
            <img src={require("../../Images/icons/box.svg")} height="25px" />
          }
        >
          Go To Box Management
        </Button>
      );
    case 4:
      return "Label Goes here Label Goes here Label Goes here Label Goes here Label Goes here Label Goes here ";
    case 5:
      return ``;
    case 6:
      return <Payment />;
    case 7:
      return <UploadFiles />;
    case 8:
      return `Try out different ad text to see what brings in the most customers,
                                  and learn how to enhance your ads using features like ad extensions.
                                  If you run into any problems with your ads, find out how to tell if
                                  they're running and how to resolve approval issues.`;
    case 9:
      return `Try out different ad text to see what brings in the most customers,
                                            and learn how to enhance your ads using features like ad extensions.
                                            If you run into any problems with your ads, find out how to tell if
                                            they're running and how to resolve approval issues.`;
    default:
      return "Unknown step";
  }
}

function UserStepper(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState("");
  const [completed, setCompleted] = React.useState({});
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleStep = step => () => {
    setActiveStep(step);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  function QontoStepIcon(info) {
    // const classes = useQontoStepIconStyles();

    return (
      <div
      // className={clsx(classes.root, {
      //   [classes.active]: active,
      // })}
      >
        {info ? (
          <CheckCircleIcon style={{ color: "green" }} />
        ) : (
          <CancelIcon style={{ color: "#B11B1B" }} />
        )}
      </div>
    );
  }

  const stepperInfoToArray = Object.keys(props.stepperInfo).map(function(key) {
    return props.stepperInfo[key];
  });

  return (
    <div className={classes.root}>
      <Stepper nonLinear={true} activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton
              onClick={handleStep(activeStep === index ? "" : index)}
              completed={completed[index]}
            >
              <StepLabel
                StepIconComponent={() =>
                  QontoStepIcon(stepperInfoToArray[index])
                }
              >
                {label}
              </StepLabel>
            </StepButton>
            <StepContent>
              <Typography>
                {getStepContent(index, props.orderId, props.history)}
              </Typography>
              <div className={classes.actionsContainer}>
                <div>
                  {/* <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button> */}
                  {activeStep === steps.length - 1 ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      Finish
                    </Button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
  );
}

export default withRouter(UserStepper);
