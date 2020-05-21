import React from "react";
import Appbar from "../Quotation/Appbar/QAppbar";
import Button from "@material-ui/core/Button";
import "./Home.css";

function Home() {
  return (
    <>
      <Appbar />
      <div className="home">
        {/* <video autoplay muted loop>
          <source
            src={require("../../Images/GOMCAM 20200513_0036330684.mp4")}
            type="video/mp4"
          />
        </video> */}
        <div className="home-m">
          <div className="home-m--t">
            <div>International Students Returning Director</div>
            <div>
              <Button
                variant="outlined"
                color="primary"
                style={{ fontSize: "20px", marginRight: "10px" }}
              >
                Service Usage Guide
              </Button>
              <Button
                variant="contained"
                color="primary"
                style={{ fontSize: "20px", marginLeft: "10px" }}
              >
                See Real Reviews
              </Button>
            </div>
          </div>

          <div className="home-m--i">
            <div className="home-m--i-btn">
              <Button variant="contained" color="primary">
                <div style={{ paddingBottom: "10px", fontSize: "20px" }}>
                  Returning Director
                </div>
                <div>Quotation/Application</div>
              </Button>
            </div>

            <div className="home-m--i-btn">
              <div className="home-m--i-btn-border">
                <Button variant="contained" color="primary">
                  <div
                    style={{
                      paddingBottom: "10px",
                      paddingRight: "13px",
                      paddingLeft: "13px",
                      fontSize: "20px"
                    }}
                  >
                    Luggage Storage
                  </div>
                  <div>Quotation/Application</div>
                </Button>
              </div>
            </div>
            <div className="home-m--i-btn">
              <Button variant="contained" color="primary">
                <div
                  style={{
                    paddingBottom: "10px",
                    paddingRight: "43px",
                    paddingLeft: "43px",
                    fontSize: "20px"
                  }}
                >
                  US Director
                </div>
                <div>Quotation/Application</div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
