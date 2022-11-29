import React, { Component } from 'react'
import IdeaService from '../services/idea.service'

class ViewIdeaByIdComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            idea: {}
        }
    }

    componentDidMount(){
        IdeaService.getIdeaById(this.state.id).then( res => {
            this.setState({idea: res.data});
        })
    }

    render() {
        return (
            <div>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Idea Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Idea Id: </label>
                            <div> { this.state.idea.id }</div>
                        </div>
                        <div className = "row">
                            <label> Idea Title: </label>
                            <div> { this.state.idea.ideaTitle }</div>
                        </div>
                        <div className = "row">
                            <label> Idea Description: </label>
                            <div> { this.state.idea.ideaDescription }</div>
                        </div>
                        <div className = "row">
                            <label> Idea created by: </label>
                            <div> { this.state.idea.createdBy }</div>
                        </div>
                        <div className = "row">
                            <label> Idea created date: </label>
                            <div> { this.state.idea.createdDate }</div>
                        </div>
                        <div className = "row">
                            <label> Likes: </label>
                            <div> { this.state.idea.likesCount }</div>
                        </div>
                        <div className = "row">
                            <label> Likes: </label>
                            <div> { this.state.idea.commentsCount }</div>
                        </div>
                        <div className = "row">
                            <label> Likes: </label>
                            <div> { this.state.idea.rewards }</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewIdeaByIdComponent;