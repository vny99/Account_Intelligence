import React, { Component } from "react";

import "./dropdown.component.css";
import Ideasearch from "./search-ideas.component";
import BusinessChallengesSearch from "./search-challenges.component";


export default class Dropdown extends Component{
    constructor(props) {
        super(props);
        this.state = {
          condition: true
        };
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(condition) {
      this.setState( {condition} )
    }

  render() {
     const { condition } = this.state;
     return (
         <div className = "drop">
            <div class = "select">
          <select>
          <option><button class = "btn1" onClick={() => this.handleClick(true)}>Ideas</button></option>
          <option><button class = "btn2" onClick={() => this.handleClick(false)}>BusinessChallenges</button></option></select></div>
           
          {condition === true ? <Ideasearch /> : <BusinessChallengesSearch />}

         </div>
     )
  }
}

