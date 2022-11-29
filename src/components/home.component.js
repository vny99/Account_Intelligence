import React, { Component } from "react";

import RoleService from "../services/role.service";

import Slider from "./Slider/Slider";
import RecentIdeasTableComponent from './recent-ideas-table.component';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    RoleService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          {/* <h3>{this.state.content}</h3> */}
          {/* <Slider /> */}
          <RecentIdeasTableComponent />
        </header>
      </div>
    );
  }
}