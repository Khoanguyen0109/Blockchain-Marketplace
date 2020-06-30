import React, { useState, useEffect } from "react";

import Web3 from "web3";
import MarketPlace from "../abis/Marketplace.json";

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
  root: {
    marginBottom: 50,
    marginTop: 70,
  },
  table: {
    minWidth: 150,
    maxWidth: 1000,
    margin: "auto",
    marginBottom: 50,
  },
  search: {
    position: "relative",
    width: "100%",
  },
  searchBox: {
    position: "absolute",
    marginLeft: "50px",
  },
});
function TableProduct(props) {
  const classes = useStyles();
  const [marketPlace, setMarketPlace] = useState({});
  const [products, setProducts] = useState([]);
  const [productCount, setProductCount] = useState(0);

  const [searchText, setSearchText] = useState("");
  const stateProduct = ["at Creator", "Shiping", "Received"];

  // const Count = props.marketPlace.methods.productCount()

  // console.log('Count :>> ', Count);
  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }
  async function loadBlockchainData() {
    const web3 = window.web3;
    const networkId = await web3.eth.net.getId();
    const networkData = MarketPlace.networks[networkId];
    if (networkData) {
      const marketPlace = await new web3.eth.Contract(
        MarketPlace.abi,
        networkData.address
      );
      setMarketPlace(marketPlace);

      const Count = await marketPlace.methods.productCount().call();
      setProductCount(Count);
      const list = [];
      for (var i = 1; i <= Count; i++) {
        const product = await marketPlace.methods.products(i).call();
        list.push(product);
      }
      setProducts(list);
    } else {
      window.alert("marketPlace contract not deployed to detected network.");
    }
  }

  let filetProduct = products
    ? products.filter((product) => {
        return product.productID.toString().indexOf(searchText) !== -1;
      })
    : [];

  return (
    <div className={classes.root}>
      <div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow className={classes.search}>
                <SearchIcon />
                <InputBase
                  placeholder="Search…"
                  onChange={(event) =>
                    setSearchText(event.target.value.substr(0, 20))
                  }
                  className={classes.searchBox}
                  inputProps={{ "aria-label": "search" }}
                />
              </TableRow>
              <TableRow>
                <TableCell align="left">Id Product</TableCell>
                <TableCell align="left"> Name</TableCell>
                <TableCell align="right">Manufactor</TableCell>
                <TableCell align="right">Shipper</TableCell>
                <TableCell align="right">Retailer</TableCell>
                <TableCell align="right">Product State</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filetProduct.map((product) => (
                <TableRow key={product.productID}>
                  <TableCell style={{ width: "200" }}>
                    {product.productID}
                  </TableCell>
                  <TableCell align="left" component="th" scope="row">
                    {product.productName}
                  </TableCell>
                  <TableCell align="right">{product.manufactor}</TableCell>
                  <TableCell align="right">{product.shipper}</TableCell>
                  <TableCell align="right">{product.retailer}</TableCell>
                  <TableCell align="right">
                    {stateProduct[product.status]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default TableProduct;
