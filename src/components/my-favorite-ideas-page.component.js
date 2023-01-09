import React, { Component } from 'react'

import UserService from '../services/user.service';
import AuthService from '../services/auth.service';
import "./fresh-ideas-page.component.css"
import Pagination from './pagination.component';
import AllMyFavoriteIdeas from './all-favorite-ideas.component';


class MyFavoriteIdeasPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            userDetails: [],
            currentPage: 1,
            recordsPerPage: 10,
        }
    }

    setCurrentPage = (page) => { this.setState({ currentPage : page }); }

    componentDidMount(){
        const user = AuthService.getCurrentUser();
        if (user) {
            UserService.getUserByEmail(user.email).then((res) => {
                this.setState({ userDetails: res.data});
            })
        }

        UserService.getFavorites().then((res) => { this.setState({data: res.data,}); });
    }

    render() {
        const { currentPage, recordsPerPage, data } = this.state;

        const indexOfLastRecord = currentPage * recordsPerPage;
        const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
        const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
        const nPages = Math.ceil(data.length / recordsPerPage)

        return (
            <div style={{"height":"500px"}}>
                <div className="heading-line">
                    <h2
                    className="d-inline-flex display-5"
                    style={{"left":"500px"}}
                    >
                        My Favorites
                    </h2>
                </div>

                <div className = "row" id='all'>
                    <AllMyFavoriteIdeas data={currentRecords}  />
                    <Pagination
                        nPages={nPages}
                        currentPage={currentPage}
                        setCurrentPage={this.setCurrentPage}
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