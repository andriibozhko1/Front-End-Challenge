import React, { Component } from "react";
import PostList from "../post-list/post-list";
import { Switch, Route } from "react-router-dom";
import PostViewer from "../post-viewer/post-viewer";
import "../../style/style.scss";

export default class App extends Component {
  state = {
    posts: []
  };

  getAllPosts = () => {
    fetch("https://simple-blog-api.crew.red/posts")
      .then(response => response.json())
      .then(posts => {
        console.log(posts);
        this.setState({
          posts
        });
      });
  };

  addPost = (title, body, date) => {
    fetch(`https://simple-blog-api.crew.red/posts`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        body: body,
        title: title
      })
    }).then(() => this.updateData());
  };

  removePostByID = id => {
    fetch(`https://simple-blog-api.crew.red/posts/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(() => this.updateData());
  };

  componentDidMount() {
    this.getAllPosts();
  }

  updateData = () => {
    this.getAllPosts();
  };

  render() {
    return (
      <>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <PostList
                addPost={this.addPost}
                removePostByID={this.removePostByID}
                posts={this.state.posts}
              />
            )}
          />
          <Route path="/:id" component={PostViewer} />
        </Switch>
      </>
    );
  }
}
