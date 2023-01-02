import React from 'react';

import IdeaService from '../services/idea.service';
import "./add-idea.component.css"

export default class EditIdea extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      id: '',
      title: '',
      description: '',
      expiryDate: '',
      url: '',
      redirect: false
    }

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeClosingDate=this.onChangeClosingDate.bind(this);
    this.saveidea = this.saveidea.bind(this);  
  }
  
  componentDidMount(){
    var id = this.props.id
    IdeaService.getIdeaByIdeaId(id).then((res)=>{
      console.log(res.data)
      this.setState({
        title: res.data.ideaTitle,
        description: res.data.ideaDescription,
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

  saveidea() {
   var id1=this.props
    var idea = {
      ideaId:id1.id,
      ideaTitle: this.state.title,
      ideaDescription: this.state.description,
    };
    console.log(idea)
    IdeaService.updateIdea(idea)
    .then((res)=>{
      console.log(res.date);
      this.setState({submitted:true})
    })
  }

  render() 
  {
      return (
        <div className=''>
        <div className="
        ">
          {this.state.submitted ? (
            <div style={{"textAlign":"center"}}>
              <h4> Edit Fresh Idea Successfully!</h4>
              <a href={this.state.url}>  <button className="btn btn-success" style={{"width":"20%"}}>
              ok
              </button></a>
            </div>
          ) : (
            
            <div class="">
              {/* <h1>Edit Business Challenge</h1> */}
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
        </div>
      );
    }
}