import React, { useState, Fragment } from "react";
///MUI
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles({
  root: {
    width: "100%",
    maxWidth: 1000,
    margin: "auto",
    border: "5px",
    marginTop: 100
  },
  button: {
    maxWidth: 500,
    textAlign: "center",
    marginTop: "20px",
    marginLeft: "250px",
    justifyItems: "center",
  },
});
function Form(props) {
  const classes = useStyles();
  const [id, setId] = useState();
  const [name, setName] = useState("");


    function createProduct(id, name) {
      // setLoading(true);
      props.marketPlace.methods
        .createProduct(id, name)
        .send({ from: props.account })
        .on("receipt", function (receipt) {
          console.log(receipt);
          alert("Create Successfully");
        })
        .on("error", function (error, receipt) {
          console.log("receiptE", receipt);
          console.log("error", error);
        });
    }

  const handleSubmit = (event) => {
      event.preventDefault()
    createProduct(id, name);
    
  };

  return (
    <div className={classes.root}>
      <Typography variant="h5" gutterBottom>
        Create Product
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          required
          id="id"
          type="number"
          onChange={(e) => setId(e.target.value)}
          label="Product Id"
          
          fullWidth
        />

        <TextField
          required
          id="name"
          type="text"
          onChange={(e) => setName(e.target.value)}
          label="Product Name"
        
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          fullWidth
          type="submit"
        >
          Create
        </Button>
      </form>
    </div>
  );
}

export default Form;
