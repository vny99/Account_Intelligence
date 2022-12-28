import React, { Component } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

class AddFavourite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ideaId: this.props.ideaId,
      liked: this.props.liked,
      localLiked: false,
      email: "",
    };
  }

  componentDidMount(){
    const user = AuthService.getCurrentUser();
    if (user) { this.setState({ email: user.email}); }
    // IdeaService.isFavoriteIdeaOfCurrentUser(this.state.ideaId).then((res) => { this.setState({ liked : res.data}); })
}

  toggle = () => {
    let localLiked = this.state.liked
    localLiked = !localLiked;
    if (localLiked === true){ UserService.addFavorite(this.props.ideaId) }
    if (localLiked === false){ UserService.removeFavorite(this.props.ideaId) }
    this.setState({ liked: localLiked });
  };
  
  render() {
    return (
          <div onClick={() => this.toggle()} >
            { console.log(this.state.liked) }
            {this.state.liked === true ? (
              // <AiFillHeart size={"40px"} color="red" />
              <div>true</div>
            ) : (
              // <AiOutlineHeart size={"40px"} color="red" />
              <div>false</div>
            )}
          </div>
    );
  }
}
  
export default AddFavourite;