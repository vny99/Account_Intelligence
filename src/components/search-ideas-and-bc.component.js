import React, { Component } from "react";
import IdeaService from "../services/idea.service";
import BusinessChallengesService from "../services/business-challenge.service";
import "./search-ideas.component.css";
import Highlighter from "react-highlight-words";

export default class Dd extends Component {
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

  componentDidMount() {
    console.log("Entered Ideasearch component")
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
          ideas: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
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
    const { searchItem, ideas,BusinessChallenges, currentIndex } = this.state;

    return (
      <div className="list row">
        <div>
          <input
            type="text"
            className="form-control search-ideas-form-control"
            placeholder="Search by title and description"
            value={searchItem}
            onChange={this.onChangeSearchItem}
            onKeyDown={this.searchItem}
          />
        </div>

        <ul className="list-group">
          {ideas &&
            ideas.map((idea, index) => (
              <li
                className={
                  "list-group-item " +
                  (index === currentIndex ? "active" : "")
                }
                onClick={() => this.setActiveTutorial(idea, index)}
                key={index}
              >
                <a href={'/viewIdea/' + idea.id}>
                  <div className='idea-title'><b><u>
                    <Highlighter
                      highlightClassName="YourHighlightClass"
                      // searchWords={["auction", "or", "the"]}
                      searchWords={[searchItem]}
                      autoEscape={true}
                      textToHighlight={idea.ideaTitle}
                    />
                  </u></b> </div>
                  <div className="description">
                    <Highlighter
                      highlightClassName="YourHighlightClass"
                      // searchWords={["auction", "or", "the"]}
                      searchWords={[searchItem]}
                      autoEscape={true}
                      textToHighlight={idea.ideaDescription}
                    />
                  </div>
                  <div className="status"><b>Status : </b>{idea.ideaStatus}</div>
                </a>
              </li>
              
            ))}
             
        </ul>
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
                 <a href={'/viewChallenge/' + challenge.id} style = {{"text-decoration":"none"}}>
                  <div className='challenge-title'><b><u>
                    <Highlighter
                      highlightClassName="YourHighlightClass"
                      // searchWords={["auction", "or", "the"]}
                      searchWords={[searchItem]}
                      autoEscape={true}
                      textToHighlight={challenge.challengeTitle}
                    />
                  </u></b> </div>
                  <div className="description">
                    <Highlighter
                      highlightClassName="YourHighlightClass"
                      // searchWords={["auction", "or", "the"]}
                      searchWords={[searchItem]}
                      autoEscape={true}
                      textToHighlight={challenge.challengeDescription}
                    />
                  </div>
                  <div className="status"><b>Status : </b>{challenge.challengeStatus}</div>
                </a>

                </li>))}</ul>
      </div>
    );
  }
}