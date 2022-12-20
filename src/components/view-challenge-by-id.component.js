import React, { Component } from 'react'
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';

import "./view-challenge-by-id.component.css";
import ChallengeCommentsService from "../services/challenge-comments.service"
import BusinessChallengesService from '../services/business-challenge.service'
import { TbArrowBackUp } from 'react-icons/tb';

function ViewChallengeById(props) {
    const { id } = useParams();
    const [userName, setUserName] = useState("");
    const [challenge, setChallenge] = useState({});
    const [commentButton,setCommentButton]=useState()
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState({});
    
    useEffect(()=>{
        ChallengeCommentsService.getBusinessCommentsByIdeaId(id). then((res) => {
            setComments(res.data);
        });
    },[]);
      
    useEffect(() => {
        BusinessChallengesService.getChallengeById(id).then((res) => {
            setChallenge(res.data)
        });
        const user = JSON.parse(localStorage.getItem("user"));
    }, []);
    
    const handleSubmit = (e) => {
        setCommentButton(false);
        let challengeId = challenge.id;
        console.log(challengeId)
        var comm = { commentText : comment }
        ChallengeCommentsService.postBusinessComment(challengeId, comm, userName).then((res)=>{
            console.log(res.date);
        })
    };

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(-1);
    };
    
    console.log(challenge)
    
    return (
        <div>
            <div className="specific_idea">
            <button className="back-button btn btn-outline-secondary" style={{"float":"right"}} onClick={handleClick}>
                <TbArrowBackUp size="30px" />
                <h6>Back</h6>
            </button>
                <div className="idea">
                    <div className="idea_header"></div>
            
                    <div className="idea_title">
                        <h1>{challenge.challengeTitle}</h1>
                    </div>
            
                    <div className="idea_description">
                        <p>{challenge.challengeDescription}</p>
                    </div>
                    
                    <div className="closingDate">
                        <p>
                        Expiry Date:
                        {
                            new Date(challenge.createdDate).toDateString().slice(8, 11) +
                            // month eg: Dec
                            new Date(challenge.createdDate).toDateString().slice(4, 8) + 
                            // year eg: 2022
                            new Date(challenge.createdDate).toDateString().slice(11)
                        }
                        </p>
                    </div>
                </div>
        
                <div className="comment-box">
                    <p>Leave a Comment</p>
                    <form className="comment-form">
                        <textarea
                        className="comment-form textarea"
                        rows="3"
                        placeholder="Write your Comment"
                        onChange={(e) => setComment(e.target.value)}
                        >
                        </textarea>
            
                        <button className="comment-form button" onClick={handleSubmit}>
                            Post Comment
                        </button>
                    </form>
                </div>
        
                <div className="comments_section">
                    {Object.keys(comments).map((key)=>{
                        return(
                        <div>
                            <div className="commentBody">
                                <div className="commentText" key={key}>{comments[key].commentText}</div>
                                <div className="commentedBy" key={key}>Posted by : {comments[key].commentedBy}</div>
                            </div> 
                        </div>
                        )
                    })}
                </div>
            </div>
        </div> 
    );
}

export default ViewChallengeById;