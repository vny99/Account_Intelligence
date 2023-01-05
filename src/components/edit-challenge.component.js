import React from 'react';
import BusinessChallengesService from "../services/business-challenge.service"
import "./add-challenge.component.css"

export default class EditChallenge extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      id:'',
      title: '',
      description: '',
      expiryDate: '',
      status: '',
      url:'',
      redirect: false
    }

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeClosingDate=this.onChangeClosingDate.bind(this);
    this.saveChallenge = this.saveChallenge.bind(this);
  }

  componentDidMount(){
    var id = this.props.id
    BusinessChallengesService.getBusinesssChallengeById(id).then((res)=>{
      this.setState({
          title: res.data.challengeTitle,
          description: res.data.challengeDescription,
          closingdate: res.data.expiryDate,
          status: res.data.challengeStatus
        });
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

  saveChallenge() {
    var id = this.props.id
    var challenge = {
      id: id,
      challengeTitle: this.state.title,
      challengeDescription: this.state.description,
      expiryDate: this.state.closingdate,
      challengeStatus: this.state.status
    };
    BusinessChallengesService.updateChallenge(id, challenge).then(()=>{ this.setState({submitted:true}) })
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div style={{"textAlign":"center"}}>
            <h4>Business Challenge Edited successfully!</h4>
            <a href = {this.state.url}><button className="btn btn-secondary" style={{"width":"20%"}}>Ok</button></a>
          </div>
        ) : (
          <div class="name">
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
              
            
              <label htmlFor="date">Expiry Date</label>
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

            <div style={{"textAlign":"center"}}>
              <button onClick={this.saveChallenge} style={{"marginTop":"20px"}} className="btn btn-secondary">
                Submit
              </button>
            </div>

          </div>
        )}
      </div>
    );
  }
}