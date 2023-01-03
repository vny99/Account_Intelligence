import React, { Component } from "react";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import "./edit-profile.component.css";

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userReady: false,
      currentUser: [],
      userDetails: {},
      role: "",
      fname:"",
      lname:"",
      email:"",
      department:"",
      url: "",
      errors: {},
      status: false,
    };

    this.onChangelname = this.onChangelname.bind(this);
    this.onChangefname = this.onChangefname.bind(this);
    this.onChangeemail = this.onChangeemail.bind(this);
    this.onChangedepartment = this.onChangedepartment.bind(this);
    this.onChangerole = this.onChangerole.bind(this);
    this.saveProfile = this.saveProfile.bind(this);
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
   
    if (user) {
      UserService.getUserByEmail(user.email).then((res) => {
        this.setState({
          userDetails: res.data,
          status: res.data.active,
          role: res.data.role.name,
          fname:res.data.fname,
          lname:res.data.lname,
          email:res.data.email,
          department:res.data.department,
          role:res.data.role.name,
          url: "/profile" 
        });
      });
      this.setState({ currentUser: user, });
    }
  }

  formValidation = () => {
    const { fname, lname,department } = this.state;
    let isValid = true;
    const errors = {};
    if (fname.length <=0 ) {
      errors.fname = "Please Enter Your First Name";
      isValid = false;
    }
    if (lname.length <=0) {
      errors.lname = "Please Enter Your Last Name";
      isValid = false;
    }
    if (department.length <=0 ) {
      errors.department = "Please Enter Your Department Name";
      isValid = false;
    }
    this.setState({ errors });
    return isValid;
  };
  
  onChangefname(e) {
    this.setState({ fname: e.target.value, });
  }
  onChangelname(e) {
    this.setState({ lname: e.target.value, });
  }
  
  onChangeemail(e) {
    this.setState({ email: e.target.value, });
  }
  onChangedepartment(e) {
    this.setState({ department: e.target.value, });
  }

  onChangerole(e) {
    this.setState({ role: e.target.value, });
  }

  saveProfile() {
    const isValid = this.formValidation();
    var id1 = this.props;
    if (isValid) {
      var profile = {
        id:id1.id,
        fname:this.state.fname,
        lname:this.state.lname,
        email:this.state.email,
        department:this.state.department
      };
      var user = AuthService.getCurrentUser();
      UserService.updateUserByEmail(profile.email, profile, user).then(() => { this.setState({ submitted: true }); });
    }
  }

  render() {
    return (
      <div>
        {this.state.submitted ? (
          <div style={{ textAlign: "center" }}>
            <h4>Profile edited successfully!</h4>
            <a href={this.state.url}>
              {" "}
              <button className="btn btn-success" style={{ width: "20%" }}>
                ok
              </button>
            </a>
          </div>
        ) : (
          <div class="name">   
            <div className="form-group">
              <p className="error_class">{this.state.errors.fname}</p>
              <label htmlFor="fname">FirstName</label>
              <input
                type="text"
                className="form-control"
                id="fname"
                required
                value={this.state.fname}
                onChange={this.onChangefname
                }
                name="fname"
              />
            </div>
            <div className="form-group">
              <p className="error_class">{this.state.errors.lname}</p>
              <label htmlFor="lname">LastName</label>
              <input
                type="text"
                className="form-control"
                id="lname"
                required
                value={this.state.lname}
                onChange={this.onChangelname
                }
                name="lname"
              />
            </div>
            <div className="form-group">
              {/* <p className="error_class">{this.state.errors.title}</p> */}
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                required
                value={this.state.email}
                onChange={this.onChangeemail
                }
                name="email"
                disabled
              />
            </div>
            <div className="form-group">
              <p className="error_class">{this.state.errors.department}</p>
              <label htmlFor="department">Department</label>
              <input
                type="text"
                className="form-control"
                id="department"
                required
                value={this.state.department}
                onChange={this.onChangedepartment
                }
                name="department"
              />
            </div>
            <div className="form-group">
              {/* <p className="error_class">{this.state.errors.title}</p> */}
              <label htmlFor="ROle">Role</label>
              <input
                type="text"
                className="form-control"
                id="role"
                required
                value={this.state.role}
                onChange={this.onChangerole
                }
                name="role"
                disabled
              />
            </div>
            <button
              onClick={this.saveProfile}
              style={{ marginTop: "20px" }}
              className="btn btn-success"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
