import React from 'react'

import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineComment } from "react-icons/ai";
import AddFavourite from './add-favourite.component';

const AllIdeas = ({data}) => {
    return (  
        <table className = "table">
            <thead style={{"textAlign":"center", "verticalAlign":"middle"}}>
                <tr>
                    <th> ID </th>
                    <th> Idea</th>
                    <th> Response</th>
                    <th> Status</th>

                    <th> Created by</th>
                    <th> Created date</th>
                    <th> Favourite</th>
                    <th> Rewards</th>
                </tr>
            </thead>
            <tbody>
                <br></br>
                {
                    data.map(
                        idea =>
                        // <a href={'/viewIdea/' + idea.id} style={{"color":"black", "width":"max-content"}}> 
                        <tr key = {idea.id} > 
                                <td style={{"verticalAlign":"middle"}}>
                                    <b> <i> {idea.ideaId} </i> </b>
                                    </td>
                                <td style={{"textAlign" : "left"}}>
                                    <a href={'/viewIdea/' + idea.id}>
                                        {/* <h5 style={{ "fontSize":"25px"}}> */}
                                        <div className='idea-title' style={{"fontWeight":"bold"}}> {idea.ideaTitle} </div>
                                        {/* </h5> */}
                                        <p style={{"width" : "500px", "height" : "4.3em", "overflowY":"hidden", "textOverflow": "ellipsis", "fontSize":"14px"}}>
                                            {idea.ideaDescription}
                                        </p>
                                    </a>
                                </td>
                                <td style={{"display":"inline-block"}}>
                                    <span style={{"display":"inline-block", "paddingInline":"13px"}}>
                                        <AiOutlineLike size={"25px"} color={"DodgerBlue"} />
                                        <div>{idea.likesCount}</div>
                                    </span>
                                    <span style={{"display":"inline-block"}}>
                                        <AiOutlineComment size={"25px"} color={"Tomato"} />
                                        <div>{idea.commentsCount}</div>
                                    </span>
                                </td>
                                <td> {idea.ideaStatus}</td>
                                <td> {idea.fname + " " + idea.lname}</td>
                                <td> {idea.createdDate}</td>
                                <td> <AddFavourite /></td>
                                <td> </td>
                                
                        </tr>
                        // </a>
                    )
                }
            </tbody>
        </table>
    ) 
}

export default AllIdeas