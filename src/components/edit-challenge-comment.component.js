import { useState } from "react";
import React from "react";
import "./edit-challenge-comment.component.css";
import challengeCommentsService from "../services/challenge-comments.service";

function EditChallengeComment({ commentId, commentText, challengeId }) {
  const [updatedchallengecomment, setUpdatedChallengeComment] = useState("");
  const [submitted, setSubmitted]=useState(false);

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
        </div>
        ):(
        <div className="Comment-Box">
        <p>Leave a Comment</p>
        <form className="Comment-Form">
          <textarea
            className="Comment-Form Textarea"
            rows="3"
            placeholder="Write your Comment"
            onChange={(e) => setUpdatedChallengeComment(e.target.value)}
          >{commentText}</textarea>
          <br/>
          <button
            className="Comment-form button" disabled={updatedchallengecomment.length<1}
            onClick={navigateToEditChallengeComment}
          >
            Post Comment
          </button>
        </form>
      </div>
      )}</div>
    </div>
    
  );
}

export default EditChallengeComment;
