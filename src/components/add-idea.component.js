import React, { Component } from "react";
import IdeaService from "../services/idea.service";
import "./add-idea.component.css"

export default class Addidea extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveidea = this.saveidea.bind(this);
    this.newidea = this.newidea.bind(this);

    this.state = 
    {
      id: null,
      title: "",
      description: "", 
      published: false,

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

  saveidea() {
    var idea = {
      ideaTitle: this.state.title,
      ideaDescription: this.state.description
    };

    IdeaService.postIdea(idea)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newidea() 
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
      <div className="submit-form add-idea-card
      ">
        {this.state.submitted ? (
          <div style={{"textAlign":"center"}}>
            <h4>Idea submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newidea}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <h1>Fresh Ideas</h1>
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
