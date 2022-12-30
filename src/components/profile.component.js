import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import './profile.component.css';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      userReady: false,
      currentUser: [],
      userDetails: {},
      role: "",
      department: "",
      status:false
    };
  } 

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      UserService.getUserByEmail(user.email).then((res) => {
        this.setState({
          userDetails: res.data,
          status: res.data.active,
          role: res.data.role.name,
          department: res.data.department.name
        });
      })
      this.setState({ currentUser: user, });
    }

  }

  render() {
    const { userDetails, status, role, department } = this.state;

    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }
    
    return (
      <div className="container profile-container">
        <div className="profile-card">
          <div className='upper-container'>
              <div className='image-container'>
                <img src="profileimage.jpg" alt='profile image' height="100px" width="100px"/>
              </div>
          </div>

          <div className="lower-container">
            <h1>{userDetails.fname + " " + userDetails.lname}</h1>
            <div style={{"paddingTop":"10px"}}>
              <div style={{"fontWeight":"bold", "display":"inline", "textAlign":"left"}}>Email : </div>
              <div style={{"display":"inline", "textAlign":"right"}}>{userDetails.email}</div>
            </div>

            <div style={{"paddingTop":"10px"}}>
              <div style={{"fontWeight":"bold", "display":"inline", "textAlign":"left"}}>Department : </div>
                <span
                  // style={{"marginRight":"10px", "padding":"4px", "border":"4px solid transparent",
                  // "borderRadius":"10px", "backgroundColor":"purple", "color":"white"}}
                >
                  { department }
                </span>
            </div>

            <div style={{"paddingTop":"10px"}}>
              <div style={{"fontWeight":"bold", "display":"inline", "textAlign":"left"}}>Role : </div>
              <span>
                {role === "ROLE_USER" && "User"}
                {role === "ROLE_FIADMIN" && "Fresh Ideas Admin"}
                {role === "ROLE_BCADMIN" && "Business Challenges Admin"}
              </span>
            </div>

            <div style={{"paddingTop":"10px"}}><strong>Status : </strong> {status ? "Active" : "Inactive"} </div>
          </div>
        </div>
      </div>
    );
  }
}