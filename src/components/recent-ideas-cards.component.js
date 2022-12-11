import React, { Component } from 'react'
import { AiOutlineComment } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import {Swiper,SwiperSlide} from "swiper/react"
import { Pagination,Navigation } from 'swiper';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import IdeaService from '../services/idea.service'
import "./recent-ideas-cards.component.css"

class RecentIdeasCardsComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            ideas: []
        }

    }

    viewIdea(id) {
        this.props.history.push(`/viewIdea/${id}`);
    }

    componentDidMount() {
        IdeaService.getRecentIdeas().then((res) => { this.setState({ ideas: res.data }); });
    }

    render() {
        return (
            <div>
                <div className="head"><h1 className="d-inline-flex display-6 cards-title">Latest ideas</h1></div>
                <div className='swiper_body' style={{}}>
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={0}
                        slidesPerGroup={3}
                        loop={true}
                        loopFillGroupWithBlank={true}
                        // pagination={{ clickable: true, }}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        className="mySwiper"
                    >
                        {
                            this.state.ideas.map(
                                idea =>
                                <SwiperSlide
                                // style={{"left":"60px"}}
                                >
                                    <div className="ideas">
                                        <div className="ideas_container" key={idea.id}>
                                            <span>
                                                <span style={{ "display": "inline-block", "padding": "5px", "align-items": "flex-end", "flex-direction": "column",
                                                // "marginLeft":"10px"
                                                }} className="like">
                                                    <AiOutlineLike size={"25px"} />
                                                    <div>{idea.likesCount}</div>
                                                </span>

                                                <span style={{ "display": "inline-block", "padding": "5px",
                                                // "marginLeft":"213px"
                                                }} className="like">
                                                    <AiOutlineComment size={"25px"} color={"Tomato"} />
                                                    <div>{idea.commentsCount}</div>
                                                </span>

                                            </span>

                                            <div className="ideas_container_name">
                                                <a href={'/viewIdea/' + idea.id} className='idea-title-link'>
                                                    <h1>{idea.ideaTitle}</h1>
                                                </a>
                                            </div>

                                            <div className="ideas_container_description">
                                                <p>
                                                    {/* {idea.ideaDescription} */}
                                                </p>
                                            </div>

                                            <div className="ideas_container_content">
                                                <p>Created Date:
                                                    <h6>{idea.createdDate}</h6>
                                                </p>
                                                <p>Created By:
                                                    <h6>{idea.fname + " " + idea.lname}</h6>
                                                </p>
                                            </div>

                                            <div>
                                                <button className="status-button"> status
                                                    <h1>{idea.Status}</h1>
                                                </button>
                                                <button className="view-more-button">view more</button>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        }
                
                    </Swiper>
                </div>
            </div>
        );
    }
};
export default RecentIdeasCardsComponent;