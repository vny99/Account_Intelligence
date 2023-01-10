import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";

import { withRouter } from '../common/with-router';
import { BiHide, BiShow } from "react-icons/bi";

import "./login.component.css"

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.handlePasswordView = this.handlePasswordView.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      email: "",
      password: "",
      loading: false,
      message: "",
      show:false
    };
  }

  onChangeEmail(e) { this.setState({ email: e.target.value }); }

  onChangePassword(e) {  this.setState({ password: e.target.value }); }

  handlePasswordView() {
    var element = document.getElementById("showPassword");
    if (element.type === "password") {
      element.type = "text";
      this.setState({ show: true })
    }
    else {
      element.type = "password";
      this.setState({ show: false })
    }
  }

  handleLogin(e) {
    e.preventDefault();
    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.email, this.state.password).then(
        () => {
          this.props.router.navigate("/home");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            "Invalid credentials" ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container" style={{"backgroundColor":"rgba(227, 213, 245, 0.632)"}}>
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleLogin}
            ref={c => {
              this.form = c;
            }}
          >
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Input
                type="email"
                className="form-control"
                name="email"
                value={this.state.email}
                onChange={this.onChangeEmail}
                validations={[required]}
              />
            </div>

            <div className="form-group" style={{"position":"relative"}}>
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                id="showPassword"
                className="form-control prevent-select"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required]}
              />
              
              {!this.state.show && <BiShow className="field-icon" onClick={this.handlePasswordView} />}
              {this.state.show && <BiHide className="field-icon" onClick={this.handlePasswordView} />}

            </div>

            <div className="form-group">
              <br></br>
              <button
                style={{"marginLeft":"100px"}}
                className="btn btn-secondary"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>

            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);