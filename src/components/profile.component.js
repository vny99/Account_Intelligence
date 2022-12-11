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
      userDetails: [],
      roles:[],
      departments:[],
      status:false
    };
  } 

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      UserService.getUserByEmail(user.email).then((res) => {
        this.setState({
          userDetails: res.data,
          roles: res.data.roles,
          departments: res.data.departments,
          status: res.data.active,
        });
      })
      this.setState({
        currentUser: user,
      });
    }
  }

  render() {
    const { userDetails, roles, departments, status } = this.state;
    console.log("status : " + status)

    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }
    
    return (
      <div className="container profile-container">
        <div className="profile-card">
        <div className='upper-container'>
             <div className='image-container'>
               <img src="profileimage.jpg" alt='' height="100px" width="100px"/>
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
            { departments.map((department, key) =>
              <span
                style={{"marginRight":"10px", "padding":"4px", "border":"4px solid transparent",
                "borderRadius":"10px", "backgroundColor":"purple", "color":"white"}}>
                {department}
              </span>) }
          </div>

          <div style={{"paddingTop":"10px"}}>
            <div style={{"fontWeight":"bold", "display":"inline", "textAlign":"left"}}>Role : </div>
            { roles.map((role, key) => <div> {role.name}</div>) }
          </div>

          <div style={{"paddingTop":"10px"}}><strong>Status : </strong> {status ? "Active" : "Inactive"} </div>
        </div>

      </div>
      </div>
    );
  }
}