import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import authService from "./authService";
import { history } from "../../App";
class Login extends Component {
  state = {
    formData: {
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
      email: this.state.formData.email,
      password: this.state.formData.password
    };
    const { success } = await authService.login(user);

    if (success) {
      history.push("/");
      window.location.reload();
    } // this.props.connected("true");
  };

  render() {
    const { formData } = this.state;

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
            >
              Sign In
            </Button>
            <br />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Link to="/signUp">Create Account</Link>
            </div>
          </ValidatorForm>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
