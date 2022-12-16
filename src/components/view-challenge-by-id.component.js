import React, { Component } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import BusinessChallengesService from '../services/business-challenge.service'

function ViewChallengeById(props) {
    const [challenge, setChallenge] = useState({});
    const { id } = useParams();
    
    BusinessChallengesService.getChallengeById(id).then((res) => {
        setChallenge(res.data);
    });
    
    return (
        <div>
            <div className = "card col-md-6 offset-md-3">
                <h3 className = "text-center"> View Challenge Details</h3>
                <div className = "card-body">
                    <div className = "row">
                        <label> Challenge Id: </label>
                        <div> { challenge.challengeId }</div>
                    </div>
                    <div className = "row">
                        <label> Challenge Title: </label>
                        <div> { challenge.challengeTitle }</div>
                    </div>
                    <div className = "row">
                        <label> Challenge Description: </label>
                        <div> { challenge.challengeDescription }</div>
                    </div>
                    <div className = "row">
                        <label> Challenge status: </label>
                        <div> { challenge.challengeStatus }</div>
                    </div>
                    <div className = "row">
                        <label> Challenge created by: </label>
                        <div> { challenge.fname + " " + challenge.lname }</div>
                    </div>
                    <div className = "row">
                        <label> Challenge created date: </label>
                        <div> { challenge.createdDate }</div>
                    </div>
                    <div className = "row">
                        <label> Challenge expiry date: </label>
                        <div> { challenge.expiryDate }</div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ViewChallengeById;