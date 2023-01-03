import { useState } from "react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./edit-idea-comment.component.css";
import IdeaCommentsService from "../services/idea-comments.service"

function EditIdeaComment() {
  const { commentId, commentText }  = useParams();
  const navigate = useNavigate();
  const [updatedcomment, setUpdatedComment] = useState("");
  const [com, setCom] = useState(commentText);

  const navigateToEditComment = () => {
    IdeaCommentsService.updateComment(commentId, updatedcomment).then((res) => {
      console.log(commentId, updatedcomment)
      setUpdatedComment(res.data);
      setCom(res.data)
    });
    navigate(-1);
  }
  
  return(
    <div>
      <div className="Comment-Box">
        <p>Leave a Comment</p>
        <form className="Comment-Form">
          <textarea
            className="Comment-Form Textarea"
            rows="3"
            placeholder="Write your Comment"
            onChange={(e) => setUpdatedComment(e.target.value)}
          >{com}</textarea>
          <br/>
          <button className="edit-Comment-form button" onClick={navigateToEditComment}>
            Post Comment
          </button>
        </form>
      </div>
    </div>
  );
}  

export default EditIdeaComment;