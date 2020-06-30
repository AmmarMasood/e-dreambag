import React, { useState } from "react";
import ImageUploader from "react-images-upload";
import Button from "@material-ui/core/Button";
import "../UserRequest.css";
import CircularProgress from "@material-ui/core/CircularProgress";

function UploadFiles() {
  const [pictures, setPictures] = useState([]);
  const [certificate, setCertificate] = useState([]);
  const [base64Passport, setBase64Passport] = useState([]);
  const [base64Certificate, setBase64Certificate] = useState([]);
  const [loading, setLoading] = useState(false);

  const toBase64 = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

  const convertArrayToBase64 = () => {
    let base64Passporta = [];
    let base64Certificatea = [];
    const base64Images = pictures.map(async pic => await toBase64(pic));
    const base64Images2 = certificate.map(async pic => await toBase64(pic));

    base64Images.map(p => {
      p.then(res => base64Passporta.push(res));
    });
    base64Images2.map(p => {
      p.then(res => base64Certificatea.push(res));
    });
    setBase64Certificate(base64Certificatea);
    setBase64Passport(base64Passporta);
  };

  const onButtonSubmit = () => {
    convertArrayToBase64();
    setLoading(true);

    setTimeout(function() {
      console.log(base64Passport);
      console.log(base64Certificate);
      setLoading(false);
    }, 2000);
  };

  return (
    <div>
      <div className="uploadfiles-container">
        <div className="uploadfile-container">
          <h4>Passport Copy</h4>
          <ImageUploader
            withIcon={true}
            // fileContainerStyle={{
            //   border: "2px solid red"
            // }}
            onChange={picture => setPictures(picture)}
            imgExtension={[".jpg", ".png"]}
            maxFileSize={5242880}
            withPreview={true}
            buttonText="Select Files"
          />
        </div>
        <div className="uploadfile-container">
          <h4>Immigration Certificate</h4>
          <ImageUploader
            withIcon={true}
            // fileContainerStyle={{
            //   border: "2px solid red"
            // }}
            onChange={picture => setCertificate(picture)}
            imgExtension={[".jpg", ".png"]}
            maxFileSize={5242880}
            withPreview={true}
            buttonText="Select Files"
          />
        </div>
      </div>
      <div>
        <Button
          variant="contained"
          color="default"
          style={{ marginTop: "50px", marginBotton: "100px" }}
          onClick={onButtonSubmit}
        >
          {loading ? <CircularProgress /> : "Upload Files"}
        </Button>
      </div>
    </div>
  );
}

export default UploadFiles;
