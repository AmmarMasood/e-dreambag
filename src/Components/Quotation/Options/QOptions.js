import React, { useContext } from "react";
import "./QOptions.css";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputLabel from "@material-ui/core/InputLabel";
import { boxContext } from "../../../State/Store";
import TextField from "@material-ui/core/TextField";

function QOptions() {
  const [box, setBox] = useContext(boxContext);

  const handleBox = e => {
    if (e.target.value == 1) {
      {
        console.log(box);
        console.log(e.target.value);
      }
      setBox({
        b: e.target.value,
        p: 20
      });
    } else if (e.target.value == 2) {
      setBox({
        b: e.target.value,
        p: 30
      });
    } else if (e.target.value == 3) {
      setBox({
        b: e.target.value,
        p: 40
      });
    } else if (e.target.value == 4) {
      setBox({
        b: e.target.value,
        p: 50
      });
    } else if (e.target.value == 5) {
      setBox({
        b: e.target.value,
        p: 60
      });
    } else if (e.target.value == 10) {
      setBox({
        b: e.target.value,
        p: 65
      });
    }
  };
  return (
    <div className="options">
      {console.log(box)}
      <div className="options-image">
        <img
          src={require("../../../Images/boxesship.gif")}
          alt=""
          height="300px"
        />
      </div>
      <div className="options-info">
        <div style={{ textAlign: "left", padding: "10px" }}>
          <h4 style={{ margin: 0, fontSize: "15px" }}>
            Box / label delivery service
          </h4>
          <p style={{ margin: 0, fontSize: "15px" }}>
            . If you apply as many as you need, we will send you a box to pack.
          </p>
        </div>
        <div style={{ textAlign: "left", padding: "10px" }}>
          <h4 style={{ margin: "0 0 5px 0" }}>
            Select the number of delivery boxes
          </h4>
          <FormControl variant="outlined" style={{ margin: 0 }}>
            <InputLabel htmlFor="outlined-age-native-simple">Box</InputLabel>
            <Select
              native
              value={box.b}
              onChange={handleBox}
              label="Box"
              style={{ width: "10rem" }}
              inputProps={{
                name: "Box",
                id: "outlined-age-native-simple"
              }}
            >
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
            </Select>
          </FormControl>
          <TextField
            style={{ width: "4rem" }}
            id="outlined-basic"
            value={`$ ${box.p ? box.p : ""}`}
            disabled
            variant="outlined"
          />
        </div>
        <div style={{ textAlign: "left", padding: "10px" }}>
          <h4 style={{ margin: 0, fontSize: "15px" }}>Box shipping included</h4>
          <p style={{ margin: 0, fontSize: "15px" }}>
            · It is possible to arrange the luggage more easily by receiving the
            box before pick up / drop off in advance.
          </p>
          <p style={{ margin: 0, fontSize: "15px" }}>
            · The box takes 4-6 business days to deliver.
          </p>
        </div>
        <div style={{ textAlign: "left", padding: "10px" }}>
          <h4 style={{ margin: 0, fontSize: "15px" }}>Get the box</h4>
          <p style={{ margin: 0, fontSize: "15px" }}>
            · The number of boxes requested will be automatically delivered to
            the destination.
          </p>
          <p style={{ margin: 0, fontSize: "15px" }}>
            · When sending, simply send it to the pick-up driver or staff
            without additional information.
          </p>
        </div>
        <div style={{ textAlign: "left", padding: "10px" }}>
          <h4 style={{ margin: 0, fontSize: "15px" }}>Coming soon:</h4>
          <p style={{ margin: 0, fontSize: "15px" }}>
            · A tape will be provided to seal the box without purchasing the box
            tape (before service).
          </p>
          <p style={{ margin: 0, fontSize: "15px" }}>
            . We plan to provide labels and pouches in the box (before service).
          </p>
        </div>
      </div>
    </div>
  );
}

export default QOptions;
