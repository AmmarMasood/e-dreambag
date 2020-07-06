import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import "../UserRequest.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import FileBase64 from "react-file-base64";
import setAuthToken from "../../../Utils/setAuthToken";
import axios from "axios";
import { server } from "../../../Utils/Server";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function UploadFiles({ id }) {
  const [passport, setPassport] = useState([]);
  const [certificate, setCertificate] = useState([]);
  const [koreanCertificate, setKoreanCertificate] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [notificationType, setNotificationType] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    setAuthToken(localStorage.getItem("token"));
    setLoading(true);
    axios
      .get(`${server}/documents?luggageId=${id}`)
      .then(res => {
        setKoreanCertificate(res.data.koreanCard);
        setPassport(res.data.passportCopy);
        setCertificate(res.data.immigrationCertificate);
        setLoading(false);
      })
      .catch(err => {
        // window.alert(err);
        console.log(err);
        setNotificationMessage("Error: Unable get the documents ");
        setNotificationType("error");
        setOpenNotification(true);
        setLoading(false);
      });
  }, []);
  const onButtonSubmit = () => {
    const obj = {
      koreanCard: koreanCertificate,

      immigrationCertificate: certificate,

      passportCopy: passport
    };
    axios
      .post(`${server}/documents?luggageId=${id}`, obj)
      .then(res => {
        setNotificationMessage("Success: Updated the documents ");
        setNotificationType("success");
        setOpenNotification(true);
        setLoading(false);
      })
      .catch(err => {
        setNotificationMessage("Error: Unable to update document ");
        setNotificationType("error");
        setOpenNotification(true);
        setLoading(false);
        console.log(err);
        // window.alert(err);
      });
  };

  const getPassportFiles = file => {
    const acceptedImageTypes = ["image/jpg", "image/jpeg", "image/png"];
    if (acceptedImageTypes.includes(file.type)) {
      setPassport(file.base64);
    } else {
      window.alert("Only image files can be uploaded");
    }
  };

  const getCertificateFiles = file => {
    const acceptedImageTypes = ["image/jpg", "image/jpeg", "image/png"];
    if (acceptedImageTypes.includes(file.type)) {
      setCertificate(file.base64);
    } else {
      window.alert("Only image files can be uploaded");
    }
  };
  const getKoreanFiles = file => {
    const acceptedImageTypes = ["image/jpg", "image/jpeg", "image/png"];
    if (acceptedImageTypes.includes(file.type)) {
      setKoreanCertificate(file.base64);
    } else {
      window.alert("Only image files can be uploaded");
    }
  };

  const showPassport = () => <img src={passport} height="130px" />;
  const showCertificate = () => <img src={certificate} height="130px" />;
  const showKorean = () => <img src={koreanCertificate} height="130px" />;
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      setOpenNotification(false);
    }

    setOpenNotification(false);
  };
  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="uploadfiles-container">
          <Snackbar
            open={openNotification}
            autoHideDuration={2000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity={notificationType}>
              {notificationMessage}
            </Alert>
          </Snackbar>
          <div className="uploadfile-container">
            <h4>Passport Copy</h4>
            <FileBase64 multiple={false} onDone={getPassportFiles} />
            <div className="uploadfile-container-gallery">{showPassport()}</div>
            <div style={{ textAlign: "center" }}>
              Only file formats with jpeg|png|jpg will be accepted
            </div>
          </div>
          <div className="uploadfile-container">
            <h4>Immigration Certificate</h4>
            <FileBase64 multiple={false} onDone={getCertificateFiles} />
            <div className="uploadfile-container-gallery">
              {showCertificate()}
            </div>
            <div style={{ textAlign: "center" }}>
              Only file formats with jpeg|png|jpg will be accepted
            </div>
          </div>
          <div className="uploadfile-container">
            <h4>Korean Certificate</h4>
            <FileBase64 multiple={false} onDone={getKoreanFiles} />
            <div className="uploadfile-container-gallery">{showKorean()}</div>
            <div style={{ textAlign: "center" }}>
              Only file formats with jpeg|png|jpg will be accepted
            </div>
          </div>
        </div>
      )}

      <div>
        <Button
          variant="contained"
          color="default"
          style={{ marginTop: "50px", marginBotton: "100px" }}
          onClick={onButtonSubmit}
        >
          Upload Files
        </Button>
      </div>
    </div>
  );
}

export default UploadFiles;
