import React from 'react';
import { stack as Menu } from 'react-burger-menu';
import './Sidebar.css';

import { FcIdea } from "react-icons/fc";
import { FcKindle } from "react-icons/fc";


const props = () => {
  return (
    <Menu width={'80px'}>
      <a className="bm-item" href="/businesschallenges">
        
        <FcKindle style={{marginRight:"10px"}} />
        <div className="hide">
          Business Challenges
        </div>
        
      </a>
      <a className="bm-item" href="/ideas">

        <FcIdea
          // style={{marginRight:"10px"}} 
        />

        {/* <div class="myDIV">
            <FcIdea
            // style={{marginRight:"10px"}} 
            />
          </div>

        <div class="hide">
          Ideas
        </div> */}
      </a>
    </Menu>
  );
};

export default props;