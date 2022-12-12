import React from 'react'

const Challenges = ({data}) => {
    console.log(data)
    return (  
        <table className = "table">
            <thead style={{"textAlign":"center", "verticalAlign":"middle"}}>
                <tr>
                    <th> ID </th>
                    <th> Challenge</th>
                    <th> Status</th>
                    <th> Created by</th>
                    <th> Created date</th>
                    <th> Expiry date</th>
                </tr>
            </thead>
            <tbody>
                <br></br>
                {
                    data.map(
                        challenge =>
                        <tr key = {challenge.id} > 
                                <td style={{"verticalAlign":"middle"}}>
                                    <b> <i> {challenge.challengeId} </i> </b>
                                    </td>
                                <td style={{"textAlign" : "left"}}>
                                    <a href={'/viewChallenge/' + challenge.id}>
                                        <div className='idea-title' style={{"fontWeight":"bold"}}> {challenge.challengeTitle} </div>
                                        <p style={{"width" : "500px", "height" : "4.3em", "overflowY":"hidden", "textOverflow": "ellipsis", "fontSize":"14px"}}>
                                            {challenge.challengeDescription}
                                        </p>
                                    </a>
                                </td>
                                <td> {challenge.challengeStatus}</td>
                                <td> {challenge.fname + " " + challenge.lname}</td>
                                <td> {challenge.createdDate}</td>
                                <td> {challenge.expiryDate}</td>
                                
                        </tr>
                        // </a>
                    )
                }
            </tbody>
        </table>
    ) 
}

export default Challenges