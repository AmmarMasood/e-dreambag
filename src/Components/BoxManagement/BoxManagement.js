import React, { useState } from "react";
import {
  TextField,
  Button,
  List,
  ListItem,
  IconButton,
  Divider,
  ListItemText
} from "@material-ui/core";
import ImageUploader from "react-images-upload";
import BoxItemsSelection from "./BoxItemsSelection";
import SaveIcon from "@material-ui/icons/Save";
import "./BoxManagement.css";
import axios from "axios";
import { server } from "../../Utils/Server";
import { withRouter } from "react-router-dom";

function BoxManagement(props) {
  const [pictures, setPictures] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentSelectType, setCurrentSelectType] = useState("");
  const [stuffList, setStuffList] = useState({});
  const [boxDimensions, setBoxDimensions] = useState({
    wt: "",
    h: "",
    w: "",
    l: ""
  });

  const addStuff = (category, stuff) => {
    const newStuff = {
      ...stuffList,
      [category]: stuff
    };
    setStuffList(newStuff);
  };

  const addDirect = direct => {
    const newStuff = {
      ...stuffList,
      Direct: { ...stuffList.Direct, direct }
    };
    setStuffList(newStuff);
  };

  const saveButtonPress = () => {
    const stuffListInArray = Object.keys(stuffList).map(
      stuff => stuffList[stuff]
    );
    let merged = { ...boxDimensions, contents: [] };
    stuffListInArray.map(obj =>
      Object.keys(obj).map(stuff => {
        if (obj[stuff] !== 0) {
          console.log(obj);
          merged.contents.push({
            contentName: stuff,
            quantity: obj[stuff].toString()
          });
        }
      })
    );

    axios
      .post(`${server}/content?parcelId=${props.aboutBox.id}`, merged)
      .then(res => window.alert("Successfully Updated"))
      .catch(err => {
        console.log(err);
        window.alert(err);
      });
    console.log(merged);
  };

  const showStuffList = () => {
    const stuffListInArray = Object.keys(stuffList).map(
      stuff => stuffList[stuff]
    );
    console.log(stuffListInArray);
    return stuffListInArray.map(obj =>
      Object.keys(obj).map(stuff => {
        if (obj[stuff] !== 0) {
          // console.log(`${stuff} =====> ${obj[stuff]}`);
          return (
            <div>
              <ListItem
                alignItems="flex-start"
                style={{ textTransform: "capitalize" }}
              >
                <ListItemText primary={`${stuff}`} />
                <IconButton
                  edge="end"
                  aria-label="comments"
                  style={{ fontSize: "18px" }}
                >
                  {`${obj[stuff]}`}
                </IconButton>
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
          );
        }
      })
    );
  };
  return (
    <>
      <BoxItemsSelection
        addStuff={addStuff}
        addDirect={addDirect}
        open={open}
        setOpen={setOpen}
        currentSelectType={currentSelectType}
        setCurrentSelectType={setCurrentSelectType}
      />
      <div className="main-box-manangement-box-management">
        {/* PART 1 */}
        <div className="main-box-manangement-dimensions">
          <div className="main-box-manangement-dimensions--heading">
            1. Enter the actual weight and volume of the box
          </div>
          <div className="main-box-manangement-dimensions--content">
            <div>
              <div>Weight (KG)</div>
              <div
                style={{ padding: "10px" }}
                className="main-box-manangement-dimensions--content-forms"
              >
                <TextField
                  id="outlined-basic"
                  label="Weight"
                  variant="outlined"
                  value={boxDimensions.wt}
                  onChange={e =>
                    setBoxDimensions({ ...boxDimensions, wt: e.target.value })
                  }
                />
              </div>
            </div>
            <div>
              <div>Volume (Inches):</div>
              <div
                style={{ padding: "10px" }}
                className="main-box-manangement-dimensions--content-forms"
              >
                <TextField
                  id="outlined-basic"
                  label="Height"
                  variant="outlined"
                  value={boxDimensions.h}
                  onChange={e =>
                    setBoxDimensions({ ...boxDimensions, h: e.target.value })
                  }
                />

                <TextField
                  id="outlined-basic"
                  label="Width"
                  variant="outlined"
                  value={boxDimensions.w}
                  onChange={e =>
                    setBoxDimensions({ ...boxDimensions, w: e.target.value })
                  }
                />

                <TextField
                  id="outlined-basic"
                  label="Length"
                  variant="outlined"
                  value={boxDimensions.l}
                  onChange={e =>
                    setBoxDimensions({ ...boxDimensions, l: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </div>
        {/* PART 1 ENDS */}
        {/* PART 2 STARTS */}
        <div className="main-box-manangement-photos">
          <div className="main-box-manangement-photos--heading">
            2. Please upload the box photos
          </div>
          <div className="main-box-manangement-photos--content">
            <ImageUploader
              withIcon={true}
              // fileContainerStyle={{
              //   border: "2px solid red"
              // }}
              buttonText="Choose images"
              onChange={picture => setPictures(picture)}
              imgExtension={[".jpg", ".png"]}
              maxFileSize={5242880}
              withPreview={true}
            />
          </div>
        </div>
        {/* PART 2 ENDS */}
        {/* PART 3 STARTS */}
        <div className="main-box-manangement-stuff">
          <div className="main-box-manangement-stuff--heading">
            2. The detailed list information in the box is required
          </div>
          <div className="main-box-manangement-stuff--content">
            <div className="main-box-manangement-stuff--content-select">
              <Button
                variant="outlined"
                color="default"
                onClick={() => {
                  setCurrentSelectType("clothing");
                  setOpen(true);
                }}
              >
                <img
                  style={{ height: "20px", paddingRight: "5px" }}
                  src={require("../../Images/icons/clothing.svg")}
                />
                Clothing
              </Button>
              <Button
                variant="outlined"
                color="default"
                onClick={() => {
                  setCurrentSelectType("shoes");
                  setOpen(true);
                }}
              >
                <img
                  style={{ height: "20px", paddingRight: "5px" }}
                  src={require("../../Images/icons/shoe.svg")}
                />
                Shoes
              </Button>
              <Button
                variant="outlined"
                color="default"
                onClick={() => {
                  setCurrentSelectType("bags");
                  setOpen(true);
                }}
              >
                <img
                  style={{ height: "20px", paddingRight: "5px" }}
                  src={require("../../Images/icons/shopping-bags.svg")}
                />
                Bag
              </Button>
              <Button
                variant="outlined"
                color="default"
                onClick={() => {
                  setCurrentSelectType("Accessories");
                  setOpen(true);
                }}
              >
                <img
                  style={{ height: "20px", paddingRight: "5px" }}
                  src={require("../../Images/icons/accessories.svg")}
                />
                Accessories
              </Button>
              <Button
                variant="outlined"
                color="default"
                onClick={() => {
                  setCurrentSelectType("Cosmetics");
                  setOpen(true);
                }}
              >
                <img
                  style={{ height: "20px", paddingRight: "5px" }}
                  src={require("../../Images/icons/cosmetics.svg")}
                />
                Cosmetics
              </Button>
              <Button
                variant="outlined"
                color="default"
                onClick={() => {
                  setCurrentSelectType("Electronics");
                  setOpen(true);
                }}
              >
                <img
                  style={{ height: "20px", paddingRight: "5px" }}
                  src={require("../../Images/icons/electronics.svg")}
                />
                Electronics
              </Button>
              <Button
                variant="outlined"
                color="default"
                onClick={() => {
                  setCurrentSelectType("Stationary");
                  setOpen(true);
                }}
              >
                <img
                  style={{ height: "20px", paddingRight: "5px" }}
                  src={require("../../Images/icons/stationary.svg")}
                />
                Stationary
              </Button>
              <Button
                variant="outlined"
                color="default"
                onClick={() => {
                  setCurrentSelectType("Direct");
                  setOpen(true);
                }}
              >
                <img
                  style={{ height: "20px", paddingRight: "5px" }}
                  src={require("../../Images/icons/direct-input.svg")}
                />
                Direct Input
              </Button>
            </div>
            <div className="main-box-manangement-stuff--content-list">
              <div
                style={{
                  textAlign: "left",
                  padding: "10px",
                  backgroundColor: "rgba(189, 189, 189, 0.46)"
                }}
              >
                Box Content:
              </div>
              <List dense={false} style={{ margin: "0 10% 0 10%" }}>
                {showStuffList()}
              </List>
            </div>
          </div>
        </div>
        {/* PART 4 */}
        <div className="main-box-manangement-savebutton">
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<SaveIcon />}
            style={{ padding: "8px 80px 8px 80px" }}
            onClick={saveButtonPress}
          >
            Save
          </Button>
        </div>
        <div className="main-box-manangement-savebutton">
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ padding: "8px 80px 8px 80px" }}
            onClick={() => props.history.push("/user-dashboard")}
          >
            Go To Dashboard
          </Button>
        </div>
      </div>
    </>
  );
}

export default withRouter(BoxManagement);
