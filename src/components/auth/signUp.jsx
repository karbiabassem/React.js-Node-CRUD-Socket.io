import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import authService from "./authService";
import { history } from "../../App";
import { Link } from "react-router-dom";

class SignUp extends Component {
  state = {
    formData: {
      name: "",
      email: "",
      password: ""
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
    const user = {
      name: this.state.formData.name,
      email: this.state.formData.email,
      password: this.state.formData.password
    };
    const { success } = await authService.signUp(user);
    if (success) {
      history.push("/login");
      window.location.reload();
    }
  };

  render() {
    const { formData, submitted } = this.state;

    return (
      <React.Fragment>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "90vh"
          }}
        >
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
            <br />
            <TextValidator
              style={{ margin: "5%" }}
              placeholder="E-mail"
              onChange={this.handleChange}
              name="email"
              value={formData.email}
              validators={["required", "isEmail"]}
              errorMessages={["this field is required", "email is not valid"]}
            />
            <br />
            <TextValidator
              style={{ margin: "5%" }}
              placeholder="password"
              type="password"
              onChange={this.handleChange}
              name="password"
              value={formData.password}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <br />
            <Button
              style={{ margin: "5%" }}
              color="primary"
              variant="contained"
              type="submit"
              disabled={submitted}
            >
              Create Account
            </Button>
            <br />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Link to="/login">Sign In</Link>
            </div>
          </ValidatorForm>
        </div>
      </React.Fragment>
    );
  }
}

export default SignUp;
