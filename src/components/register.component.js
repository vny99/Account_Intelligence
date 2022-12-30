import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../services/auth.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const vfname = value => {
  if (value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        First name must be under 20 characters.
      </div>
    );
  }
};

const vlname = value => {
  if (value.length > 15) {
    return (
      <div className="alert alert-danger" role="alert">
        Last name must be under 15 characters.
      </div>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeFname = this.onChangeFname.bind(this);
    this.onChangeLname = this.onChangeLname.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeDepartment = this.onChangeDepartment.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);
    
    this.state = {
      fname: "",
      lname: "",
      email: "",
      password: "",
      department: "FCI",
      role: "",
      successful: false,
      message: "",

      departmentsList: [],
      rolesList: []
    };
  }

  componentDidMount() {
    AuthService.getDepartmentsList().then(res => {
      this.setState({ departmentsList: res.data }) })
      
    AuthService.getRolesList().then(res => {
      this.setState({ rolesList: res.data }) })
  }
  
  onChangeFname(e) { this.setState({ fname: e.target.value }); }
  onChangeLname(e) { this.setState({ lname: e.target.value }); }
  onChangeEmail(e) { this.setState({ email: e.target.value }); }
  onChangePassword(e) { this.setState({ password: e.target.value }); }
  onChangeDepartment(e) { this.setState({ department: e.target.value }); }
  onChangeRole(e) { this.setState({ role: e.target.value }); }

  handleRegister(e) {
    e.preventDefault();
    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.fname,
        this.state.lname,
        this.state.email,
        this.state.password,
        this.state.department,
        this.state.role
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },

        error => {
          const resMessage =
            (
              error.response &&
              error.response.data &&
              error.response.data.message
            ) || error.message || error.toString();
            
            this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
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
            onSubmit={this.handleRegister}
            ref={c => { this.form = c; }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="fname">First name</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="fname"
                    value={this.state.fname}
                    onChange={this.onChangeFname}
                    validations={[required, vfname]}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="lname">Last name</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="lname"
                    value={this.state.lname}
                    onChange={this.onChangeLname}
                    validations={[required, vlname]}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>

                <div class="form-group">
                  <label>Department</label>
                  <select class="form-select" aria-label="Default select example"
                    value={this.state.department}
                    onChange={this.onChangeDepartment}
                  >
                    { this.state.departmentsList.map( dept =>
                      <option>
                        {dept.name}
                      </option>
                    )}

                  </select>
                </div>

                <div class="form-group">
                  <label>Role</label>
                  <select class="form-select" aria-label="Default select example"
                    value={this.state.role}
                    onChange={this.onChangeRole}
                  >
                    { this.state.rolesList.map( r =>
                      <option>
                        {r.name}
                      </option>
                    )}

                  </select>
                </div>
                
                <div className="form-group">
                  <br></br>
                  <button style={{"marginLeft":"100px"}} className="btn btn-primary btn-block"><span>Sign Up</span></button>
                </div>

              </div>

            )}
            
            {this.state.message && (
              <div className="form-group text-center">
                <div
                  className={
                    this.state.successful ? "alert alert-success" : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>

                <a href="/login" type="button" class="btn btn-secondary">Login</a>

              </div>
            )}

            <CheckButton
              style={{ display: "none" }}
              ref={c => { this.checkBtn = c; }}
            />

          </Form>

        </div>
      </div>
    );
  }
}