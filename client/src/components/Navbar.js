import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minWidth: 150,
    
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  account: {
    fontSize: 15,
    alignContent: 'right'
  },
}));

function Navbar({ account }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            <Link to="/" style={{ color: "#FFF", textDecoration: "none" }}>
              Marketplace
            </Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Link
              to="/create"
              style={{ color: "#FFF", textDecoration: "none" }}
            >
              Create 
            </Link>
          </Typography>

          <Typography variant="h6" className={classes.title}>
            <Link
              to="/ship"
              style={{ color: "#FFF", textDecoration: "none" }}
            >
              Pick & Shipping 
            </Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Link
              to="/receive"
              style={{ color: "#FFF", textDecoration: "none" }}
            >
              Receive
            </Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Link
              to="/register"
              style={{ color: "#FFF", textDecoration: "none" }}
            >
              Register for Marketplace
            </Link>
          </Typography>
          <Typography variant="h6" className={classes.account}>
            Account : {account}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
