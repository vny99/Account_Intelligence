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

class MostLikedCardsComponent extends Component {

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
        IdeaService.getMostlikedcards().then((res) => { this.setState({ ideas: res.data }); });
    }

    render() {
        return (
            <div>
                <div className="head"><h1 className="d-inline-flex display-6 cards-title">Most Liked Ideas</h1></div>
                <div className='swiper_body' style={{}}>
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={0}
                        slidesPerGroup={3}
                        // loop={true}
                        loopFillGroupWithBlank={true}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        className="mySwiper"
                    >
                        {
                            this.state.ideas.map(
                                idea =>
                                <SwiperSlide
                                // style={{"left":"25px"}}
                                >
                                    <div className="ideas">
                                        <div className="ideas_container" key={idea.id}>
                                            <a href={'/viewIdea/' + idea.id} className='idea-title-link'>
                                                <div style={{"display":"flex", "alignItems":"flex-start"}}>
                                                    <div style={{ "display": "inline-block", "padding": "5px", "align-items": "flex-start", "flex-direction": "column",
                                                    }} className="like">
                                                        <AiOutlineLike size={"25px"} />
                                                        <div>{idea.likesCount}</div>
                                                    </div>

                                                    <div style={{ "display": "inline-block", "padding": "5px",
                                                    "marginLeft":"220px"
                                                    }} className="like">
                                                        <AiOutlineComment size={"25px"} color={"Tomato"} />
                                                        <div>{idea.commentsCount}</div>
                                                    </div>
                                                </div>

                                                <div className="ideas_container_name">
                                                    <h1>{idea.ideaTitle}</h1>
                                                </div>

                                                <div className="ideas_container_description">
                                                    <p> {idea.ideaDescription} </p>
                                                </div>

                                                <div className='ideas_container_status' >
                                                    <div> <b>Status: </b>
                                                    {/* <span style={{"backgroundColor":"rgb(102, 147, 102)", "color":"white", "padding":"2px", "border":"4px solid transparent", "borderRadius":"10px"}}> */}
                                                        {idea.ideaStatus}
                                                    {/* </span> */}
                                                    </div>
                                                </div>

                                                <div className="ideas_container_created">
                                                    <div> <b>Created Date: </b>
                                                        {
                                                            new Date(idea.createdDate).toDateString().slice(8, 11) +
                                                            new Date(idea.createdDate).toDateString().slice(4, 8) + 
                                                            new Date(idea.createdDate).toDateString().slice(11)
                                                        }
                                                    </div>
                                                    <div> <b>Created By: </b>{idea.fname + " " + idea.lname} </div>
                                                </div>
                                            </a>
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
export default MostLikedCardsComponent;