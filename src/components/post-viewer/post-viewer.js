import React, { Component } from "react";
import "./post-viewer.scss";

export default class PostViewer extends Component {
  state = {
    title: "NOT FOUND",
    body: "Sorry, but according to your request there is no such post, return to the main page.",
    date: {},
    comments: [],
    comment: ""
  };

  changeCommentField = (text) => {
    this.setState({
      comment:text,
    })
  };

  sendComments = () => {
    fetch(`https://simple-blog-api.crew.red/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        postId: +this.props.match.params.id,
        body: this.state.comment,
      })
    }).then(() => {
      this.getData();
    });
  };

  componentDidMount() {
    this.getData()
  }

  getData() {
    fetch(
      `https://simple-blog-api.crew.red/posts/${
        this.props.match.params.id
      }?_embed=comments`
    )
      .then(response => {
        if(response.status.toString()[0] === '2') {
          return response.json();
        }
      })
        .then(({ title, body, date, comments }) => {
        this.setState({
          title,
          body,
          date,
          comments
        });
      });
  }


  render() {
    return (
      <div className="PostViewer">
        <div className="PostViewer__title">{this.state.title}</div>
        <div className="PostViewer__body">{this.state.body}</div>
        <div className="PostViewer__comments">
          Comment:
          <input
            value={this.state.comment}
            onChange={(event) => {
              this.changeCommentField(event.target.value)
            }}
            className="PostViewer__comments-field"
            type="text"
          />
          <button 
            className="PostViewer__comments-send-btn"
            onClick={() => {
              this.sendComments()
            }}
            >
              SEND
            </button>

          <ul className="PostViewer__comments-list">
            {this.state.comments.map(comment => (
              <li className="PostViewer__comments-item" key={comment.id}>
                id:{comment.id}: - {comment.body}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
