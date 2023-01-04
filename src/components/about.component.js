import React, { Component } from "react";
import "./about.component.css"
import Bulb from "./images/bulb.png"

class About extends Component {
    render() {
        return (
            <div className="header section__padding" id="home">
                <div className="header_content">
                    <h2 className="gradient_text">Echo</h2>
                    <h1>Make your ideas come alive</h1>
                    <p>Echo is the knowledge-sharing community among Sopra Sterians where employees provide their thoughts for the improvment of organization and experts put their heads together to crack  toughest challengs.</p>
                </div>
                <div className="header-image">
                    <img src={Bulb} alt="bulb"/>
                </div>
            </div>
        );
    }
}

export default About;