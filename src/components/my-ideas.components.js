import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

import { AiFillHeart, AiOutlineHeart, AiOutlineLike } from "react-icons/ai";
import { AiOutlineComment } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import IdeaService from '../services/idea.service';

const MyIdeas = ({ data, userDetails }) => {
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
                    {/* <th> Favourite</th> */}
                    <th> Rewards</th>
                    {/* <th> Edit</th> */}
                    
                </tr>
            </thead>
            <tbody>
                <br />
                {
                    data.map(
                        idea => 
                        <tr key = {idea.id} >
                            <td style={{"verticalAlign":"middle"}}>
                                {/* <b> <i> */}
                                    {idea.ideaId}
                                {/* </i> </b> */}
                            </td>
                            <td style={{"textAlign" : "left"}}>
                                <a href={'/viewIdea/' + idea.id}>
                                    <div className='idea-title' style={{"fontWeight":"bold"}}> {idea.ideaTitle} </div>
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
                            <td style={{"fontSize":"14px"}}> {idea.ideaStatus}</td>
                            <td style={{"fontSize":"14px"}}> {idea.fname + " " + idea.lname}</td>
                            <td style={{"fontSize":"14px"}}>
                                {
                                    new Date(idea.createdDate).toDateString().slice(8, 11) +
                                    new Date(idea.createdDate).toDateString().slice(4, 8) + 
                                    new Date(idea.createdDate).toDateString().slice(11)
                                }
                            </td>
                            {/* <td>
                                {IdeaService.isFavoriteIdeaOfCurrentUser(idea.id) === false ? (
                                <AiOutlineHeart size={"40px"} color="red" />
                                ) : (
                                <AiFillHeart size={"40px"} color="red" />
                                )}
                            </td> */}
                            <td> </td>
                            {/* <td>
                                <a href='/editIdea' className='btn btn-outline-light'><BiEditAlt size={"30px"} color={"#527293"} /></a>
                            </td> */}
                                
                        </tr>
                    )
                }
            </tbody>
        </table>
    ) 
}

export default MyIdeas