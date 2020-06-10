import React, { useState } from "react";

//MUI
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
const useStyles = makeStyles({
  root: {
    width: "100%",
    maxWidth: 1000,
    margin: "auto",
    border: "5px",
  },
  button: {
    maxWidth: 500,
    textAlign: "center",
    marginTop: "20px",
    marginLeft: "250px",
    justifyItems: "center",
  },
});
function UserForm(props) {
  const classes = useStyles();
  
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");

  function RegisterUser(address, name, role) {
    props.marketPlace.methods.registerUser(address, name, role).send({ from: props.account })
    .on("receipt", function (receipt) {
        console.log(receipt);
      })
      .on("error", function (error, receipt) {
        console.log("receiptE", receipt);
        console.log("error", error);
      });
  }


  const handleSubmit = (event) =>{
      event.preventDefault()
      RegisterUser(props.account, userName,role)

  }
  return (
    <div className={classes.root}>
      <Typography variant="h5" gutterBottom>
        User Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          required
          InputProps={{
            readOnly: true,
          }}
          id="address"
          value={props.account}
          label="User address"
          fullWidth
        />

        <TextField
          required
          id="name"
          type="text"
          onChange={(e) => setUserName(e.target.value)}
          label="User Name"
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel id="role">Role</InputLabel>
          <Select
            labelId="User role"
            id="select role"
            value={role}
            onChange={e=> setRole(e.target.value)}
          >
            <MenuItem value={1}>Manuactor</MenuItem>
            <MenuItem value={2}>Shipper</MenuItem>
            <MenuItem value={3}>Retailer</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          fullWidth
          type="submit"
        >
          Register
        </Button>
      </form>
    </div>
  );
}

export default UserForm;
