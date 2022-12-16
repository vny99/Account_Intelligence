import React, { Component } from 'react'
import BusinessChallengesService from '../services/business-challenge.service'

// import "./business-challenges-page.component.css"
import Pagination from './Pagination';
import Challenges from './challenges.component';
import AuthService from '../services/auth.service';
import UserService from '../services/user.service';


class BusinessChallengesPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showAdminBoard: false,
            challenges: [],
            userDetails: [],
            currentPage: 1,
            recordsPerPage: 10,
        }
    }

    setCurrentPage = (page) => {
        this.setState(
            {
                currentPage : page
            }
        );
    }
    
    viewChallenge(id){
        this.props.history.push(`/viewChallenge/${id}`);
    }

    componentDidMount(){
        const user = AuthService.getCurrentUser();
        if (user) {
        UserService.getUserByEmail(user.email).then((res) => {
            this.setState({ userDetails: res.data});
        })
        this.setState({
            showAdminBoard: user.role.authority.includes("ROLE_ADMIN"),
        });
        }

        BusinessChallengesService.getBusinessChallenges().then((res) => {
            this.setState({challenges: res.data,});
        });
    }

    render() {
        const { showAdminBoard, currentPage, recordsPerPage,challenges } = this.state;
        const indexOfLastRecord = currentPage * recordsPerPage;
        const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
        const currentRecords = challenges.slice(indexOfFirstRecord, indexOfLastRecord);
        const nPages = Math.ceil(challenges.length / recordsPerPage)

        return (
            <div>
                <div className="heading-line">
                    <h2 className="d-inline-flex display-5" style={{"left":"450px"}}>Business Challenges</h2>

                    {showAdminBoard && (
                        <div className="d-inline-flex" style={{"float":"right", "marginTop":"15px"}}>
                            <div>
                                <a href="/addChallenge" className="btn btn-success" >
                                    Add Business Challenge
                                </a>
                            </div>
                        </div>
                        )
                    }

                </div>

                <div className = "row" id='all'>
                    <Challenges data={currentRecords} showAdminBoard = {showAdminBoard}/>
                    <Pagination
                        nPages={nPages}
                        currentPage={currentPage}
                        setCurrentPage={this.setCurrentPage}
                    />
                </div>
            </div>
        )
    }
}

export default BusinessChallengesPage;