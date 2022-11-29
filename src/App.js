import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardAdmin from "./components/board-admin.component";
import About from "./components/about.component";

import Sidebar from "./components/Sidebar/Sidebar";
import Userprofile from "./components/userprofile.component";

import RecentIdeasTableComponent from './components/recent-ideas-table.component';
import ViewIdeaByIdComponent from './components/view-idea-by-id.component';

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showAdminBoard } = this.state;

    return (
      <div>
        <Sidebar />
        <nav className="navbar navbar-expand navbar-dark bg-danger">
          <Link to={"/"} className="navbar-brand">
            Echo
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/about"} className="nav-link">
                About
              </Link>
            </li>

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <div className="navbar-nav collapse navbar-collapse justify-content-end">
                <li className="nav-item">
                  <Link to={"/home"} className="nav-link">
                    Home
                  </Link>
                </li>
            </div>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav collapse navbar-collapse justify-content-end">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  Logout
                </a>
              </li>
              <Userprofile className="userprofile" />
            </div>
            
          ) : (
            <div className="navbar-nav collapse navbar-collapse justify-content-end">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>

            
          )}
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/admin" element={<BoardAdmin />} />
            <Route path = "/recentideas" element = {<RecentIdeasTableComponent />} />
            <Route path = "/viewIdea/:id" element = {<ViewIdeaByIdComponent/>}/>
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;