import React, { Component } from "react";
import BusinessChallengesService from "../services/business-challenge.service";
import "./add-challenge.component.css"

export default class AddChallenge extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeExpiryDate=this.onChangeExpiryDate.bind(this);
    
    this.saveChallenge = this.saveChallenge.bind(this);
    this.newChallenge = this.newChallenge.bind(this);

    this.state = 
    {
      id: null,
      title: "",
      description: "", 
      expiryDate:"",
      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeExpiryDate(e) {
    this.setState({
      expiryDate: e.target.value
    });
  }

  saveChallenge() {
    var challenge = {
      challengeTitle: this.state.title,
      challengeDescription: this.state.description,
      expiryDate:this.state.expiryDate
    };
    console.log(challenge)
    BusinessChallengesService.addChallenge(challenge)
    .then((res)=>{
      console.log(res.date);
      this.setState({submitted:true})
    })
  }

  newChallenge() 
  {
    this.setState({
      id: null,
      title: "",
      description: "",
      published: false,
      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form add-challenge-card
      ">
        {this.state.submitted ? (
          <div style={{"textAlign":"center"}}>
            <h4>Business Challenge submitted successfully!</h4>
            <a href="/home"> <button className="btn btn-success" style={{"width":"20%"}}>
             ok
            </button></a>
          </div>
        ) : (
          <div>
            <h1>Add Business Challenge</h1>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div class="form-group">
              <label for="description">Description</label>
              <textarea
                className="form-control"
                id="description"
                required
                rows="5"
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              >
              </textarea>

              <label htmlFor="date">Expiry Date</label>
              <input
                type="date"
                className="form-control challenge-date-input"
                id="expiryDate"
                required
                value="2022-12-31" 
                onChange={this.onChangeExpiryDate}
                name="expiryDate"
              />
            </div>

            <button onClick={this.saveChallenge} style={{"marginTop":"20px"}} className="btn btn-success">
              Submit
            </button>

          </div>
        )}
      </div>
    );
  }
}
