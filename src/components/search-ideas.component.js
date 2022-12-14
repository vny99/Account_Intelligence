import React, { Component } from "react";
import IdeaService from "../services/idea.service";
import Dropdown from "./dropdown.component";
import "./search-ideas.component.css";

export default class Ideasearch extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchItem = this.onChangeSearchItem.bind(this);
    this.searchItem = this.searchItem.bind(this);
    this.state = { open: false };

    this.state = {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      searchItem: "",
      search: false,
    };
  
  }
  
  onChangeSearchItem(e) {
    const searchItem = e.target.value;
    this.setState({
      searchItem: searchItem,
      search: true
    });
  }

  searchItem() {
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });

    IdeaService.findByTitleDescription(this.state.searchItem)
      .then(response => {
        this.setState({
          tutorials: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
      
  }
  
  render() {
    const { searchItem, tutorials, currentTutorial, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">

          <div className = "searchbar">
            <input
              type="text"
              className="form-control search-ideas-form-control"
              placeholder="Search by title and description"
              value={searchItem}
              onChange={this.onChangeSearchItem}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchItem}
               
              >
               Search
              </button>
            
            
</div>
            </div>
            
          </div>
        </div>
        <div className="col-md-6">

          <ul className="list-group">
            {tutorials &&
              tutorials.map((tutorial, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTutorial(tutorial, index)}
                  key={index}
                >
                 <a href={'/viewIdea/' + tutorial.id} style={{ "padding-bottom": "10px"}} >
                    <div className='idea-title' ><b>{tutorial.ideaTitle}</b> </div>
                  </a>
                  
                  {"\n"}
                  <div className="description">{tutorial.ideaDescription}</div>
                  {'\n'}
                  
                 <div className="status"><b>STATUS  :</b>{tutorial.status ? "Published" : "Pending"}</div>
                  {/* {'\n'}
                  <b>COMMENTS</b>: {tutorial.comments} */}
                 
                </li>
              ))}
          </ul>

          {/* <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllTutorials}
          >
            Remove All
          </button> */}
        </div>
        <div className="col-md-6">
          {currentTutorial ? (
            <div>
              {/* <h4>Fresh ideas</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentTutorial.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentTutorial.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentTutorial.published ? "Published" : "Pending"}
              </div> */}

              {/* <Link
                to={"/tutorials/" + currentTutorial.id}
                className="badge badge-warning"
              >
                Edit
              {/* </Link> } */}
            </div>
          ) : (
            <div>
              <br />
              {/* <p>Please click on a Freshidea to comment</p> */}
            </div>
          )}
        </div>
      </div>
  
    );
  }
}