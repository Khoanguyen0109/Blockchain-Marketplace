import React, { useState } from "react";

//MUI
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    root :{
        marginBottom: 50,
        marginTop:70

    },
  table: {
    minWidth: 150,
    maxWidth: 1000,
    margin: "auto",
    marginBottom: 50,
    
  },
});
function TableProduct(props) {
  const classes = useStyles();
  const [searchText, setSearchText] = useState("");
    const stateProduct =['at Creator','Shiping','Received']
  let filetProduct = props.products.filter((product) => {
    return product.productID.toString().indexOf(searchText) !== -1;
  });

  return (
    <div className={classes.root}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <SearchIcon />
              <InputBase
                placeholder="Search…"
                onChange={(event) =>
                  setSearchText(event.target.value.substr(0, 20))
                }
                inputProps={{ "aria-label": "search" }}
              />
            </TableRow>
            <TableRow>
              <TableCell align="left">Id Product</TableCell>
              <TableCell  align="left"> Name</TableCell>
              <TableCell align="right">Manufactor</TableCell>
              <TableCell align="right">Shipper</TableCell>
              <TableCell align="right">Retailer</TableCell>
              <TableCell align="right">Product State</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filetProduct.map((product) => (
              <TableRow key={product.productID}>
                <TableCell style={{width:'200'}} >
                  {product.productID}
                </TableCell>
                <TableCell align="left" component="th" scope="row" >{product.productName}</TableCell>
                <TableCell align="right">{product.manufactor}</TableCell>
                <TableCell align="right">{product.shipper}</TableCell>
                <TableCell align="right">{product.retailer}</TableCell>
                <TableCell align="right">{stateProduct[product.status]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TableProduct;
