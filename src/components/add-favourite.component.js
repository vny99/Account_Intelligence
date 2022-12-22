import React, { Component } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import IdeaService from "../services/idea.service";

class AddFavourite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      localLiked: false,
      email: "",
      ideaId: this.props.ideaId,
    };
  }

  componentDidMount(){
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({ email: user.email});
    }

}

  toggle = () => {

    let localLiked = this.state.liked

    // IdeaService.isFavoriteIdeaOfCurrentUser(this.state.ideaId).then((res) => {
    //   this.setState({ localLiked: res.data});
    // })

    localLiked = !localLiked;
    if (localLiked === true){
      UserService.addFavorite(this.props.ideaId)
    }

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