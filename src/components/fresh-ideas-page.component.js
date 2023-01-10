import React, { Component } from 'react'
import IdeaService from '../services/idea.service'

import UserService from '../services/user.service';
import AuthService from '../services/auth.service';
import "./fresh-ideas-page.component.css"
import AllIdeas from './all-ideas.component';
import MyIdeas from './my-ideas.components';
import Pagination from './pagination.component';
import { Table } from './Table';

class FreshIdeasPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            myIdeasData: [],
            userDetails: [],
            currentPage1: 1,
            currentPage2: 1,
            recordsPerPage: 10,
            myIdeasButton: undefined
        }

        this.myIdeas = this.myIdeas.bind(this);
    }

    setCurrentPage1 = (page) => { this.setState({ currentPage1 : page }); }
    setCurrentPage2 = (page) => { this.setState({ currentPage2 : page }); }

    componentDidMount(){
        const user = AuthService.getCurrentUser();
        if (user) {
            UserService.getUserByEmail(user.email).then((res) => {
                this.setState({ userDetails: res.data});
            })
        }

        IdeaService.getIdeas().then((res) => {
            this.setState({data: res.data,});
            this.setState({myIdeasData: res.data.filter((idea)=>idea.userId===this.state.userDetails.id)})
        });
    }

    myIdeas(){
        var all = document.getElementById("all");
        var mine = document.getElementById("mine");
        if (all.style.display === "none") {
            this.setState({ myIdeasButton: false});
            all.style.display = "block";
            mine.style.display = "none";
        }
        else {
            this.setState({ myIdeasButton: true});
            all.style.display = "none";
            mine.style.display = "block";
        }
    }

    render() {
        const { currentPage1, currentPage2, recordsPerPage, userDetails, data, myIdeasData, myIdeasButton } = this.state;

        const indexOfLastRecord1 = currentPage1 * recordsPerPage;
        const indexOfFirstRecord1 = indexOfLastRecord1 - recordsPerPage;
        const currentRecords1 = data.slice(indexOfFirstRecord1, indexOfLastRecord1);
        const nPages1 = Math.ceil(data.length / recordsPerPage)

        const indexOfLastRecord2 = currentPage2 * recordsPerPage;
        const indexOfFirstRecord2 = indexOfLastRecord2 - recordsPerPage;
        const currentRecords2 = myIdeasData.slice(indexOfFirstRecord2, indexOfLastRecord2);
        const nPages2 = Math.ceil(myIdeasData.length / recordsPerPage)

        // const columns = [
        //     { accessor: 'name', label: 'Name' },
        //     { accessor: 'age', label: 'Age' },
        //     { accessor: 'is_manager', label: 'Manager', format: (value) => (value ? '✔️' : '✖️') },
        //     { accessor: 'start_date', label: 'Start Date' },
        // ]
    
        // const rows = [
        //     { id: 1, name: 'Liz Lemon', age: 36, is_manager: true, start_date: '02-28-1999' },
        //     { id: 2, name: 'Jack Donaghy', age: 40, is_manager: true, start_date: '03-05-1997' },
        //     { id: 3, name: 'Tracy Morgan', age: 39, is_manager: false, start_date: '07-12-2002' },
        //     { id: 4, name: 'Jenna Maroney', age: 40, is_manager: false, start_date: '02-28-1999' },
        //     { id: 5, name: 'Kenneth Parcell', age: Infinity, is_manager: false, start_date: '01-01-1970' },
        //     { id: 6, name: 'Pete Hornberger', age: 42, is_manager: true, start_date: '04-01-2000' },
        //     { id: 7, name: 'Frank Rossitano', age: 36, is_manager: false, start_date: '06-09-2004' },
        //     { id: 8, name: null, age: null, is_manager: null, start_date: null },
        // ]

        const columns = [
            { accessor: 'ideaId', label: 'ID' },
            { accessor: 'idea', label: 'Idea' },
            { accessor: 'response', label: 'Response' },
            { accessor: 'ideaStatus', label: 'Status'},
            { accessor: 'createdBy', label: 'Created by' },
            { accessor: 'createdDate', label: 'Created date'},
            { accessor: 'rewards', label: 'Rewards' }
        ]

        const rows = []
        currentRecords1.map(
            i => 
            rows.push({
                ideaId: i.ideaId,
                ideaTitle: i.ideaTitle,
                ideaDescription: i.ideaDescription,
                response: '',
                ideaStatus: i.ideaStatus,
                createdBy: i.fname + " " + i.lname,
                createdDate: i.createdDate,
                rewards: i.rewards
            })
        )

        return (
            <div>
                <div className="heading-line">
                    <h2 className="d-inline-flex display-5" style={{"left":"500px"}}>
                        {!myIdeasButton &&  "Fresh Ideas"}
                        {myIdeasButton &&  "My Ideas"}
                    </h2>

                    <div className="d-inline-flex" style={{"float":"right", "marginTop":"15px"}}>
                        <div>
                            <a href="/addIdea" className="btn btn-secondary" >
                                {/* <FcAddRow size={"20px"} style={{"paddingRight":"10px"}} /> */}
                                Add Idea
                            </a>
                        </div>

                        <div className="btn btn-secondary my-ideas-button">
                            <label htmlFor="my-ideas-id">
                                {/* <FcList size={"20px"} style={{"paddingRight":"10px"}} /> */}
                                <input type="checkbox" id="my-ideas-id" onClick={this.myIdeas} />
                                {!myIdeasButton &&  "My Ideas"}
                                {myIdeasButton &&  "All Ideas"}
                            </label> 
                        </div>

                    </div>
                </div>

                <div className = "row" id='all'>
                    <AllIdeas data={currentRecords1}  />
                    <Pagination nPages={nPages1} currentPage={currentPage1} setCurrentPage={this.setCurrentPage1} />
                    {/* <Table rows={rows} columns={columns} data = {currentRecords1} /> */}
                </div>

                <div id='mine' style={{"display":"none"}}>
                    <MyIdeas data={currentRecords2} userDetails={userDetails}/>
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