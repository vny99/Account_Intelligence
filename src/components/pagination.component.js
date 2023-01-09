import React from 'react'

import { FcPrevious } from "react-icons/fc"
import { FcNext } from "react-icons/fc"

import "./pagination.component.css"

const Pagination = ({ nPages, currentPage, setCurrentPage }) => {

    const pageNumbers = [...Array(nPages + 1).keys()].slice(1)
    
    const nextPage = () => {
        if(currentPage !== nPages) setCurrentPage(currentPage + 1)
    }

    const prevPage = () => {
        if(currentPage !== 1) setCurrentPage(currentPage - 1)
    }

    return (
        <nav style={{"zIndex":"8"}}>
            <ul className='pagination'>
                <li className="page-item">
                    <a className="page-link" onClick={prevPage} href='#'>
                        <FcPrevious />
                    </a>
                </li>

                {pageNumbers.map(pgNumber => (
                    <li key={pgNumber} 
                        className= {`page-item ${currentPage == pgNumber ? 'active' : ''} `} >

                        <a onClick={() => setCurrentPage(pgNumber)}  
                            className='page-link' 
                            href='#'>    
                            {pgNumber}
                        </a>
                    </li>
                ))}
                
                <li className="page-item">
                    <a className="page-link" onClick={nextPage} href='#'>
                        <FcNext />
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination