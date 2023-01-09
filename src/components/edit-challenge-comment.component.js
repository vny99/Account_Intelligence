import { useState } from "react";
import React from "react";
import "./edit-challenge-comment.component.css";
import challengeCommentsService from "../services/challenge-comments.service";

function EditChallengeComment({ commentId, commentText }) {
  const [updatedchallengecomment, setUpdatedChallengeComment] = useState("");
  const [submitted, setSubmitted]=useState(false);
  const [url, setUrl] = useState("");

  const navigateToEditChallengeComment = () => {
    challengeCommentsService.updateBusinessChallengeComment(commentId, updatedchallengecomment).then((res) => {
      setUpdatedChallengeComment(res.data);
    });
    setSubmitted(true);
  };

  return (
    <div>
      <div className="comment-edit-successful">
        {submitted?(
        <div style={{"textAlign":"center"}}>
            <h4>Business Challenge Edited successfully!</h4>
            <a href = {url}><button className="btn btn-secondary" style={{"width":"20%"}}>Ok</button></a>
        </div>
        ):(
        <div className="form-group">
          <label for="description">Leave a Comment</label>
          <textarea
            className="form-control"
            id="description"
            rows="7"
            placeholder="Write your Comment"
            onChange={(e) => setUpdatedChallengeComment(e.target.value)}
          >{commentText}</textarea>
          <br/>
          <div style={{"textAlign":"center"}}>
            <button
              className="btn btn-secondary" disabled={updatedchallengecomment.length<1}
              onClick={navigateToEditChallengeComment}
            >
              Post Comment
            </button>
          </div>
      </div>
      )}</div>
    </div>
    
  );
}

export default EditChallengeComment;
