import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import DialogTitle from "@material-ui/core/DialogTitle";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import addProductService from "./addProductService";

class ModalProduct extends Component {
  state = {
    openModal: false,
    formData: {
      name: "",
      type: "",
      price: "",
      rating: "",
      warranty_years: "",
      available: ""
    },
    submitted: false
  };

  handleChange = event => {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
  };

  handleSubmit = async e => {
    e.preventDefault();
    addProductService.createProduct(this.state.formData).then(res => {
      if (res.success === true) {
        this.handleClose();
        this.setState({
          formData: {
            name: "",
            type: "",
            price: "",
            rating: "",
            warranty_years: "",
            available: ""
          }
        });
      }
    });
  };
  handleClickOpen = () => {
    this.setState({
      openModal: true
    });
  };

  handleClose = () => {
    this.setState({
      openModal: false
    });
  };
  render() {
    const { formData, submitted } = this.state;
    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
        >
          ADD PRODUCT
        </Button>
        <Dialog
          open={this.state.openModal}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">ADD PRODUCT</DialogTitle>
          <DialogContent>
            <div>
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
                  disabled={submitted}
                >
                  Submit
                </Button>
                <Button onClick={this.handleClose} color="primary">
                  Cancel
                </Button>
              </ValidatorForm>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default ModalProduct;
