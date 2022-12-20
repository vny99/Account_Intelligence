import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import IdeaService from "../services/idea.service";
import "./view-idea-by-id.component.css";
import { AiOutlineLike, AiTwotoneLike } from "react-icons/ai";
import { TbArrowBackUp } from "react-icons/tb";
import { BiEditAlt, BiMedal } from "react-icons/bi";
import flowImage from "./images/flowStatus.jpg";
import IdeaCommentsService from "../services/idea-comments.service";
import { useNavigate} from "react-router-dom";
import AddFavourite from "./add-favourite.component";
import LikesService from "../services/likes.service";
import AuthService from "../services/auth.service";

function ViewIdeaById() {
  const [idea, setIdea] = useState({});
  const { id } = useParams();
  const [commentButton, setCommentButton] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [status, setStatus] = useState("RAISED");
  const [flow, toggleFlow] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [likeId, setLikeId] = useState("");
  const [currentUserId, setCurrentUserId] = useState("");

  useEffect(() => {
    IdeaService.getIdeaByIdeaId(id).then((res) => { setIdea(res.data); });
  }, [idea]);

  useEffect(() => {
    IdeaCommentsService.getCommentsByIdeaId(id).then((res) => { setComments(res.data); })
    LikesService.getLikeOfCurrentUser(id).then((res)=>{ setLikeId(res.data); })
  }, [comments, likeId]);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    setCurrentUserId(user.id)
    if (user.role.authority.includes("ROLE_ADMIN")) { setAdmin(true); }
  }, [currentUserId])

  const handleSubmit = (e) => {
    setCommentButton(false);
    let ideaId = idea.id;
    IdeaCommentsService.postComment(ideaId, commentText);
  };

  const handleUpdate = (e) => {
    setStatus(e.target.value);
    let myIdea = idea;
    myIdea.ideaStatus = e.target.value;
    IdeaService.updateIdea(idea.id, myIdea);
  };

  const handleLike=()=>{
    if(likeId === "") {
      let data={ ideaId: idea.id }
      LikesService.like(data);
    }

    else{
      LikesService.unLike(likeId)
    } 
  }

  const navigateToEditComment = (e) => {
    let commentId = e.target.getAttribute("arg")
    console.log(commentId)
    navigate("/editComment/" + commentId );
  };

  const navigate = useNavigate();
  const handleClick = () => { navigate(-1); };

  return (
    <div className="specific_idea">
      <button className="back-button btn btn-outline-secondary" style={{"float":"right"}} onClick={handleClick}>
        <TbArrowBackUp size="30px" />
        <h6>Back</h6>
      </button>
      
      <div className="idea">
        <div className="idea_header"></div>
        <div className="idea_title"> <h1>{idea.ideaTitle}</h1> </div>
        <div className="idea_description"> <p>{idea.ideaDescription}</p> </div>

        <div className="status">
          <strong>Status :</strong>
          <div className="status_bar">
            <strong>
              {idea.ideaStatus === "RAISED" && ( <div className="raised"><p>RAISED</p> </div> )}
              {idea.ideaStatus === "REVIEWED" && ( <div className="reviewed"><p>REVIEWED</p> </div> )}
              {idea.ideaStatus === "REJECTED" && ( <div className="rejected"><p>REJECTED</p> </div> )}
              {idea.ideaStatus === "ACCEPTED" && ( <div className="accepted"><p>ACCEPTED</p> </div> )}
              {idea.ideaStatus === "IMPLEMENTED" && ( <div className="implemented"><p>IMPLEMENTED</p> </div> )}
            </strong>

            <div className="workflow" onClick={() => { toggleFlow(true); }} > <p>workflow</p> </div>

            {flow && (
              <div className="workflow_overlay" onClick={() => { toggleFlow(false); }} >
                <div className="workflow_img scale-up-center"> <img src={flowImage} alt="" /> </div>
              </div>
            )}

            {admin && (
              <div className="update__container">
                {idea.ideaStatus === "RAISED" && (
                  <button className="update__container_buttons" value="REVIEWED" onClick={handleUpdate} >REVIEWED</button>
                )}

                {idea.ideaStatus === "REVIEWED" && (
                  <div>
                    <button className="update__container_buttons" value="ACCEPTED" onClick={handleUpdate} >ACCEPTED</button>
                    <button className="update__container_buttons" value="REJECTED" onClick={handleUpdate} >REJECTED</button>
                  </div>
                )}

                {idea.ideaStatus === "ACCEPTED" && (
                  <div>
                    <button className="update__container_buttons" value="IMPLEMENTED" onClick={handleUpdate} >IMPLEMENTED</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="idea_likes">
          {likeId !== "" ?
            <div className="idea_like-icon">
              <AiTwotoneLike size={"40px"} className="like_icon" onClick={handleLike}/ >
              <div style={{"textAlign":"center"}} >{idea.likesCount}</div>
            </div> :
            <div className="idea_like-icon">
              <AiOutlineLike size={"40px"} className="like_icon-inactive" onClick={handleLike}/>
              <div style={{"textAlign":"center"}} >{idea.likesCount}</div>
            </div>
          }

          <div> <AddFavourite ideaId={idea.id} /> </div>

          <div className="badge">
            <BiMedal className="ruby_badge" />
            <BiMedal className="diamond_badge" />
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
              onChange={(e) => setCommentText(e.target.value)}
            ></textarea>
            <button className="comment-form button" onClick={handleSubmit}>
              Post Comment
            </button>
          </form>
        </div>
      </div>

      <div className="comments_section">
        {/* {console.log(comments)} */}
        {comments.map(
          comment => (
          <div>
            <div className="commentBody">
              <div className="commentText" key={comment.id}>
                {comment.commentText}

                {(currentUserId === comment.userId) ?
                  (
                    <div className="commentEdit" style={{"display":"inline-block", "float":"right"}}>
                      <button className="btn btn-outline-secondary"> <BiEditAlt onClick={navigateToEditComment} arg={comment.id} size={"20px"} /> </button>
                    </div>
                  ) : ( <div> </div> )
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
  );
}

export default ViewIdeaById;