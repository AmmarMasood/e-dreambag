import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import QSidebar from "../Sidebar/QSidebar";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function ButtonAppBar({ colorInvert }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <QSidebar />
      <AppBar
        position="static"
        style={{ backgroundColor: colorInvert ? "#ffffff" : "#3f51b5" }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            aria-label="menu"
          >
            <p
              style={{
                margin: "0",
                color: colorInvert ? "#3f51b5" : "#ffffff"
              }}
            >
              eDreambag.com
            </p>
          </IconButton>
          <Typography variant="h6" className={classes.title}></Typography>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => setSidebarOpen(true)}
          >
            <MenuIcon />
          </IconButton> */}
        </Toolbar>
      </AppBar>
      <QSidebar colorInvert={colorInvert} />
    </div>
  );
}
