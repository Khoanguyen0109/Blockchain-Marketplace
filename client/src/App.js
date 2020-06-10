import React, { useState, useEffect } from "react";
import Web3 from "web3";
// Route
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
//MUI
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
///
import MarketPlace from "./abis/Marketplace.json";
import Navbar from "./components/Navbar";
import Form from "./components/Form";
import UserForm from "./components/UserForm";
import TableProduct from "./components/Table";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#33c9dc",
      main: "#00bcd4",
      dark: "#008394",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff6333",
      main: "#ff3d00",
      dark: "#b22a00",
      contrastText: "#fff",
    },
  },
});
function App() {
  const [account, setAccount] = useState("");
  const [products, setProducts] = useState([]);
  const [marketPlace, setMarketPlace] = useState({});
  const [productCount, setProductCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  // const [state, setState] = useState({
  //   account: "",
  //   marketPlace: null,
  //   products: [],
  //   users: [],
  //   Count: 0,
  //   Search: "",
  //   loading: true,
  // });

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, [account]);

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
    // Load account
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    console.log("account", account);
    // Network ID
    const networkId = await web3.eth.net.getId();
    const networkData = MarketPlace.networks[networkId];
    if (networkData) {
      const marketPlace = await new web3.eth.Contract(
        MarketPlace.abi,
        networkData.address
      );
      setMarketPlace(marketPlace);

      setLoading(false);
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
  console.log("productCount", productCount);
  console.log(products);
  return (
    <MuiThemeProvider theme={theme}>
      <div>
        <Router>
          <Navbar account={account} />
          <Route exact path="/">
            <TableProduct products={products} />
          </Route>
          <Route exact path="/create">
            <Form account={account} marketPlace={marketPlace} />
          </Route>
          <Route exact path="/ship">
            <h1>Ship</h1>
          </Route>
          <Route exact path="/receive">
            <h1>Receive</h1>
          </Route>
          <Route exact path="/register">
            <UserForm account={account} marketPlace={marketPlace} />{" "}
          </Route>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
