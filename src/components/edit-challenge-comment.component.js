import { useState, useEffect } from "react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./edit-challenge-comment.component.css";
import challengeCommentsService from "../services/challenge-comments.service";

function EditChallengeComment() {
  const { commentId, commentText, challengeId } = useParams();
  console.log(challengeId)
  const navigate = useNavigate();
  const [updatedchallengecomment, setUpdatedChallengeComment] = useState("");

  const navigateToEditChallengeComment = () => {
    challengeCommentsService.updateBusinessChallengeComment(commentId, updatedchallengecomment).then((res) => {
      setUpdatedChallengeComment(res.data);
    });
    // console.log(challengeId)
    // navigate("/viewChallenge/${challengeId}");
    navigate(-3)
  };

  return (
    <div>
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
            className="Comment-form button"
            onClick={navigateToEditChallengeComment}
          >
            Post Comment
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditChallengeComment;
