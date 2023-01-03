import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import IdeaService from "../services/idea.service";
import "./view-idea-by-id.component.css";
import { AiFillHeart, AiOutlineHeart, AiOutlineLike, AiTwotoneLike } from "react-icons/ai";
import { TbArrowBackUp } from "react-icons/tb";
import { BiEditAlt, BiMedal } from "react-icons/bi";
import flowImage from "./images/flowStatus.jpg";
import IdeaCommentsService from "../services/idea-comments.service";
import { useNavigate} from "react-router-dom";
import AddFavourite from "./add-favourite.component";
import LikesService from "../services/likes.service";
import AuthService from "../services/auth.service";
import Modal from "react-bootstrap/Modal";
import EditIdea from "./edit-idea.component";
import UserService from "../services/user.service";

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
  const [rewards,setRewards]=useState(0);
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState("");
  const [localLiked, setLocalLiked] = useState(false);

  useEffect(() => {
    IdeaService.getIdeaByIdeaId(id).then((res) => { setIdea(res.data); });
  }, [idea]);

  useEffect(() => {
    IdeaCommentsService.getCommentsByIdeaId(id).then((res) => { setComments(res.data); })
    LikesService.getLikeOfCurrentUser(id).then((res)=>{ setLikeId(res.data); })
    IdeaService.isFavoriteIdeaOfCurrentUser(id).then((res) => { setLocalLiked(res.data); })
  }, [comments, likeId, localLiked]);

  useEffect(() => {
    setRewards(idea.rewards)
    const user = AuthService.getCurrentUser();
    setCurrentUserId(user.id)
    if (user.role.authority.includes("ROLE_FIADMIN")) { setAdmin(true); }
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

  const handleShow = (data) => {
    setShow(true);
    setEditId(data);
  };

  const handleClose = () => {
    setShow(false);
    setEditId("");
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

  const handleFavorite=()=>{
    if(!localLiked) { UserService.addFavorite(id) }
    else{ UserService.removeFavorite(id) } 
  }

  const handleRewards=(e)=>{
    if(e.target.value==="100"){ setRewards(100); }
    else if(e.target.value==="50"){ setRewards(50); }
    else if(e.target.value==="30"){ setRewards(30); }
    else if(e.target.value==="20"){ setRewards(20); }
    else if(e.target.value==="10"){ setRewards(10); }
    else{ setRewards(0); }
  }

  const handleSave=()=>{
    let myIdea = idea;
    myIdea.rewards=rewards;
    IdeaService.updateIdea(idea.id, myIdea);
    console.log(myIdea)
  }

  const navigateToEditComment = (commentId, commentText) => {
    navigate("/editIdeaComment/" + commentId + "/" + commentText );
  };

  const navigate = useNavigate();
  const handleClick = () => { navigate(-1); };

  return (
    <div className="specific_idea">
      <button className="back-button btn btn-secondary" style={{"float":"right"}} onClick={handleClick}>
        <TbArrowBackUp size="30px" />
        <h6>Back</h6>
      </button>
      
      <div className="idea">
        <div className="idea_header">
          <div className="idea_title">
            <h1>
              {idea.ideaTitle}
              
              {currentUserId === idea.userId && (
                  <BiEditAlt className="edit_idea_button" size={"45px"} onClick={() => { handleShow(idea.id) }} />
              )}
            </h1>
            </div>
          <Modal show={show} onHide={handleClose} className="name">
            <Modal.Header closeButton>
              <Modal.Title>
                <h1>Edit Fresh Idea</h1>
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
            <EditIdea id={editId}/>
            </Modal.Body>
          </Modal>
        </div>

        <div className="idea_description"> <p>{idea.ideaDescription}</p> </div>
        <div className="Postedby"><strong>Posted By: </strong>{idea.fname + " " + idea.lname}</div>

        <div className="idea_status_rewards">
          <div className="status">
            <strong>Status:</strong>
            <div className="status_bar">
              {idea.ideaStatus === "RAISED" && ( <div className="raised"><p>Raised</p> </div> )}
              {idea.ideaStatus === "REVIEWED" && ( <div className="reviewed"><p>Reviewed</p> </div> )}
              {idea.ideaStatus === "REJECTED" && ( <div className="rejected"><p>Rejected</p> </div> )}
              {idea.ideaStatus === "ACCEPTED" && ( <div className="accepted"><p>Accepted</p> </div> )}
              {idea.ideaStatus === "IMPLEMENTED" && ( <div className="implemented"><p>Implemented</p> </div> )}

              <div className="workflow" onClick={() => { toggleFlow(true); }} > <p>workflow</p> </div>

              {flow && (
                <div className="workflow_overlay" onClick={() => { toggleFlow(false); }} >
                  <div className="workflow_img scale-up-center"> <img src={flowImage} alt="" /> </div>
                </div>
              )}
            </div>
          </div>

          {admin &&
            <div className="idea_rewards">
              <div className="idea-rewards">
                <p>Rewards:</p>
                <select className="rewards_drop" onChange={handleRewards} name="rewards" >
                  <option value="0" hidden><p>select rewards</p></option>
                  <option value="100">100 points</option>
                  <option value="50">50 points</option>
                  <option value="30">30 points</option>
                  <option value="20">20 points</option>
                  <option value="10">10 points</option>
                </select>

                <button onClick={handleSave} className="rewards_button">
                  Submit
                </button>
              </div>
            </div>
          }

        </div>
        
        {admin && (
          <div className="change_status">
            <strong><p>Want to change status of Idea</p></strong>
            <div className="update__container">
              {idea.ideaStatus === "RAISED" && (
                <button className="update__container_buttons" value="REVIEWED" onClick={handleUpdate} >Reviewed</button>
              )}

              {idea.ideaStatus === "REVIEWED" && (
                <div>
                  <button className="update__container_buttons" value="ACCEPTED" onClick={handleUpdate} >Accepted</button>
                  <button className="update__container_buttons_r" value="REJECTED" onClick={handleUpdate} >Rejected</button>
                </div>
              )}

              {idea.ideaStatus === "ACCEPTED" && (
                <div>
                  <button className="update__container_buttons" value="IMPLEMENTED" onClick={handleUpdate} >Implemented</button>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="idea_likes">
          {likeId !== "" ?
            <div className="idea_like-icon">
              <AiTwotoneLike size={"40px"} className="like_icon" onClick={handleLike}/ >
              <div style={{"textAlign":"center"}} >{idea.likesCount}</div>
            </div> :
            <div className="idea_like-icon">
              <AiOutlineLike size={"40px"} className="like_icon_inactive" onClick={handleLike}/>
              <div style={{"textAlign":"center"}} >{idea.likesCount}</div>
            </div>
          }

          <div>
            {localLiked ?
              <AiFillHeart size={"40px"} color="red" onClick={handleFavorite} />
              :
              <AiOutlineHeart size={"40px"} color="red" onClick={handleFavorite} />
            }
          </div>

          <div className="badge">
            {idea.rewards===100&& <div className="badge_points"><BiMedal className="ruby_badge" /><p>{idea.rewards}</p></div>}
            {idea.rewards===50&& <div className="badge_points"><BiMedal className="diamond_badge" /><p>{idea.rewards}</p></div>}
            {idea.rewards===30&& <div className="badge_points"><BiMedal className="gold_badge" /><p>{idea.rewards}</p></div>}
            {idea.rewards===20&& <div className="badge_points"><BiMedal className="silver_badge" /><p>{idea.rewards}</p></div>}
            {idea.rewards===10&& <div className="badge_points"><BiMedal className="bronze_badge" /><p>{idea.rewards}</p></div>}
          </div>
          
          {/* <div className="Postedby"> Posted By: {idea.fname + " " + idea.lname}</div> */}

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
            <button className="post-comment-form button" disabled={commentText.length < 1} onClick={handleSubmit}>Post Comment</button>
          </form>
        </div>
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
                      <div className="commentEdit" style={{"display":"inline-block", "float":"right"}}>
                        <button className="btn btn-secondary"> <BiEditAlt onClick={event => {navigateToEditComment(comment.id, comment.commentText)}} size={"20px"} /> </button>
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