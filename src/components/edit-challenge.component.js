import React from 'react';
import BusinessChallengesService from "../services/business-challenge.service"
import "./add-challenge.component.css"

export default class EditChallengeById extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      id:'',
      title: '',
      description: '',
      expiryDate: '',
      url:'',
      redirect: false
    }

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeClosingDate=this.onChangeClosingDate.bind(this);
    this.saveidea = this.saveidea.bind(this);
  }

  componentDidMount(){
    var id = this.props
    console.log("hello",id.id)

    BusinessChallengesService.getChallengeById(id.id).then((res)=>{
      this.setState({
          title: res.data.challengeTitle,
          description: res.data.challengeDescription,
          closingdate: res.data.expiryDate,
          url:"viewChallenge/"+id.id
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

    var id1=this.props
    var challenge = {
      challengeId:id1.id,
      challengeTitle: this.state.title,
      challengeDescription: this.state.description,
      expiryDate:this.state.closingdate
    };

    BusinessChallengesService.updateChallenge(challenge)
    .then((res)=>{
      console.log(res.date);
      this.setState({submitted:true})
    })

  }

  render() {
    var id=this.props

    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div style={{"textAlign":"center"}}>
            <h4>Business Challenge Edited successfully!</h4>
            <a href="/home">
              <button className="btn btn-success" style={{"width":"20%"}}>
                ok
              </button>
            </a>
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