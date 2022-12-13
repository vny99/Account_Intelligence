import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import IdeaService from "../services/idea.service";
import Comments from "./Comments";
import "./view-idea-by-id.component.css";
import { AiOutlineLike, AiOutlineClose } from "react-icons/ai";
import { BiMedal } from "react-icons/bi";
import Axios from "axios";
import commentService from "../services/comment.service";

function ViewIdeaByIdComponent(props) {
    const [idea, setIdea] = useState({});
    const { id } = useParams();
    const [commentButton, setCommentButton] = useState(false);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState({});
    const [userName, setUserName] = useState("");
    var [date, setDate] = useState(new Date());

    var timer = setInterval(() => setDate(new Date()), 1000);

    useEffect(() => {

        commentService.getCommentsByIdeaId(id).then((res) => {
            setComments(res.data);
        });

        IdeaService.getIdeaByIdeaId(id).then((res) => {
            setIdea(res.data);
        });

    });

    const handleSubmit = (e) => {
        setCommentButton(false);
        let ideaId = idea.id;
        console.log("Posting comment")
        commentService.postComment(ideaId, comment);
    };

    return (
        <div className="specific_idea">
            <div className="idea">
                <div className="idea_header"> </div>

                <div className="idea_title">
                    <h1>{idea.ideaTitle}</h1>
                </div>

                <div className="idea_description">
                    <p>{idea.ideaDescription}</p>
                </div>
                
                <div className="idea_status"></div>

                <div className="idea_likes">
                    <div className="idea_like-icon">
                        <AiOutlineLike className="like_icon" />{idea.commentsCount}
                    </div>

                    <div className="badge">
                        <BiMedal className="ruby_badge"/>
                        <BiMedal className="daimond_badge"/>
                        <BiMedal className="gold_badge"/>
                        <BiMedal className="silver_badge"/>
                        <BiMedal className="bronze_badge"/>
                    </div>
                </div>
            </div>

            <div className="comment-box">
                <p>Leave a Comment</p>
                <form className="comment-form">
                    <textarea
                        className="comment-form textarea"
                        rows="10"
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
                    return(<div>
                    <div className="commentBody">
                    <div className="commentText" key={key}>{comments[key].commentText}</div>
                    <div className="commentedBy" key={key}>Posted by : {comments[key].commentedBy}</div>
                    <div className="commentedDate"> Posted on : {date.toLocaleDateString()}</div>
                    </div>
                    </div>)
                })}
            </div>
    </div>
    );
}

export default ViewIdeaByIdComponent;
