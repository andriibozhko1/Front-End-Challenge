import React, { Component } from "react";
import Header from "../header/header";
import { Link } from "react-router-dom";
import "./post-list.scss";

export default class PostList extends Component {
  static PostCard(props) {
    const { title, body, id } = props.post;

    return (
      <article className="PostCard">
        <button
          className="PostCard__remove-btn"
          onClick={() => props.removePostByID(id)}
        >
          Remove
        </button>
        <Link className="Link" to={`${id}/${title}`}>
          <div className="PostCard__title">{title}</div>
          <div className="PostCard__body">{body}</div>
        </Link>
      </article>
    );
  }

  state = {
    posts: []
  };

  render() {
    return (
      <>
        <Header addPost={this.props.addPost} />
        <div className="PostList">
          <ul className="PostList__list">
            {this.props.posts.map(post => (
              <li key={post.id} className="PostList__item">
                <PostList.PostCard
                  removePostByID={this.props.removePostByID}
                  post={post}
                />
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }
}
