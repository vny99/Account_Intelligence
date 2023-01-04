import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import AuthService from "../services/auth.service";
import { BiEditAlt } from 'react-icons/bi'
import "./view-challenge-by-id.component.css";
import ChallengeCommentsService from "../services/challenge-comments.service"
import BusinessChallengesService from '../services/business-challenge.service'
import { TbArrowBackUp } from 'react-icons/tb';
import Modal from "react-bootstrap/Modal";
import EditPage from "./edit-challenge.component.js";
import EditChallenge from './edit-challenge.component.js';

function ViewChallengeById() {
    const { challengeId } = useParams();
    const [challenge, setChallenge] = useState({});
    const [commentButton,setCommentButton]=useState()
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState({});
    const [show, setShow] = useState(false);
    const [editId, setEditId] = useState("");
    const [currentUserId, setCurrentUserId]=useState("");
    
    useEffect(() => {
        BusinessChallengesService.getBusinesssChallengeById(challengeId).then((res) => { setChallenge(res.data) });
    }, []);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        setCurrentUserId(user.id)
    })

    useEffect(()=>{
        ChallengeCommentsService.getChallengeCommentsByChallengeId(challengeId). then((res) => { setComments(res.data); });
    } , []);
    
    const handleSubmit = (e) => {
        setCommentButton(false);
        ChallengeCommentsService.postComment(challengeId, commentText).then((res)=>{
            console.log(res.data);
        })
    };

    const handleClose = () => {
        setShow(false);
        setEditId("");
    };

    const handleShow = (data) => {
        setShow(true);
        setEditId(data);
    };

    const navigateToEditComment = (commentId, commentText, challengeId ) => {
        navigate("/editChallengeComment/" + commentId + "/" + commentText + "/" + challengeId);
    };

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(-1);
    };
    
    return (
        <div>
            <div className="specific_idea">
            <button className="back-button btn btn-secondary" style={{"float":"right"}} onClick={handleClick}>
                <TbArrowBackUp size="30px" />
                <h6>Back</h6>
            </button>
                <div className="idea">
                    {currentUserId === challenge.userId && (
                        <div style={{"margin-left":"90%","padding-top":"5px"}}>
                            <BiEditAlt className="edit_challenge_button" size={"45px"} onClick={() => { handleShow(challenge.id); }}/>
                            <Modal show={show} onHide={handleClose} className="name">
                                <Modal.Header closeButton>
                                <Modal.Title>
                                    <h1>Edit Business Challenge</h1>
                                </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                <EditChallenge id={editId} />
                                </Modal.Body>
                            </Modal>
                        </div>
                    )}
                    <div className="idea_header"></div>
                    <div className="idea_title"><h1>{challenge.challengeTitle}</h1></div>
                    <div className="idea_description"><p>{challenge.challengeDescription}</p></div>
                    <div className="postedby">
                        <div><strong>Posted By: </strong>{challenge.fname + " " + challenge.lname}</div>
                        <div className="expiryDate">
                            <p>
                                <strong>Expiry Date: </strong>
                                {
                                    new Date(challenge.expiryDate).toDateString().slice(8, 11) +
                                    // month eg: Dec
                                    new Date(challenge.expiryDate).toDateString().slice(4, 8) + 
                                    // year eg: 2022
                                    new Date(challenge.expiryDate).toDateString().slice(11)
                                }
                            </p>
                        </div>
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
            
                        <button className="comment-form button" disabled={commentText.length < 1} onClick={handleSubmit}>
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
                                        {(currentUserId === comment.userId) ? 
                                            (
                                                <div className="CommentEdit" style={{ display: "inline-block", "float":"right" }}>
                                                    <button className="btn btn-secondary">
                                                        <BiEditAlt
                                                            onClick={() => navigateToEditComment(comment.id, comment.commentText, challenge.id)}
                                                        size={"20px"}
                                                        />
                                                    </button>
                                                </div>
                                            ) :( <div> </div> )
                                        }
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