import React, { useState, Fragment } from "react";
///MUI
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles({
  root: {
    width: "100%",
    maxWidth: 1000,
    margin: "auto",
    border: "5px",
    marginTop: 100,
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
  const formType = props.type;
  console.log("formType :>> ", formType);
  const classes = useStyles();
  const [id, setId] = useState();
  const [name, setName] = useState("");
  const history = useHistory();
  const [errors, setErrors] = useState({});

  function createProduct(id, name) {
    // setLoading(true);
    props.marketPlace.methods
      .createProduct(id, name)
      .send({ from: props.account })
      .on("receipt", function (receipt) {
        console.log(receipt);
        alert("Create Successfully");
        history.push("/");
      })
      .on("error", function (error, receipt) {
        console.log("receiptE", receipt);
        console.log("error", error);
        setErrors(error);
      });
  }

  function shipProduct(id) {
    // setLoading(true);
    props.marketPlace.methods
      .shipProduct(id)
      .send({ from: props.account })
      .on("receipt", function (receipt) {
        console.log(receipt);
        alert("Picked Successfully");
        history.push("/");
      })
      .on("error", function (error, receipt) {
        console.log("receiptE", receipt);
        console.log("error", error);
        setErrors(error);
      });
  }

  function receiveProduct(id) {
    // setLoading(true);
    props.marketPlace.methods
      .receiveProduct(id)
      .send({ from: props.account })
      .on("receipt", function (receipt) {
        console.log(receipt);
        alert("Received Successfully");
        history.push("/");
      })
      .on("error", function (error, receipt) {
        console.log("receiptE", receipt);
        console.log("error", error);
        setErrors(error);
      });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formType === "create") {
      createProduct(id, name);
    } else if (formType == "ship") {
      shipProduct(id);
      console.log('ship')
      console.log('id', id)
    } else if (formType === "receive") {
      receiveProduct(id);
    }

    if (errors !== {}) {
      alert("Make a trasaction");
    } else {
      alert("Create Failed");
      console.log("error", errors);
    }
  };

  return (
    <div className={classes.root}>
      {formType == "create" ? (
        <div>
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
      ) : (
        <div>
          {formType === "ship" ? (
            <Typography variant="h5" gutterBottom>
              Ship
            </Typography>
          ) : (
            <Typography variant="h5" gutterBottom>
              Receive
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              required
              id="id"
              type="number"
              onChange={(e) => setId(e.target.value)}
              label="Product Id"
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              fullWidth
              type="submit"
            >
              {formType == "ship" ? (
                <span> Pick up </span>
              ) : (
                <span> Received</span>
              )}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Form;
