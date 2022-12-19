import React, { Component } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

class AddFavourite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      email: "",
      // email: this.props.email,
      ideaId: this.props.ideaId,
    };
    // console.log(email, ideaId);
    // console.log(this.state.email, this.state.ideaId);
  }

  componentDidMount(){
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({ email: user.email});
    }
}

  toggle = () => {
    let localLiked = this.state.liked;

    // Toggle the state variable liked
    localLiked = !localLiked;
    if (localLiked === true){
    // console.log(this.state.email, this.props.ideaId)
    UserService.addFavorite(this.props.ideaId)
    }
    // else{
    //   UserService.removeFavorite(this.state.email, this.props.ideaId)
    // }

    this.setState({ liked: localLiked });
  };
  render() {
    return (
          <div onClick={() => this.toggle()} >
            {this.state.liked === false ? (
              <AiOutlineHeart size={"40px"} color="red" />
            ) : (
              <AiFillHeart size={"40px"} color="red" />
            )}
          </div>
    );
  }
}
  
export default AddFavourite;