import { useState } from "react";
import React from "react";
import "./edit-idea-comment.component.css";
import IdeaCommentsService from "../services/idea-comments.service"

function EditIdeaComment({ commentId, commentText }) {
  const [updatedcomment, setUpdatedComment] = useState("");
  const [com, setCom] = useState(commentText);
  const [submitted, setSubmitted] = useState(false);
  const [url, setUrl] = useState("");

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
            <a href = {url}><button className="btn btn-secondary" style={{"width":"20%"}}>Ok</button></a>
        </div>):(
        <div className="form-group">
          <label for="description">Leave a Comment</label>
            <textarea
              className="form-control"
              id="description"
              rows="7"
              placeholder="Write your Comment"
              onChange={(e) => setUpdatedComment(e.target.value)}
            >{com}</textarea>
            <br/>
            <div style={{"textAlign":"center"}}>
              <button className="btn btn-secondary" disabled={updatedcomment.length < 1} onClick={navigateToEditComment}>
                Post Comment
              </button>
            </div>
        </div>)}
      </div>
    </div>
  );
}  

export default EditIdeaComment;