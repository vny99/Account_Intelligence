import React, { Component } from "react";
import IdeaService from "../services/idea.service";
import "./add-idea.component.css"

export default class AddIdea extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeBenefitCategory = this.onChangeBenefitCategory.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.saveidea = this.saveidea.bind(this);
    this.newidea = this.newidea.bind(this);

    this.state = 
    {
      id: null,
      title: "",
      description: "", 
      benefitCategory: "Internal",
      category: "Account Initiatives", 
      published: false,
      submitted: false,
      benefitCategoriesList: [],
      categoriesList: []
    };
  }

  componentDidMount() {
    IdeaService.getBenefitCategoriesList().then(res => {
      this.setState({ benefitCategoriesList: res.data }) })

    IdeaService.getCategoriesList().then(res => {
      this.setState({ categoriesList: res.data }) })
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

  onChangeBenefitCategory(e) {
    this.setState({
      benefitCategory: e.target.value
    });
  }

  onChangeCategory(e) {
    this.setState({
      category: e.target.value
    });
  }

  saveidea() {
    var idea = {
      ideaTitle: this.state.title,
      ideaDescription: this.state.description,
      benefitCategory: this.state.benefitCategory,
      category: this.state.category
    };

    IdeaService.addIdea(idea)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          benefitCategory: response.data.benefitCategory,
          category: response.data.category,
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
      benefitCategory: "Internal",
      category: "Account Initiatives",
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
            <a href="/ideas"> <button className="btn btn-secondary" style={{"width":"20%"}}>Ok</button></a>
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
                rows="2"
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              >
              </textarea>
            </div>

            <div class="form-group">
              <label>Benefit Category</label>
              <select class="form-select" aria-label="Default select example"
              value={this.state.benefitCategory}
              onChange={this.onChangeBenefitCategory}>
                { this.state.benefitCategoriesList.map( bc =>
                  <option>
                    {bc.name}
                  </option>
                )}
              </select>
            </div>

            <div class="form-group">
              <label>Category</label>
                <select class="form-select" aria-label="Default select example"
                value={this.state.category}
                onChange={this.onChangeCategory}>
                { this.state.categoriesList.map( c =>
                  <option
                  >
                    {c.name}
                  </option> 
                )}
                </select>
            </div>

            <div style={{"textAlign":"center"}}>
              <button onClick={this.saveidea} style={{"marginTop":"20px"}} className="btn btn-secondary" disabled={this.state.title.length<2||this.state.description.length<1}>
                Submit
              </button>
            </div>

          </div>
        )}
      </div>
    );
  }
}
