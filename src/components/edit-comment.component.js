import { useState } from "react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./edit-comment.component.css";
import { useEffect } from "react";

import IdeaCommentsService from "../services/idea-comments.service"

function EditComment(props) {
  const {id}  = useParams();
  console.log(id)
  const navigate=useNavigate();
  const [updatedcomment, setUpdatedComment] = useState("");
  const [currentUserId, setCurrentUserId]=useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setCurrentUserId(user.id); // here id is userid
  }, []);

  const navigateToEditComment=()=>{
    IdeaCommentsService.updateComment(id, updatedcomment).then((res) => {
      setUpdatedComment(res.data);
    });
    navigate("/ideas")
    // navigate("/viewIdea/" + ideaId);
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
          ></textarea>
          <br/>
          <button className="Comment-form button" onClick={navigateToEditComment}>
            Post Comment
          </button>
        </form>
      </div>
    </div>
  );
}


    

export default EditComment;