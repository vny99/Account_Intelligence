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
                                <td>
                                    {/* { challenge.creaatedDate|date:'d M Y' } */}
                                    {/* { challenge.createdDate.strftime('%d %B %Y')} */}
                                    {/* {challenge.createdDate} */}
                                    {/* {new Date(challenge.createdDate).toUTCString()} */}
                                    {new Date(challenge.createdDate).toDateString().slice(4, 11) + "," + new Date(challenge.createdDate).toDateString().slice(11)}
                                    {/* {challenge.createdDate.slice(0, 10)} */}
                                    {/* {new Date(challenge.createdDate).toISOString().slice(4, 16)} */}
                                </td>
                                <td> 
                                {new Date(challenge.expiryDate).toDateString().slice(4, 11) + "," + new Date(challenge.expiryDate).toDateString().slice(11)}
                                </td>
                                
                        </tr>
                        // </a>
                    )
                }
            </tbody>
        </table>
    ) 
}

export default Challenges