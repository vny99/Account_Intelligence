import React from 'react';
import { useState } from 'react';
import IdeaService from '../services/idea.service';
import Comments from './Comments';
import './IdeaPopup.css';

let idea = []
const IdeaPopup = ({ ideaId, open, onClose }) => {
    const [idea, setIdea] = useState([])
    
    IdeaService.getIdeaById(ideaId).then((res) => {
        setIdea(res.data)
    });

    // console.log(idea)

    if (!open) return null;
    return (
        <div onClick={onClose} className='overlay'>
            <div onClick={(e) => { e.stopPropagation() }} className='modalContainer'>
                <div className='modalRight'>
                    <button className='closeBtn' onClick={onClose}> X</button>

                    <div className='content'>
                        <h3><strong>  {idea.ideaTitle}</strong></h3>
                        <h4><strong> Description:</strong></h4>
                        <p> {idea.ideaDescription}</p>
                    </div>

                    <div className='btnContainer'>
                        <button className='btnOutline'>
                            favourite
                        </button>
                    </div>

                    <Comments ideaId={ideaId} />
                </div>
            </div>
        </div>
    );
};


export default IdeaPopup;
