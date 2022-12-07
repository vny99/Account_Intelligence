import React, { Component } from 'react'
import IdeaService from '../services/idea.service'

import UserService from '../services/user.service';
import AuthService from '../services/auth.service';
import "./fresh-ideas-page.component.css"
import AllRecords from './AllRecords';
import MyRecords from './MyRecords';
import Pagination from './Pagination';


class FreshIdeasPage extends Component {
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

        // this.setCurrentPage = this.setCurrentPage.bind(this);
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
        const { currentPage1, currentPage2, recordsPerPage, userDetails, data } = this.state;

        const indexOfLastRecord1 = currentPage1 * recordsPerPage;
        const indexOfFirstRecord1 = indexOfLastRecord1 - recordsPerPage;
        const currentRecords1 = data.slice(indexOfFirstRecord1, indexOfLastRecord1);
        const nPages1 = Math.ceil(data.length / recordsPerPage)

        const indexOfLastRecord2 = currentPage2 * recordsPerPage;
        const indexOfFirstRecord2 = indexOfLastRecord2 - recordsPerPage;
        const currentRecords2 = data.slice(indexOfFirstRecord2, indexOfLastRecord2);
        const nPages2 = Math.ceil(data.length / recordsPerPage)

        return (
            <div style={{"marginTop":"60px"}}>
                <div>
                    <h2 className="d-inline-flex display-5" style={{"left":"550px"}}>Fresh Ideas</h2>
                    <div className="d-inline-flex" style={{"float":"right", "marginTop":"15px"}}>
                        <div>
                            <a href="/addIdea" className="btn btn-success" >
                            Add Idea
                        </a>
                        </div>

                        <div className="btn btn-warning">
                            <label htmlFor="my-ideas-id">
                                <input type="checkbox" id="my-ideas-id" onClick={this.myIdeas} />
                                My Ideas
                            </label>
                            
                        </div>

                    </div>
                </div>

                <div className = "row" id='all'>
                    <AllRecords data={currentRecords1}/>
                    <Pagination
                        nPages={nPages1}
                        currentPage={currentPage1}
                        setCurrentPage={this.setCurrentPage1}
                    />
                </div>

                <div id='mine' style={{"display":"none"}}>
                    <MyRecords data={currentRecords2} userDetails={userDetails}/>
                    <Pagination className="pagination"
                        nPages={nPages2}
                        currentPage={currentPage2}
                        setCurrentPage={this.setCurrentPage2}
                    />
                </div>

            </div>
        )
    }
}

export default FreshIdeasPage;