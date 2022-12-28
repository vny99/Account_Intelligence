import React from 'react';
import { slide as Menu } from 'react-burger-menu';
// import './MySidebar.css';

import { FcIdea } from "react-icons/fc";
import { FcTimeline } from "react-icons/fc";
import { CgCardHearts, CgFileAdd } from "react-icons/cg";
import Logo from ".//logo.jpg"


const props = () => {
  return (
      <Menu noTransition width={'80px'} customBurgerIcon={ <img src={Logo} /> } >
      <a className="bm-item" href="/ideas">
        <FcIdea style={{"fontSize":"30px"}} />
        <div>Fresh Ideas</div>
      </a>

      <a className="bm-item" href="/challenges">
        <FcTimeline style={{"fontSize":"30px"}} />
        <div>Business Challenges</div>
      </a>

      <a className="bm-item" href="/addIdea">
        <CgFileAdd color='rgba(103, 192, 103, 0.75)' style={{"fontSize":"30px"}} />
        <div>Add Idea</div>
      </a>

      <a className="bm-item" href="/myFavorites">
        <CgCardHearts color='rgb(181, 72, 72)' style={{"fontSize":"30px"}} />
        <div>My Favorites</div>
      </a>
    </Menu>
  );
};

export default props;