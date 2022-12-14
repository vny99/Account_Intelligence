import React, { Component } from "react";

import RoleService from "../services/role.service";

import Slider from "./Slider/Slider";
import RecentIdeasCardsComponent from './recent-ideas-cards.component';
import MostLikedCardsComponent from "./most-liked-cards.component";
import MostCommentedCardsComponent from "./most-commented-cards.component";

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
          <Slider />
          <RecentIdeasCardsComponent />
          <MostLikedCardsComponent />
          <MostCommentedCardsComponent />
        </header>
      </div>
    );
  }
}