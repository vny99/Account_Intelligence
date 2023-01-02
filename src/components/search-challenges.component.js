import React, { Component } from "react";
import BusinessChallengesService from "../services/business-challenge.service";
import "./search-challenges.component.css";

export default class BusinessChallengesSearch extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchItem = this.onChangeSearchItem.bind(this);
    this.searchItem = this.searchItem.bind(this);
    this.state = {open: false}

    this.state = {
      BusinessChallenges: [],
      currentchallenge: null,
      currentIndex: -1,
      searchItem: "",
      search: false,
    };
  
  }

  componentDidMount() {
    console.log("Entered BusinessChallengesSearch component")
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
      currentchallenge: null,
      currentIndex: -1
    });

    console.log(this.state.searchItem)
    BusinessChallengesService.findByTitleDescription(this.state.searchItem)
      .then(response => {
        this.setState({
          BusinessChallenges: response.data
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
       
          <div>
            <input
              type="text"
              className="form-control search-challenges-form-control"
              placeholder="Search by title and description"
              value={searchItem}
              onChange={this.onChangeSearchItem}
              onKeyDown={this.searchItem}
            /></div>

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
                 <a href={'/viewChallenge/' + challenge.id}>
                  <div className='challenge-title'><b><u>{challenge.challengeTitle}</u></b> </div>
                  <div className="description">{challenge.challengeDescription}</div>
                  <div className="status"><b>Status : </b>{challenge.challengeStatus}</div>
                </a>
              
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentchallenge ? (
            <div>
            </div>
          ) : (
            <div>
              <br />
            </div>
          )}
        </div>
      </div>
  
    );
  }
}

