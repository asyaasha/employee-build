import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
// Material imports
import AppBar from "@material-ui/core/AppBar";
import FaceIcon from "@material-ui/icons/Face";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";

import { makeStyles } from "@material-ui/core/styles";

// Styles
const useStyles = makeStyles((theme) => ({
  root: { background: "#659BDB" },
  icon: {
    boxShadow: "none",
    color: "white",
  },
  typoLight: {
    fontWeight: "bold",
    color: "white",
  },
  typoDark: {
    fontWeight: "bold",
    color: "bisque",
  },
  linkButton: {
    minWidth: 650,
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Grid justify="space-between" container spacing={10}>
          {" "}
          <Grid item>
            <Link to="/" style={{ textDecoration: "none" }}>
              <IconButton edge="end" color="inherit" aria-label="icon">
                <FaceIcon size="medium" className={classes.icon} />{" "}
                <Typography className={classes.typoLight} variant="h6">
                  &nbsp;EMPLOYEES
                </Typography>
                <Typography className={classes.typoDark} variant="h6">
                  {" "}
                  &nbsp;BUILDER
                </Typography>
              </IconButton>
            </Link>
          </Grid>
          <Grid item>
            <Link to="/create">
              <Tooltip title="Add Employee" aria-label="add-employee">
                <IconButton
                  className={classes.icon}
                  size="medium"
                  edge="end"
                  aria-label="icon"
                >
                  <PersonAddIcon />
                </IconButton>
              </Tooltip>
            </Link>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(Header);
