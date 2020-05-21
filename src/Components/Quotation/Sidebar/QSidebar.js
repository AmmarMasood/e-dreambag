import React from "react";
import Sidebar from "react-sidebar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import "../Appbar/QAppbar.css";
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";

class QSidebar extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      sidebarOpen: false
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  render() {
    return (
      <Sidebar
        style={{ zIndex: "100000" }}
        sidebar={
          <div className="sidenav">
            <div className="sidenav-login">
              <div className="sidenav-i">
                <MenuItem component={Link} to={"/"}>
                  Login
                </MenuItem>
                {/* <Link to="">Login</Link> */}
              </div>
              <div className="sidenav-i">
                <MenuItem component={Link} to={"/"}>
                  Register
                </MenuItem>
              </div>
            </div>
            <div className="sidenav-i">
              <MenuItem component={Link} to={"/"}>
                Home
              </MenuItem>
            </div>
            <div className="sidenav-i">
              <MenuItem component={Link} to={"/"}>
                Service Introduction
              </MenuItem>
            </div>
            <div className="sidenav-i">
              <MenuItem component={Link} to={"/estimate"}>
                Quotation and Service Request
              </MenuItem>
            </div>
            <div className="sidenav-i">
              <MenuItem component={Link} to={"/"}>
                FAQ
              </MenuItem>
            </div>
            <div className="sidenav-i">
              <MenuItem component={Link} to={"/"}>
                Inquiry Board
              </MenuItem>
            </div>
            <div className="sidenav-i">
              <MenuItem component={Link} to={"/"}>
                Post Board
              </MenuItem>
            </div>
          </div>
        }
        open={this.state.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        styles={{
          sidebar: {
            background: "white",
            overflow: "hidden"
          }
        }}
        pullRight={true}
      >
        <IconButton
          edge="end"
          // className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={() => this.onSetSidebarOpen(true)}
          style={{
            color: "white",
            left: "40%"
          }}
        >
          <MenuIcon style={{ fontSize: "30px" }} />
        </IconButton>
      </Sidebar>
    );
  }
}

export default QSidebar;
