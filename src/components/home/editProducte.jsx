import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import socket from "../../config/socketConfig";

import "./home.css";

class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: props.location.state.product,
      formData: {
        _id: props.location.state.product._id,
        name: props.location.state.product.name,
        type: props.location.state.product.type,
        price: props.location.state.product.price,
        rating: props.location.state.product.rating,
        warrantyYears: props.location.state.product.warranty_years,
        available: props.location.state.product.available
      }
    };
  }

  handleChange = event => {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
  };

  handleSubmit = async e => {
    e.preventDefault();
    var product = this.state.formData;
    socket.emit("updateProduct", product);
  };
  returnToAllProduct = () => {
    this.props.history.push("/");
  };

  render() {
    const { formData } = this.state;
    return (
      <div>
        <div className="buttonWithMargin">
          <Button
            color="primary"
            onClick={this.returnToAllProduct}
            variant="outlined"
          >
            Return
          </Button>
        </div>
        <h1 className="centerElement">Edit Product</h1>
        <div className="centerPage">
          <ValidatorForm ref="form" onSubmit={this.handleSubmit}>
            <TextValidator
              style={{ margin: "5%" }}
              placeholder="Name"
              onChange={this.handleChange}
              name="name"
              value={formData.name}
              validators={["required"]}
              errorMessages={["this name is required"]}
            />

            <TextValidator
              style={{ margin: "5%" }}
              placeholder="Type"
              onChange={this.handleChange}
              name="type"
              value={formData.type}
              validators={["required"]}
              errorMessages={["this type is required"]}
            />

            <TextValidator
              style={{ margin: "5%" }}
              placeholder="Price"
              onChange={this.handleChange}
              name="price"
              value={formData.price}
              validators={["required"]}
              errorMessages={["this price is required"]}
            />

            <TextValidator
              style={{ margin: "5%" }}
              placeholder="Rating"
              onChange={this.handleChange}
              name="rating"
              value={formData.rating}
              validators={["required"]}
              errorMessages={["this rating is required"]}
            />

            <TextValidator
              style={{ margin: "5%" }}
              placeholder="Warranty years"
              onChange={this.handleChange}
              name="warrantyYears"
              value={formData.warrantyYears}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <Select
              style={{ margin: "5%" }}
              placeholder="Warranty years"
              name="available"
              onChange={this.handleChange}
              value={formData.available}
            >
              <MenuItem value={true}>available</MenuItem>
              <MenuItem value={false}>Not available</MenuItem>
            </Select>
            <br />
            <Button
              style={{ margin: "5%" }}
              color="primary"
              variant="contained"
              type="submit"
            >
              Edit
            </Button>
          </ValidatorForm>
        </div>
      </div>
    );
  }
}

export default EditProduct;
