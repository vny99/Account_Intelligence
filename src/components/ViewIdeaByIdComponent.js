import React, { Component } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import IdeaService from '../services/idea.service'

function ViewIdeaByIdComponent(props) {
    const [idea, setIdea] = useState({});
    const { id } = useParams();
    
    IdeaService.getIdeaById(id).then((res) => {
      setIdea(res.data);
    });
    
    return (
        <div>
            <div className = "card col-md-6 offset-md-3">
                <h3 className = "text-center"> View Idea Details</h3>
                <div className = "card-body">
                    <div className = "row">
                        <label> Idea Id: </label>
                        <div> { idea.ideaId }</div>
                    </div>
                    <div className = "row">
                        <label> Idea Title: </label>
                        <div> { idea.ideaTitle }</div>
                    </div>
                    <div className = "row">
                        <label> Idea Description: </label>
                        <div> { idea.ideaDescription }</div>
                    </div>
                    <div className = "row">
                        <label> Idea created by: </label>
                        <div> { idea.fname + " " + idea.lname }</div>
                    </div>
                    <div className = "row">
                        <label> Idea created date: </label>
                        <div> { idea.createdDate }</div>
                    </div>
                    <div className = "row">
                        <label> Likes: </label>
                        <div> { idea.likesCount }</div>
                    </div>
                    <div className = "row">
                        <label> Comments: </label>
                        <div> { idea.commentsCount }</div>
                    </div>
                    <div className = "row">
                        <label> Rewards: </label>
                        <div> { idea.rewards }</div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ViewIdeaByIdComponent;