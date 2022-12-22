import { useState, useEffect } from "react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./edit-idea-comment.component.css";
import IdeaCommentsService from "../services/idea-comments.service"

function EditComment() {
  const { commentId, commentText }  = useParams();
  const navigate = useNavigate();
  const [updatedcomment, setUpdatedComment] = useState("");

  const navigateToEditComment = () => {
    IdeaCommentsService.updateComment(commentId, updatedcomment).then((res) => {
      setUpdatedComment(res.data);
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
            value={commentText}
            onChange={(e) => setUpdatedComment(e.target.value)}
          ></textarea>
          <br/>
          <button className="edit-Comment-form button" onClick={navigateToEditComment}>
            Post Comment
          </button>
        </form>
      </div>
    </div>
  );
}


    

export default EditComment;