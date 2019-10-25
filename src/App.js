import React, { Component } from "react";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect
} from "react-router-dom";
import { createBrowserHistory } from "history";
import axios from "axios";
import Login from "./components/auth/signIn";
import Home from "./components/home/home";
import NotFound from "./components/not-found/notFound";
import ServerError from "./components/server-error/serverError";
import EditProduct from "./components/home/editProducte";
import SignUp from "../src/components/auth/signUp";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./App.css";

export const history = createBrowserHistory();
class App extends Component {
  constructor(props) {
    super(props);

    this.handler = this.handler.bind(this);
    const connected = localStorage.getItem("connected");
    this.setState({
      connected: connected
    });
  }
  componentDidMount() {
    console.log("didMOunt");
    this.verifConnect();
  }

  handler(connected) {
    this.setState({
      connected: connected
    });
  }
  verifConnect() {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios
      .get("http://localhost:4000/api/auth/verifAccess")
      .then(res => {
        if (res.status === 200) {
          localStorage.setItem("connected", true);
          this.setState({
            connected: "true",
            verified: "true"
          });
        }
      })
      .catch(error => {
        localStorage.setItem("connected", false);
        this.setState({
          connected: "false",
          verified: true
        });
      });
  }

  state = {
    verified: false,
    connected: localStorage.getItem("connected")
  };

  render() {
    const { connected } = this.state;

    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={() =>
          this.state.connected === "true" ? (
            <Component />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    );

    return this.state.verified === false ? (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh"
        }}
      >
        <CircularProgress />
      </div>
    ) : (
      <React.Fragment>
        <Router history={history}>
          <Switch>
            <Route path="/signUp" component={SignUp} />
            <Route path="/products/:id" component={EditProduct} />
            <Route exact path="/server-error" component={ServerError} />
            <Route path="/not-found" component={NotFound} />
            <PrivateRoute
              exact
              path="/"
              component={() => <Home connected={this.handler} />}
            />

            {connected === "true" ? (
              <Switch>
                <Route
                  exact
                  path={["/", "/products/:id"]}
                  component={() => <Home connected={this.handler} />}
                />

                <Redirect from="/login" to="/" />
                <Route component={NotFound} />
              </Switch>
            ) : (
              <Switch>
                <Route
                  exact
                  path="/login"
                  component={() => <Login connected={this.handler} />}
                />
                <Redirect to="/login" />
                {/* <Route component={NotFound} /> */}
              </Switch>
            )}
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
