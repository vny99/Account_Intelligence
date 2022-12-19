import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./edit-comment.component.css";

function EditComment() {
    const navigate=useNavigate();
    const [commentText, setCommentText]=useState("");

    const navigateToEditComment=()=>{
         navigate('/viewIdea/:id');
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
              onChange={(e) => setCommentText(e.target.value)}
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