import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import { server } from "../../../Utils/Server";
import setAuthToken from "../../../Utils/setAuthToken";
function ShowLabel({ id }) {
  const [label, setLabel] = useState({ labelList: [] });
  const [loading, setLoading] = useState(false);

  const getLabel = () =>
    label.labelList.map((label, i) => (
      <div
        key={i}
        style={{
          textAlign: "left",
          padding: "10px",
          position: "relative"
        }}
      >
        <p>Box {i + 1}</p>
        <a href={`${label.url}`} target="_blank">
          {label.url}
        </a>
      </div>
    ));
  useEffect(() => {
    setAuthToken(localStorage.getItem("token"));
    setLoading(true);
    axios
      .get(`${server}/getlabels?shipmentId=${id}`, { data: {} })
      .then(res => {
        console.log(res.data);
        setLabel(res.data);
        setLoading(false);
      })
      .catch(err => {
        window.alert(
          "Can not find US Address. Please add US Address to generate labels."
        );
        console.log(err);
        setLoading(false);
      });
  }, []);
  return <div>{loading ? <CircularProgress /> : getLabel()}</div>;
}

export default ShowLabel;
