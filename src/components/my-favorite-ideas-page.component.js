import React, { Component } from 'react'

import UserService from '../services/user.service';
import AuthService from '../services/auth.service';
import "./fresh-ideas-page.component.css"
import Pagination from './Pagination';
import { AiFillHeart, AiOutlineComment, AiOutlineHeart, AiOutlineLike } from 'react-icons/ai';
import IdeaService from '../services/idea.service';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';


class MyFavoriteIdeasPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            myIdeasArr: [],
            userDetails: [],
            currentPage1: 1,
            currentPage2: 1,
            recordsPerPage: 3,
        }
    }

    setCurrentPage1 = (page) => {
        this.setState(
            {
                currentPage1 : page
            }
        );
    }

    setCurrentPage2 = (page) => {
        this.setState(
            {
                currentPage2 : page
            }
        );
    }

    componentDidMount(){
        const user = AuthService.getCurrentUser();
        if (user) {
            UserService.getUserByEmail(user.email).then((res) => {
                this.setState({ userDetails: res.data});
            })
        }

        UserService.getFavorites().then((res) => {
            this.setState({data: res.data,});
        });
    }

    myIdeas(){
        var all = document.getElementById("all");
        var mine = document.getElementById("mine");
        if (all.style.display === "none") {
            all.style.display = "block";
            mine.style.display = "none";
        }
        else {
            all.style.display = "none";
            mine.style.display = "block";
        }
    }

    render() {
        const { currentPage1, currentPage2, recordsPerPage, data } = this.state;

        const indexOfLastRecord1 = currentPage1 * recordsPerPage;
        const indexOfFirstRecord1 = indexOfLastRecord1 - recordsPerPage;
        const currentRecords1 = data.slice(indexOfFirstRecord1, indexOfLastRecord1);
        const nPages1 = Math.ceil(data.length / recordsPerPage)

        const indexOfLastRecord2 = currentPage2 * recordsPerPage;
        const indexOfFirstRecord2 = indexOfLastRecord2 - recordsPerPage;
        const currentRecords2 = data.slice(indexOfFirstRecord2, indexOfLastRecord2);
        const nPages2 = Math.ceil(data.length / recordsPerPage)

        return (
            <div>
                <div className="heading-line">
                    <h2
                    className="d-inline-flex display-5"
                    style={{"left":"500px"}}
                    >
                        My Favorites
                    </h2>
                </div>

                <div className = "row" id='all'>
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
                                    <tr key = {idea.id} > 
                                            <td style={{"verticalAlign":"middle"}}>
                                                {/* <b> <i>  */}
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
                                            <td style={{"fontSize":"14px"}}>
                                                {idea.fname + " " + idea.lname}
                                            </td>
                                            <td style={{"fontSize":"14px"}}>
                                                {
                                                    new Date(idea.createdDate).toDateString().slice(8, 11) +
                                                    new Date(idea.createdDate).toDateString().slice(4, 8) + 
                                                    new Date(idea.createdDate).toDateString().slice(11)
                                                }
                                            </td>

                                            <td> 
                                                {IdeaService.isFavoriteIdeaOfCurrentUser(idea.id) === false ? (
                                                <FcLikePlaceholder size={"40px"} color="red" />
                                                ) : (
                                                <FcLike size={"40px"} color="red" />
                                                )}
                                            </td>
                                            <td> </td>
                                            
                                    </tr>
                                    // </a>
                                )
                            }
                        </tbody>
                    </table>

                    <Pagination
                        // style={{"back"}}
                        nPages={nPages1}
                        currentPage={currentPage1}
                        setCurrentPage={this.setCurrentPage1}
                    />
            </div>

            {/* <div id='mine' style={{"display":"none"}}>
                <MyIdeas data={currentRecords2} userDetails={userDetails}/>
                <Pagination className="pagination"
                    nPages={nPages2}
                    currentPage={currentPage2}
                    setCurrentPage={this.setCurrentPage2}
                />
            </div> */}

            </div>
        )
    }
}

export default MyFavoriteIdeasPage;