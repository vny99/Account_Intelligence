import React from 'react';
import Axios from "axios";
import {useEffect, useState} from "react";

function Comments(){
  const [data,setDate]=useState([])
  const [commentsId, setCommentId]=useState('')
  const [commentsDescription, setCommentDescription]=useState('')
  const [ideaId, setIdeaId]=useState('')

  useEffect(
    ()=>{
      Axios.get(`http://localhost:8080/showcommentbyideaid/82`)
      .then(res=>{
        console.log("Getting from :::",res.data)
        setDate(res.data)
      }).catch(err=>console.log(err))
      },
    []
  )

  const postData=(e)=>{
    e.preventDefault();
    Axios.post(`http://localhost:8080/add`,{
        // commentsId,
        commentsDescription,
        ideaId,
    }).then(res=>console.log('posting data', res)).catch(err=>console.log(err))
    }

  const arr=data.map((data,index)=>{
      return(
        <div className='cont'>
        <p>Comment : {data.commentsDescription}</p>
        </div>
      )
    }
  )
  
  return(
    <div className="App">
      <h3> Comment</h3>
      <form>
        <lable>Comments</lable>
        <input type="text" value={commentsDescription} onChange={(e)=>setCommentDescription(e.target.value)}/>
        <br/>
        <lable>IdeaId</lable>
        <input type="text" value={ideaId} onChange={(e)=>setIdeaId(e.target.value)}/>
        <hr/>
        <button onClick={postData}>POST</button>         
      </form>
      {arr}

    </div>
      

  )
   
}
  
export default Comments;