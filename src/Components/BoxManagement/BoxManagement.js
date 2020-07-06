import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  List,
  ListItem,
  IconButton,
  Divider,
  ListItemText
} from "@material-ui/core";
import BoxItemsSelection from "./BoxItemsSelection";
import SaveIcon from "@material-ui/icons/Save";
import "./BoxManagement.css";
import axios from "axios";
import { server } from "../../Utils/Server";
import { withRouter } from "react-router-dom";
import setAuthToken from "../../Utils/setAuthToken";
import CircularProgress from "@material-ui/core/CircularProgress";
import FileBase64 from "react-file-base64";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function BoxManagement(props) {
  // const [aboutBox, setABoutBox] = useState({});
  const [pictures, setPictures] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentSelectType, setCurrentSelectType] = useState("");
  const [stuffList, setStuffList] = useState({});
  const [openNotification, setOpenNotification] = useState(false);
  const [notificationType, setNotificationType] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [boxDimensions, setBoxDimensions] = useState({
    weight: "",
    height: "",
    width: "",
    length: ""
  });
  const [loading, setLoading] = useState(false);
  // [{"img":"base64"},{"img":"base64"}]
  useEffect(() => {
    setLoading(true);
    setAuthToken(localStorage.getItem("token"));
    if (props.aboutBox.id) {
      axios
        .get(`${server}/content?parcelId=${props.aboutBox.id}`, { data: {} })
        .then(res => {
          const dimensions = {
            weight: res.data.weight ? res.data.weight : "",
            height: res.data.height ? res.data.height : "",
            width: res.data.width ? res.data.width : "",
            length: res.data.length ? res.data.length : ""
          };
          const getUserlist = res.data.contents.map(item => ({
            contentName: item.contentName,
            quantity: item.quantity
          }));
          console.log(getUserlist);

          const getQuantity = type =>
            getUserlist.filter(item => item.contentName === type)[0]
              ? getUserlist.filter(item => item.contentName === type)[0]
                  .quantity
              : 0;

          const myList = {
            clothing: {
              sportswear: getQuantity("sportswear"),
              underwear: getQuantity("underwear"),
              jacket: getQuantity("jacket"),
              pants: getQuantity("pants"),
              socks: getQuantity("socks"),
              sweater: getQuantity("sweater")
            },
            shoes: {
              shoes: getQuantity("shoes"),
              slippers: getQuantity("slippers"),
              casual: getQuantity("casual"),
              boots: getQuantity("boots")
            },
            bags: {
              handbags: getQuantity("handbags"),
              hobobags: getQuantity("hobobags"),
              backpack: getQuantity("backpack")
            },
            Accessories: {
              eyewears: getQuantity("eyewears"),
              jewelries: getQuantity("jewelries"),
              rings: getQuantity("rings"),
              watches: getQuantity("watches"),
              scarfs: getQuantity("scarfs")
            },
            Cosmetics: {
              powders: getQuantity("powders"),
              creams: getQuantity("creams"),
              gels: getQuantity("gels"),
              lipstick: getQuantity("lipstick")
            },
            Electronics: {
              phones: getQuantity("phones"),
              laptops: getQuantity("laptops"),
              tablets: getQuantity("tablets"),
              smartwatches: getQuantity("smartwatches"),
              ipads: getQuantity("ipads")
            },
            Stationary: {
              books: getQuantity("books"),
              pencils: getQuantity("pencils"),
              pens: getQuantity("pens"),
              journals: getQuantity("journals")
            },
            Direct: {
              direct: ""
            }
          };

          setPictures(res.data.images);
          // console.log(myList);
          setStuffList(myList);
          setBoxDimensions(dimensions);
          setLoading(false);
        })
        .catch(err => console.log(err));
    }
  }, [props.aboutBox.id]);

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
    setLoading(true);

    const stuffListInArray = Object.keys(stuffList).map(
      stuff => stuffList[stuff]
    );
    let merged = { ...boxDimensions, contents: [], images: pictures };
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
    setLoading(false);
    console.log(merged);
    axios
      .post(`${server}/content?parcelId=${props.aboutBox.id}`, merged)
      .then(res => {
        setNotificationMessage("Success: Updated the box details ");
        setNotificationType("success");
        setOpenNotification(true);
      })
      .catch(err => {
        console.log(err);
        // window.alert(err);
        setNotificationMessage("Error: Unable to update box details ");
        setNotificationType("error");
        setOpenNotification(true);
      });
    // console.log(merged);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      setOpenNotification(false);
    }

    setOpenNotification(false);
  };

  const showStuffList = () => {
    const stuffListInArray = Object.keys(stuffList).map(
      stuff => stuffList[stuff]
    );
    // console.log(stuffListInArray);
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

  const showPictures = () =>
    pictures.map((picture, i) => (
      <img key={i} src={picture.img} height="120px" />
    ));

  const getFiles = files => {
    const acceptedImageTypes = ["image/jpg", "image/jpeg", "image/png"];
    const filteredFiles = files.filter(file =>
      acceptedImageTypes.includes(file.type)
    );
    setPictures(
      filteredFiles.map(file => {
        return { img: file.base64 };
      })
    );
  };
  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          <Snackbar
            open={openNotification}
            autoHideDuration={2000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity={notificationType}>
              {notificationMessage}
            </Alert>
          </Snackbar>
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
                      value={boxDimensions.weight}
                      onChange={e =>
                        setBoxDimensions({
                          ...boxDimensions,
                          weight: e.target.value
                        })
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
                      value={boxDimensions.height}
                      onChange={e =>
                        setBoxDimensions({
                          ...boxDimensions,
                          height: e.target.value
                        })
                      }
                    />

                    <TextField
                      id="outlined-basic"
                      label="Width"
                      variant="outlined"
                      value={boxDimensions.width}
                      onChange={e =>
                        setBoxDimensions({
                          ...boxDimensions,
                          width: e.target.value
                        })
                      }
                    />

                    <TextField
                      id="outlined-basic"
                      label="Length"
                      variant="outlined"
                      value={boxDimensions.length}
                      onChange={e =>
                        setBoxDimensions({
                          ...boxDimensions,
                          length: e.target.value
                        })
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
                <FileBase64 multiple={true} onDone={getFiles} />
                <div className="main-box-manangement-photos--content-gallery">
                  {showPictures()}
                </div>
                <div style={{ textAlign: "center" }}>
                  Only file formats with jpeg|png|jpg will be accepted
                </div>
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
              {loading ? (
                <CircularProgress />
              ) : (
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
              )}
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
        </div>
      )}
    </>
  );
}

export default withRouter(BoxManagement);
