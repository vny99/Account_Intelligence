import React, { Component } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

class AddFavourite extends Component {
  state = { liked: false };
  toggle = () => {
    let localLiked = this.state.liked;
  
    // Toggle the state variable liked
    localLiked = !localLiked;
    this.setState({ liked: localLiked });
  };
  render() {
    return (
          <div
            // className="container"
            // style={{ border: "1px solid black", width: "15%" }}
            onClick={() => this.toggle()}
          >
            {this.state.liked === false ? (
              <AiOutlineHeart size={"27px"} color="red" />
            ) : (
              <AiFillHeart size={"30px"} color="red" />
            )}
          </div>
    );
  }
}
  
export default AddFavourite;