import React from 'react';
import axios from 'axios';
import IdeaService from "../services/idea.service";
import authHeader from '../services/auth-header';

export default class EditChallengeById extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      id:'',
      title: '',
      description: '',
      expiryDate: '',
      redirect: false
    }
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeClosingDate=this.onChangeClosingDate.bind(this);
    this.saveidea = this.saveidea.bind(this);
  }

  componentDidMount(){
    const id="6397febf27d2a70ee64b636f";
    IdeaService.getIdeaById(id).then((res)=>{
      this.setState({
          title: res.data.title,
          description: res.data.description,
          closingdate: res.data.closingDate
        });
      console.log(res.data);
    })
  }

  onChangeTitle(e){
    this.setState({
      title: e.target.value
    })
  }
  onChangeDescription(e){
    this.setState({
      description: e.target.value
    })
  }
  onChangeClosingDate(e){
    this.setState({
      closingdate: e.target.value
    })
  }

  saveidea() {
    var idea = {
    id:"6397febf27d2a70ee64b636f",
      title: this.state.title,
      description: this.state.description,
      closingdate:this.state.closingdate
    };
    console.log(idea) 
    axios.post("http://localhost:8080/ideas",idea,{headers:authHeader()})
    // IdeaService.postIdea(idea)
    .then((res)=>{
      console.log(res.date);
      this.setState({submitted:true})
    })
  }

  render() {
      return (
        <div className="submit-form add-idea-card
        ">
          {this.state.submitted ? (
            <div style={{"textAlign":"center"}}>
              <h4>Business Challenge Edit successfully!</h4>
              <a href="/home">  <button className="btn btn-success" style={{"width":"20%"}}>
              ok
              </button></a>
            </div>
          ) : (
            <div>
              <h1>Edit Business Challenge</h1>
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
                  rows="7"
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                  name="description"
                >
                </textarea>
                
              
                <label htmlFor="date">Closing Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="closingDate"
                  required
                  value={this.state.closingDate}
                  onChange={this.onChangeClosingDate}
                  name="closingdate"
                />
              </div>

              <button onClick={this.saveidea} style={{"marginTop":"20px"}} className="btn btn-success">
                Submit
              </button>

            </div>
          )}
        </div>
      );
    }
}