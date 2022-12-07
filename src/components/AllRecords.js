import React, { useState } from 'react'

import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineComment } from "react-icons/ai";
import AddFavourite from './add-favourite.component';
import IdeaPopup from './IdeaPopup';

const AllRecords = ({data}) => {
    const [openIdeaPopup, setOpenIdeaPopup] = useState(false);
    return (  
        <table style={{"textAlign" : "center"}} className = "table">
            <thead>
                <tr>
                    <th style={{"width" : "20px"}}> Log</th>
                    <th style={{"width" : "50px"}}> Idea</th>
                    <th style={{"width" : "140px"}}> Response</th>
                    <th style={{"width" : "40px"}}> Status</th>
                    <th style={{"width" : "110px"}}> Created by</th>
                    <th style={{"width" : "130px"}}> Created date</th>
                    <th style={{"width" : "150px"}}> Add favourite</th>
                    <th style={{"width" : "40px"}}> Rewards</th>
                </tr>
            </thead>
            <tbody>
                <br></br>
                {
                    data.map(
                        idea => 
                        <tr key = {idea.id}
                        >
                                <td> {idea.ideaId}</td>
                                <td style={{"textAlign" : "left"}}>
                                    <h5 style={{"fontSize":"25px"}}>

                                        <span className="link" onClick={() => setOpenIdeaPopup(true)} > {idea.ideaTitle}</span>
                                        <IdeaPopup ideaId={idea.id} open={openIdeaPopup} onClose={() => setOpenIdeaPopup(false)} />

                                        {/* <a onClick={<IdeaPopup ideaId={idea.id} open={openIdeaPopup} onClose={() => setOpenIdeaPopup(false)} />}> {idea.ideaTitle}</a> */}
                                    </h5>

                                    <p style={{"width" : "300px",  "height" : "4.3em", "overflowY":"hidden",
                                    "textOverflow": "ellipsis",
                                    "fontSize":"12px"
                                    }}>
                                        {idea.ideaDescription}
                                    </p>
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
                                
                        </tr>
                    )
                }
            </tbody>
        </table>
    ) 
}

export default AllRecords