import { useState } from "react";
import React from "react";
import "./edit-idea-comment.component.css";
import IdeaCommentsService from "../services/idea-comments.service"

function EditIdeaComment({ commentId, commentText }) {
  const [updatedcomment, setUpdatedComment] = useState("");
  const [com, setCom] = useState(commentText);
  const [submitted, setSubmitted]=useState(false);

  const navigateToEditComment = () => {
    IdeaCommentsService.updateComment(commentId, updatedcomment).then((res) => {
      setUpdatedComment(res.data);
      setCom(res.data)
    });
    setSubmitted(true);
  }
  
  return(
    <div>
      <div className="comment-edit-successful">
        {submitted?(
        <div style={{"textAlign":"center"}}>
            <h4>Idea Comment Edited successfully!</h4>
        </div>):(

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
          <button className="edit-Comment-form button"  disabled={updatedcomment.length < 1} onClick={navigateToEditComment}>
            Post Comment
          </button>
        </form>
      </div>)}
      </div>
    </div>
  );
}  

export default EditIdeaComment;