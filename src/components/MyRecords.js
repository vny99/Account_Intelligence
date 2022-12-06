import React from 'react'

import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineComment } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import AddFavourite from './add-favourite.component';

const MyRecords = ({ data, userDetails }) => {
    
  return (  
    <table style={{"textAlign" : "center"}} className = "table">
        <thead >
            <tr>
                <th style={{"width" : "50px"}}> Idea</th>
                <th style={{"width" : "180px"}}> Response</th>
                <th style={{"width" : "40px"}}> Status</th>
                <th style={{"width" : "130px"}}> Created By</th>
                <th style={{"width" : "150px"}}> Created date</th>
                <th style={{"width" : "150px"}}> Add favourite</th>
                <th style={{"width" : "40px"}}> Rewards</th>
                <th style={{"width" : "40px"}}> Edit</th>
                
            </tr>
        </thead>
        <tbody>
            <br></br>
            {
                data.filter((idea)=>idea.fname===userDetails.fname).map(
                    idea => 
                    <tr key = {idea.id} >
                        {/* <td> {idea.id}</td> */}
                            <td style={{"textAlign" : "left"}}>
                            <h5 style={{"fontSize":"25px"}}><a href="/viewIdea/{idea.id}">{idea.ideaTitle}</a></h5>
                            <p style={{"width" : "300px",  "height" : "4.3em", "overflowY":"hidden",
                            "textOverflow": "ellipsis",
                            "fontSize":"12px"
                            }}> {idea.ideaDescription}</p>
                            
                            </td>   
                            <td>
                            <span style={{"display":"inline-block"}}>
                                <AiOutlineLike size={"25px"} color={"DodgerBlue"} />
                                <div>{idea.likesCount}</div>
                            </span>
                            <span style={{"display":"inline-block", "paddingInline":"30px"}}>
                                <AiOutlineComment size={"25px"} color={"Tomato"} />
                                <div>{idea.commentsCount}</div>
                            </span>
                            </td>
                            <td> {idea.ideaStatus}</td>
                            <td> {idea.fname + " " + idea.lname}</td>
                            <td> {idea.createdDate}</td>
                            <td> <AddFavourite /></td>
                            <td> </td>
                            <td>
                            <a href='/editIdea' className='btn btn-outline-light'><BiEditAlt size={"30px"} color={"#527293"} /></a>
                        </td>    
                    </tr>
                )
            }
        </tbody>
    </table>
  ) 
}

export default MyRecords