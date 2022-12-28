import React, { Component } from "react";
import BusinessChallengesService from "../services/business-challenge.service";
import "./search-challenges.component.css";

export default class BusinessChallengesSearch extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchItem = this.onChangeSearchItem.bind(this);
    // this.retrieveTutorials = this.retrieveTutorials.bind(this);
    // this.refreshList = this.refreshList.bind(this);
    // this.setActiveTutorial = this.setActiveTutorial.bind(this);
    // this.removeAllTutorials = this.removeAllTutorials.bind(this);
    this.searchItem = this.searchItem.bind(this);
    // this.handleSearch = this.handleSearch.bind(this);

    this.state = {
      BusinessChallenges: [],
      currentchallenge: null,
      currentIndex: -1,
      searchItem: "",
      search: false,
    };
  
  }

  componentDidMount() {
    // this.retrieveTutorials();
  }


  onChangeSearchItem(e) {
    const searchItem = e.target.value;

    this.setState({
      searchItem: searchItem,
      search: true
    });
    console.log("change")
  }

  // retrieveTutorials() {
  //   BusinessChallengeDataService.getAll()
  //     .then(response => {
  //       this.setState({
  //         tutorials: response.data
  //       });
  //       console.log(response.data);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // }

  // refreshList() {
  //   this.retrieveTutorials();
  //   this.setState({
  //     currentTutorial: null,
  //     currentIndex: -1
  //   });
  // }

  setActiveTutorial(tutorial, index) {
    // this.setState({
    //   currentTutorial: tutorial,
    //   currentIndex: index,
    //   search: true
    // });
  }

  // removeAllTutorials() {
  //   BusinessChallengeDataService.deleteAll()
  //     .then(response => {
  //       console.log(response.data);
  //       this.refreshList();
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // }

  searchItem() {
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });

    BusinessChallengesService.findByTitleDescription(this.state.searchItem)
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchItem, BusinessChallenges, currentchallenge, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title and description"
              value={searchItem}
              onChange={this.onChangeSearchItem}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchItem}
                id="my_button" enabled ={this.searchItem ? "true" : "false"}
              >
                Search
              </button>
            
            </div>
          </div>
        </div>
        <div className="col-md-6">
          {/* <h4>Fresh Ideas List</h4> */}

          <ul className="list-group">
            {BusinessChallenges &&
              BusinessChallenges.map((challenge, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTutorial(challenge, index)}
                  key={index}
                >
                  <b>TITLE</b>: {challenge.title}
                  {"\n"}
                  <b>DESCRIPTION</b>: {challenge.description}
                  {'\n'}
                  <b>STATUS</b>: {challenge.status ? "Published" : "Pending"}
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
          {currentchallenge ? (
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

