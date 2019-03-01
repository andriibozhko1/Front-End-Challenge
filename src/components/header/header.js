import React, { Component } from "react";
import PostCreator from "../post-creator/post-creator";
import "./header.scss";

export default class Header extends Component {
  render() {
    return (
      <div className="Header">
        <PostCreator addPost={this.props.addPost} />
      </div>
    );
  }
}
