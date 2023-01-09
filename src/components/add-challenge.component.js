import React, { Component } from "react";
import BusinessChallengesService from "../services/business-challenge.service";
import "./add-challenge.component.css"

export default class AddChallenge extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeBusinessArea = this.onChangeBusinessArea.bind(this);
    this.onChangeExpiryDate=this.onChangeExpiryDate.bind(this);
    this.saveChallenge = this.saveChallenge.bind(this);
    this.newChallenge = this.newChallenge.bind(this);

    this.state =
    {
      id: null,
      title: "",
      description: "",
      businessArea: "Finance",
      expiryDate:"",
      submitted: false,
      businessAreasList :[],
      tv:false,
      dv:false,
      dav:false
    };
  }

  componentDidMount() {
    BusinessChallengesService.getBusinessAreasList().then(res => {
      this.setState({businessAreasList : res.data }) })
  }

  onChangeTitle(e) {
    this.setState({tv:true})
    this.setState({ title: e.target.value });
  }

  onChangeDescription(e) {
    this.setState({dv:true})
    this.setState({ description: e.target.value });
  }

  onChangeBusinessArea(e) {
    this.setState ({ businessArea: e.target.value });
  }

  onChangeExpiryDate(e) {
    this.setState({dav:true})
    this.setState({ expiryDate: e.target.value });
  }

  saveChallenge() {
    if(this.state.tv === true && this.state.dv === true && this.state.dav === true){
      var challenge = {
        challengeTitle: this.state.title,
        challengeDescription: this.state.description,
        businessArea: this.state.businessArea,
        expiryDate:this.state.expiryDate
      };
      BusinessChallengesService.addBusinessChallenge(challenge)
      .then((res)=>{ 
        this.setState({
          id: res.data.id,
          title: res.data.challengeTitle,
          description:res.data.challengeDescription ,
          businessArea: res.data.businessArea,
          expiryDate:res.data.expiryDate,
          submitted:true
        })
      })
    }
  }

  newChallenge() 
  {
    this.setState({
      id: null,
      title: "",
      description: "",
      businessArea: "Finance",
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
            <a href="/challenges"> <button className="btn btn-secondary" style={{"width":"20%"}}>Ok</button></a>
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

              <div class="form-group">
                <label>Business Area</label>
                <select class="form-select" aria-label="Default select example"
                value={this.state.businessArea}
                onChange={this.onChangeBusinessArea}>
                  { this.state.businessAreasList.map( bc => <option>{bc.name}</option> )}
                </select>
              </div>

              <label htmlFor="date">Expiry Date</label>
              <input
                type="date"
                className="form-control challenge-date-input"
                id="expiryDate"
                required
                value=" "
                // value={this.state.expiryDate}
                onChange={this.onChangeExpiryDate}
                name="expiryDate"
              />
            </div>

            <div style={{"textAlign":"center"}}>
              <button onClick={this.saveChallenge} style={{"marginTop":"20px"}} className="btn btn-secondary" disabled={this.state.title.length<2||this.state.description.length<1}>
                Submit
              </button>
            </div>

          </div>
        )}
      </div>
    );
  }
}
