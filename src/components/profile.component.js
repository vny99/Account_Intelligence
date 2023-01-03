import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import './profile.component.css';
import { BiEditAlt } from "react-icons/bi";
import Modal from "react-bootstrap/Modal";
import EditPage from "./edit-profile.component";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      userReady: false,
      currentUser: [],
      userDetails: {},
      role: "",
      id: "",
      status: false,
      show: false,
      editId: "",
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

  handleClose = () => {
    this.setState({ show: false, editId: "" });
  };

  handleShow(data) {
    this.setState({ show: true, editId: data });
  }

  render() {
    const { userDetails, status, role, department } = this.state;

    if (this.state.redirect) {
      return <Navigate to = {this.state.redirect} />
    }
    
    return (
      <div>
        <div className="profile-card" style={{"height":"450px"}}>
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
                <span>{ department }</span>
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
            <div className="btn btn-secondary" style={{"marginTop":"40px"}} onClick={() => { this.handleShow(this.state.id); }}>
              <BiEditAlt size={"30px"} />
              Edit Profile
            </div>

          </div>
        </div>

        <Modal show={this.state.show} onHide={this.handleClose} className="name" >
          <Modal.Header closeButton>
            <Modal.Title><h1>Edit Profile</h1></Modal.Title>
          </Modal.Header>
          <Modal.Body><EditPage id={this.state.editId} /></Modal.Body>
        </Modal>

      </div>
    );
  }
}