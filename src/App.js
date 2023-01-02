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

import UserService from "./services/user.service";
import AddIdea from "./components/add-idea.component";
import AddChallenge from "./components/add-challenge.component";
import FreshIdeasPage from "./components/fresh-ideas-page.component";
import BusinessChallengesPage from "./components/business-challenges-page.component";
import SearchDropdown from "./components/search-dropdown.component";
import ViewIdeaById from "./components/view-idea-by-id.component";
import ViewChallengeById from "./components/view-challenge-by-id.component";
import EditChallengeById from "./components/edit-challenge.component.js";
import EditComment from "./components/edit-idea-comment.component";
import MyFavoriteIdeasPage from "./components/my-favorite-ideas-page.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      currentUser: undefined,
      userDetails: [],
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      UserService.getUserByEmail(user.email).then((res) => {
        this.setState({ userDetails: res.data});
      })
      this.setState({
        currentUser: user,
        showAdminBoard: user.role.authority.includes("ROLE_BCADMIN"),
      });
    }

  }

  logOut() {
    AuthService.logout();
    this.setState({
      showAdminBoard: false,
      currentUser: undefined,
      userDetails: [],
    });
  }

  render() {
    const { currentUser, showAdminBoard, userDetails } = this.state;

    return (
      <div>
        <Sidebar currentUser = {currentUser} />
        {/* {currentUser && ( <Sidebar /> ) } */}

        <nav className="navbar nav-tabs navbar-expand-sm">
          <Link to={"/about"} className="navbar-brand">
            <strong style={{"fontSize":"xx-large"}}>Echo</strong>
          </Link>
          <div className="navbar-nav mr-auto">
            {currentUser && (
              <div className="navbar-nav collapse navbar-collapse justify-content-end">
                <li className="nav-item">
                  <Link to={"/home"} className="nav-link">
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/addIdea"} className="nav-link">
                    Add Idea
                  </Link>
                </li>
            </div>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/addChallenge"} className="nav-link">
                  Add Business Challenge
                </Link>
              </li>
            )}

            {currentUser && (
              <div className="navbar-nav collapse navbar-collapse justify-content-end">
                <li className="nav-item">
                  <Link to={"/search"} className="nav-link">
                    Search
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/about"} className="nav-link">
                    About
                  </Link>
                </li>
              </div>
            )}

            {/* <li className="nav-item">
              <Link to={"/about"} className="nav-link">
                About
              </Link>
            </li> */}

          </div>

          {currentUser ? (
            <div className="navbar-nav collapse navbar-collapse justify-content-end">
              <div style={{"display":"flex", "flexDirection":"column"}}>
                  <a href="/profile" className="nav-link">
                  {userDetails.fname + " " + userDetails.lname}
                  </a>

                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    Logout
                  </a>
              </div>
              <Userprofile />
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
            )
          }
        </nav>

        <div 
        className="container mt-3"
        >
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/admin" element={<BoardAdmin />} />
            <Route path = "/ideas" element = {<FreshIdeasPage />} />
            <Route path = "/challenges" element = {<BusinessChallengesPage />} />
            <Route path="/addIdea" element={<AddIdea />} />
            <Route path = "/search" element = {<SearchDropdown />} />
            <Route path="/addChallenge" element={<AddChallenge />} />
            <Route path = "/viewIdea/:id" element = {<ViewIdeaById />}/>
            <Route path = "/viewChallenge/:id" element = {<ViewChallengeById />}/>
            <Route path = "/editChallenge/:id" element = {<EditChallengeById />}/>
            <Route path = "/editIdeaComment/:commentId/:commentText" element = {<EditComment />}/>
            <Route path = "/myFavorites" element = {<MyFavoriteIdeasPage />}/>
          </Routes>
        </div>

        {/* <footer class="page-footer font-small ">
          <div class="footer-copyright text-center py-3">© 2023 Copyright:
              <a href='https://www.soprasteria.com/'>   Soprasteria.com</a>
          </div>
        </footer> */}

      </div>
    );
  }
}

export default App;