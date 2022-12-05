import React, { Component } from 'react'
import IdeaService from '../services/idea.service'

import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineComment } from "react-icons/ai";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { MdOutlinePlaylistAddCheck } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import AddFavourite from './add-favourite.component';
import UserService from '../services/user.service';
import AuthService from '../services/auth.service';
import "./fresh-ideas-page.component.css"


class FreshIdeasPage extends Component {
    constructor(props) {
        super(props)
        this.myIdeas = this.myIdeas.bind(this);

        this.state = {
            ideas: [],
            myIdeasArr: [],
            userDetails: [],
        }
    }
    viewIdea(id){
        this.props.history.push(`/viewIdea/${id}`);
    }

    componentDidMount(){
        const user = AuthService.getCurrentUser();
        if (user) {
            UserService.getUserByEmail(user.email).then((res) => {
                this.setState({ userDetails: res.data});
            })
        }

        IdeaService.getIdeas().then((res) => {
            this.setState({ideas: res.data,});
        });
    }

    myIdeas(){
        var all = document.getElementById("all");
        var mine = document.getElementById("mine");
        if (all.style.display === "block") {
            all.style.display = "none";
            mine.style.display = "block";
        }
        else {
            all.style.display = "block";
            mine.style.display = "none";
        }
    }

    render() {
        return (
            <div style={{"marginTop":"60px"}}>
                <div>
                    <h2 className="d-inline-flex" style={{"left":"500px"}}>Fresh Ideas</h2>
                    <div
                    className="d-grid gap-2 d-md-flex justify-content-md-end"
                    style={{"float":"right"}}>
                        <div>
                            <a href="/addIdea" className="btn btn-success" >
                            Add Idea
                        </a>
                        </div>

                        <div className="btn btn-warning">
                            <label for="my-ideas-id"> My Ideas</label>
                            <input type="checkbox" id="my-ideas-id" onClick={this.myIdeas}></input>
                        </div>

                    </div>
                </div>
                 <div className = "row" id='all'>
                        <table style={{"textAlign" : "center"}} className = "table">
                        
                            <thead>
                                <tr>
                                    <th style={{"width" : "100px"}}> Idea</th>
                                    <th style={{"width" : "130px"}}> Response</th>
                                    <th style={{"width" : "90px"}}> Created by</th>
                                    <th style={{"width" : "100px"}}> Created date</th>
                                    <th style={{"width" : "100px"}}> Add favourite</th>
                                    <th style={{"width" : "50px"}}> Rewards</th>
                                    <th style={{"width" : "50px"}}> Status</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.ideas.map(
                                        idea => 
                                        <tr key = {idea.id}
                                        // class="clickable" onclick="window.location='https://ide.geeksforgeeks.org/Y4U8qx'"
                                        onclick="window.location='google.com';"
                                        
                                        >
                                            {/* <td> {idea.id}</td> */}
                                             <td style={{"textAlign" : "left"}}>
                                                <h5 style={{"fontSize":"25px"}}><a href="/viewIdea/{idea.id}">{idea.ideaTitle}</a></h5>
                                                <p style={{"width" : "400px",  "height" : "4.3em", "overflowY":"hidden",
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
                                             <td> {idea.fname + " " + idea.lname}</td>
                                             <td> {idea.createdDate}</td>
                                             <td> <AddFavourite /></td>
                                             <td> </td>
                                             <td> {idea.ideaStatus}</td>
                                             
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            <li class="page-item">
                            <a class="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                <span class="sr-only">
                                    {/* Previous */}
                                </span>
                            </a>
                            </li>
                            <li class="page-item"><a class="page-link" href="#">1</a></li>
                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                            <li class="page-item">
                            <a class="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                                <span class="sr-only">
                                    {/* Next */}
                                </span>
                            </a>
                            </li>
                        </ul>
                        </nav>
                    </div>

                    <div id='mine' style={{"display":"none"}}>
                        <h2 className="text-center display-5">My Ideas</h2>
                        <table style={{"textAlign" : "center"}} className = "table">
                            <thead >
                                <tr>
                                    <th style={{"width" : "100px"}}> Idea</th>
                                    <th style={{"width" : "150px"}}> Response</th>
                                    <th style={{"width" : "130px"}}> Created By</th>
                                    <th style={{"width" : "130px"}}> Created date</th>
                                    <th style={{"width" : "130px"}}> Add favourite</th>
                                    <th style={{"width" : "50px"}}> Rewards</th>
                                    <th style={{"width" : "50px"}}> Status</th>
                                    <th style={{"width" : "50px"}}> Edit</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    // this.state.ideas.map(
                                        this.state.ideas.filter((idea)=>idea.fname===this.state.userDetails.fname).map(
                                        idea => 
                                        <tr key = {idea.id} >
                                            {/* <td> {idea.id}</td> */}
                                             <td style={{"textAlign" : "left"}}>
                                             <h5 style={{"fontSize":"25px"}}><a href="/viewIdea/{idea.id}">{idea.ideaTitle}</a></h5>
                                                <p style={{"width" : "400px",  "height" : "4.3em", "overflowY":"hidden",
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
                                             <td> {idea.fname + " " + idea.lname}</td>
                                             <td> {idea.createdDate}</td>
                                             <td> <AddFavourite /></td>
                                             <td> </td>
                                             <td> {idea.ideaStatus}</td>
                                             <td>
                                                <a href='/editIdea' className='btn btn-outline-light'><BiEditAlt size={"30px"} color={"#527293"} /></a>
                                            </td>
                                             
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default FreshIdeasPage;