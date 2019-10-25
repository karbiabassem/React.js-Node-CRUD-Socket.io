import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import socket from "../../config/socketConfig";
import ModalProduct from "./addProduct";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import StayPrimaryPortrait from "@material-ui/icons/StayPrimaryPortrait";
import "./home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);
  }
  state = {
    authFails: false,
    productForEditing: {},
    data: []
  };
  getData = data => {
    this.setState({ data: data });
  };
  changeData = () => socket.emit("initial_data");
  componentDidMount() {
    socket.emit("initial_data", console.log("emiiit"));
    socket.on("data", this.getData);
    socket.on("change_data", this.changeData);
  }
  componentWillUnmount() {
    socket.off("data");
    socket.off("change_data");
  }
  handler(connect) {
    this.props.connected(connect);
  }
  logout = () => {
    localStorage.setItem("connected", false);
    localStorage.setItem("token", "");
    window.location.reload();
  };
  editProduct = product => {
    this.setState({
      productForEditing: product,
      authFails: true
    });
  };
  deleteProduct = product => {
    socket.emit("deleteProduct", product._id);
  };

  render() {
    if (this.state.authFails)
      return (
        <Redirect
          to={{
            pathname: "/products/" + this.state.productForEditing._id,
            state: { product: this.state.productForEditing }
          }}
        />
      );

    return (
      <React.Fragment>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="buttonWithMargin">
            <Button variant="contained" color="secondary" onClick={this.logout}>
              Log out
            </Button>
          </div>
          <div className="buttonWithMargin">
            <ModalProduct />
          </div>
        </div>
        <div className="centerPage">
          <Grid item xs={12} md={6}>
            <div className="centerElement">
              <Typography variant="h6">List of all Products</Typography>
            </div>
            <div>
              <List>
                {/* dense={dense} */}
                {this.state.data.map(value => {
                  return (
                    <ListItem key={value._id}>
                      <ListItemAvatar>
                        <Avatar>
                          <div style={{ color: "green" }}>
                            <StayPrimaryPortrait />
                          </div>
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={value.name}
                        secondary={
                          <div>
                            <h4>Type: {value.type}</h4>
                            <h2>Price : {value.price}</h2>
                            <h3>Rating :{value.rating}</h3>
                            <h3>warranty_years :{value.warranty_years}</h3>

                            {value.available === true ? (
                              <p>Available</p>
                            ) : (
                              <p>Sorry it's not available</p>
                            )}
                          </div>
                        }
                      />

                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => this.deleteProduct(value)}
                        >
                          <DeleteIcon />
                        </IconButton>
                        <IconButton
                          edge="end"
                          aria-label="edit"
                          onClick={() => this.editProduct(value)}
                        >
                          <EditIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                })}
              </List>
            </div>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
