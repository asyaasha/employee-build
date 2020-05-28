// React imports
import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import { Switch, Route } from "react-router-dom";
// Components
import CreateEmployeeComponent from "./CreateEmployeeComponent";
import UpdateEmployeeComponent from "./UpdateEmployeeComponent";
import DashboardClientsComponent from "./DashboardClientsComponent";
import Header from "./Header";
// Material UI
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import FaceIcon from "@material-ui/icons/Face";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";

const App = (props) => {
  const drawerWidth = 240;

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
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
    drawerPaper: {
      width: drawerWidth,
    },
    topLink: {
      fontWeight: "semibold",
      paddingLeft: 20,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }));

  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {["Champion", "Need Attention", "Cold", "At Risk"].map(
          (text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          )
        )}
      </List>
      <Divider />
      <List>
        {["Inbox"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/">
            <IconButton edge="end" aria-label="icon">
              <FaceIcon size="medium" className={classes.icon} />{" "}
              <Typography className={classes.typoLight} variant="h6">
                &nbsp;EMP
              </Typography>
              <Typography className={classes.typoDark} variant="h6">
                AVA
              </Typography>
            </IconButton>
          </Link>
          <Typography className={classes.topLink}>FILTER</Typography>
          <Typography className={classes.topLink}>ORGANISE</Typography>
          <Typography className={classes.topLink}>SHARE ROOM</Typography>
          <Link to="/create">
            <Tooltip title="Add Client" aria-label="add-client">
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
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main>
        <Switch>
          <Route
            exact
            path={["/", "/index.html"]}
            component={DashboardClientsComponent}
          />
          <Route exact path="/create" component={CreateEmployeeComponent} />
        </Switch>
      </main>
    </div>
  );
};

export default withRouter(App);
