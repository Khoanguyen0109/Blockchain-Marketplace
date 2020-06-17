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
    display: 'flex',
    minWidth: 150,
    
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  account: {
    flexGrow: 1,
    fontSize: 15,
    alignContent: 'right',
    marginLeft: '50px',
    alignItems:'flex-end',
    right:10
    
  },
  navTool: {
    display: 'flex',
    flexGrow: 2,
    flexWrap: 'wrap',
    alignContent: 'space-between'
  },
  navItem :{
    marginLeft: '30px',
    fontSize:'15px'
  }
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
              <h2>Marketplace</h2>
            </Link>
          </Typography>
          <div  className={classes.navTool}>
          <Typography variant="h6" className={classes.navItem} >
            <Link
              to="/create"
              style={{ color: "#FFF", textDecoration: "none" }}
            >
              <h3> Create </h3>
            </Link>
          </Typography>

          <Typography variant="h6"className={classes.navItem} >
            <Link
              to="/ship"
              style={{ color: "#FFF", textDecoration: "none" }}
            >
              <h3>Pick & Shipping </h3> 
            </Link>
          </Typography>
          <Typography variant="h6"className={classes.navItem}>
            <Link
              to="/receive"
              style={{ color: "#FFF", textDecoration: "none" }}
            >
              <h3>Receive</h3>
            </Link>
          </Typography>
          <Typography variant="h6" className={classes.navItem}>
            <Link
              to="/register"
              style={{ color: "#FFF", textDecoration: "none" }}
            >
              <h3> Register for Marketplace </h3>
            </Link>
          </Typography>
          </div>
          <Typography variant="h6" className={classes.account}>
            Account : {account}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
