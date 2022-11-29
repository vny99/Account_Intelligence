import React, { Component } from 'react'
import IdeaService from '../services/idea.service'

import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineComment } from "react-icons/ai";
import AddFavourite from './add-favourite.component';
import UserService from '../services/user.service';

class RecentIdeasTableComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: []
        }
    }

    componentDidMount(){
        UserService.getUserByEmail("vandana.kaviti@soprasteria.com").then((res) => {
            this.setState({ user: res.data});
        });

    }

    render() {
        return (
            <div>
                Hello
                 <h2 className="text-center">User</h2>
                 {this.state.user.fname + " " + this.state.user.lname}   
            </div>
        )
    }
}

export default RecentIdeasTableComponent;