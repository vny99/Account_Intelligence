import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';

import "./view-challenge-by-id.component.css";
import ChallengeCommentsService from "../services/challenge-comments.service"
import BusinessChallengesService from '../services/business-challenge.service'
import { TbArrowBackUp } from 'react-icons/tb';

function ViewChallengeById() {
    const { id } = useParams();
    const [userName, setUserName] = useState("");
    const [challenge, setChallenge] = useState({});
    const [commentButton,setCommentButton]=useState()
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState({});
    
    useEffect(()=>{
        ChallengeCommentsService.getChallengeCommentsByChallengeId(id). then((res) => {
            setComments(res.data);
        });
    }
    , [comments]
    );
      
    useEffect(() => {
        BusinessChallengesService.getBusinesssChallengeById(id).then((res) => { setChallenge(res.data) });
    }, []);
    
    const handleSubmit = (e) => {
        setCommentButton(false);
        ChallengeCommentsService.postComment(id, commentText).then((res)=>{
            console.log(res.data);
        })
    };

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(-1);
    };
    
    return (
        <div>
            <div className="specific_idea">
            <button className="back-button btn btn-outline-secondary" style={{"float":"right"}} onClick={handleClick}>
                <TbArrowBackUp size="30px" />
                <h6>Back</h6>
            </button>
                <div className="idea">
                    <div className="idea_header"></div>
                    <div className="idea_title"><h1>{challenge.challengeTitle}</h1></div>
                    <div className="idea_description"><p>{challenge.challengeDescription}</p></div>
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
        
                <div className="challenge-comment-box">
                    <p>Leave a Comment</p>
                    <form className="comment-form">
                        <textarea
                        className="comment-form textarea"
                        rows="3"
                        placeholder="Write your Comment"
                        onChange={(e) => setCommentText(e.target.value)}
                        >
                        </textarea>
            
                        <button className="comment-form button" onClick={handleSubmit}>
                            Post Comment
                        </button>
                    </form>
                </div>
        
                <div className="comments_section">
        {comments.map(
          comment => (
            <div>
              <div className="commentBody">
                <div className="commentText" key={comment.id}>
                  {comment.commentText}
                </div>

                <div className="commentedBy" key={comment.id}> Posted by : {comment.fname + " " + comment.lname} </div>
                <div className="commentedDate" key={comment.id}> Posted on : {comment.commentedDate} </div>

              </div>
            </div>
          )
        )}
      </div>
            </div>
        </div> 
    );
}

export default ViewChallengeById;