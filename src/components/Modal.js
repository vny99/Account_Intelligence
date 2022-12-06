import React from 'react';
import Comments from './Comments';
import './Modal.css';

const Modal = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div onClick={onClose} className='overlay'>
        <div onClick={(e) => { e.stopPropagation() }} className='modalContainer'>
            <div className='modalRight'>
                <button className='closeBtn' onClick={onClose}> X</button>

                <div className='content'>
                    <h3><strong>  Idea Title: Virtual Break Room</strong></h3>
                    <h4><strong> Description:</strong></h4>
                    <p> The simple chats that happen on the office floor are sorely missed. Since most members of your team still work remotely, a virtual break room is an excellent team-building activity.</p>
                </div>

                <div className='btnContainer'>
                    <button className='btnOutline'>
                        favourite
                    </button>
                </div>

                <Comments />
            </div>
        </div>
    </div>
  );
};


export default Modal;
//export default App;
