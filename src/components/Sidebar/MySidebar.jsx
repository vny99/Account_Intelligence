import React from 'react';
import './MySidebar.scss';

import { FcIdea } from "react-icons/fc";
import { CgCardHearts, CgFileAdd } from "react-icons/cg";
import SvgComponent1 from './SvgComponent1';
import SvgComponent2 from './SvgComponent2';
import SvgComponent3 from './SvgComponent3';
import SvgComponent4 from './SvgComponent4';
import SvgComponent5 from './SvgComponent5';


const props = () => {
  return (
    <div>
        <header class="main-head">
            {/* <SvgComponent2 /> */}
            <nav class="head-nav">
                <ul class="menu">
                    <li>
                        <a href="/ideas">
                            <svg class="person">
                                <FcIdea />
                            </svg>
                            <span>Fresh Ideas</span>
                        </a>
                    </li>
                    <li>
                        <a href="/ideas">
                            <svg class="person">
                                <FcIdea />
                            </svg>
                            <span>Fresh Ideas</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                        <svg class="speech-bubble">
                            {/* <SvgComponent4 /> */}
                        </svg><span>Blog</span></a>
                    </li>
                    <li>
                        <a href="#">
                        <svg class="paper-airplane">
                            {/* <SvgComponent5 /> */}
                        </svg><span>Contact</span></a>
                    </li>
                </ul>
            </nav>
        </header>
        <div class="wrap-all-the-things"></div>
    </div>
  );
};

export default props;