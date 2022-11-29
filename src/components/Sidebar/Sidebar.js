import React from 'react';
import { stack as Menu } from 'react-burger-menu';
import './Sidebar.css';

import { FcIdea } from "react-icons/fc";
import { CgCardHearts, CgFileAdd } from "react-icons/cg";


const props = () => {
  return (
    <Menu width={'80px'}>
      <a className="bm-item" href="/ideas">
        <FcIdea style={{marginRight:"10px", "fontSize":"30px"}} />
        <div>Fresh Ideas</div>
      </a>

      <a className="bm-item" href="/addIdea">
        <CgFileAdd color='green' style={{marginRight:"10px", "fontSize":"30px"}} />
        <div>Add Idea</div>
      </a>

      <a className="bm-item" href="/myFavorites">
        <CgCardHearts color='red' style={{marginRight:"10px", "fontSize":"30px"}} />
        <div>My Favorites</div>
      </a>
    </Menu>
  );
};

export default props;