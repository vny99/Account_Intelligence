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
import flowImage from "./images/flowStatus.jpg";
import commentService from "../services/comment.service";

function ViewIdeaByIdComponent(props) {
    const [idea, setIdea] = useState({});
    const { id } = useParams();
    const [commentButton, setCommentButton] = useState(false);
    const [comments, setComments] = useState({});
    const [comment, setComment] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail]=useState("");
    var [date, setDate] = useState(new Date());
    const [status, setStatus] = useState("RAISED");
    const [flow, toggleFlow] = useState(false);
    const [admin, setAdmin] = useState(false);
    const [userId, setUserId]=useState("");
    const [currentUserId, setCurrentUserId]=useState("");

    useEffect(() => {
        commentService.getCommentsByIdeaId(id).then((res) => {
        setComments(res.data);
        });
        setUserId(comment.userId);
    });

    useEffect(() => {
        IdeaService.getIdeaByIdeaId(id).then((res) => {
        setIdea(res.data);
        }
    );

    const user = JSON.parse(localStorage.getItem("user"));
    setUserName(user.id);
    setEmail(user.email);
    setCurrentUserId(user.id);
    console.log(user);
    if (user.roles[0] === "ROLE_ADMIN" || user.roles[1] === "ROLE_ADMIN") {
       setAdmin(true);
    }
  }, []);

  const handleSubmit = (e) => {
    setCommentButton(false);
    let ideaId = idea.id;
    commentService.post(ideaId, comment, userName);
  };
  const handleUpdate = (e) => {
    setStatus(e.target.value);

    let myIdea = idea;

    myIdea.ideaStatus = e.target.value;

    IdeaService.updateIdea(idea.ideaId, myIdea);
  };

  const handleEdit=()=>{
    window.Location("/home")
  }
  return (
    <div className="specific_idea">
      <div className="idea">
        <div className="idea_header"></div>
        <div className="idea_title">
          <h1>{idea.ideaTitle}</h1>
        </div>
        <div className="idea_description">
          <p>{idea.ideaDescription}</p>
        </div>
        <div className="status">
          <strong>Status :</strong>
          <div className="status_bar">
            <strong>
              {idea.ideaStatus === "RAISED" && (
                <div className="raised">
                  <p>RAISED</p>
                </div>
              )}
              {idea.ideaStatus === "REVIEWED" && (
                <div className="reviewed">
                  <p>REVIEWED</p>
                </div>
              )}
              {idea.ideaStatus === "REJECTED" && (
                <div className="rejected">
                  <p>REJECTED</p>
                </div>
              )}
              {idea.ideaStatus === "ACCEPTED" && (
                <div className="accepted">
                  <p>ACCEPTED</p>
                </div>
              )}
              {idea.ideaStatus === "IMPLEMENTED" && (
                <div className="implemented">
                  <p>IMPLEMENTED</p>
                </div>
              )}
            </strong>
            <div
              className="workflow"
              onClick={() => {
                toggleFlow(true);
              }}
            >
              <p>workflow</p>{" "}
            </div>
            {flow && (
              <div
                className="workflow_overlay"
                onClick={() => {
                  toggleFlow(false);
                }}
              >
                <div className="workflow_img scale-up-center">
                  <img src={flowImage} alt="" />
                </div>
              </div>
            )}
            {admin && (
              <div className="update__container">
                {idea.ideaStatus === "RAISED" && (
                  <button
                    className="update__container_buttons"
                    value="REVIEWED"
                    onClick={handleUpdate}
                  >
                    REVIEWED
                  </button>
                )}
                {idea.ideaStatus === "REVIEWED" && (
                  <div>
                    <button
                      className="update__container_buttons"
                      value="ACCEPTED"
                      onClick={handleUpdate}
                    >
                      ACCEPTED
                    </button>
                    <button
                      className="update__container_buttons"
                      value="REJECTED"
                      onClick={handleUpdate}
                    >
                      REJECTED
                    </button>
                  </div>
                )}
                {idea.ideaStatus === "ACCEPTED" && (
                  <div>
                    <button
                      className="update__container_buttons"
                      value="IMPLEMENTED"
                      onClick={handleUpdate}
                    >
                      IMPLEMENTED
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="idea_likes">
          <div className="idea_like-icon">
            <AiOutlineLike className="like_icon" />
            {idea.commentsCount}
          </div>
          <div className="badge">
            <BiMedal className="ruby_badge" />
            <BiMedal className="daimond_badge" />
            <BiMedal className="gold_badge" />
            <BiMedal className="silver_badge" />
            <BiMedal className="bronze_badge" />
          </div>
        </div>
      </div>

  <br/>
      <div className="Cards">
        <div className="comment-box">
          <p>Leave a Comment</p>
          <form className="comment-form">
            <textarea
              className="comment-form textarea"
              rows="3"
              placeholder="Write your Comment"
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button className="comment-form button" onClick={handleSubmit}>
              Post Comment
            </button>
          </form>
        </div>
      </div>

      <div className="comments_section">
        {Object.keys(comments).map((key) => {
          return (
            <div>
              <div className="commentBody">
                <div className="commentText" key={key}>
                  {comments[key].commentText}
                </div>
                <div className="commentedBy" key={key}>
                  Posted by : {comments[key].fname +" "+comments[key].lname}
                </div>
                <div className="commentedDate" key={key}>
                  {" "}
                  Posted on : {comments[key].commentedDate}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ViewIdeaByIdComponent;
