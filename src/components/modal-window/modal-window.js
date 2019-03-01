import React, { Component } from "react";
import "./modal-window.scss";

export default class ModalWindow extends Component {
  state = {
    title: "",
    body: ""
  };

  changeTitle = title => {
    this.setState({
      title
    });
  };

  changeBody = body => {
    this.setState({
      body
    });
  };

  createPost = () => {
    if (this.state.title === "" || this.state.body === "") {
      alert("Fill all fields");
      return;
    }
    let date = new Date();
    this.props.addPost(this.state.title, this.state.body, date);
    this.setState(
      {
        title: "",
        body: ""
      },
      () => {
        this.props.closeModalWindow();
      }
    );
  };

  render() {
    return (
      <div hidden={!this.props.modalWindowIsOpen} className="ModalWindow">
        <div className="ModalWindow__title-block">
          <label className="ModalWindow__title">
            Title:
            <input
              className="ModalWindow__title-field"
              placeholder="Some Title"
              type="text"
              value={this.state.title}
              onChange={event => this.changeTitle(event.target.value)}
            />
          </label>
        </div>
        <div className="ModalWindow__body">
          <label className="ModalWindow__title">
            Body:
            <textarea
              value={this.state.body}
              className="ModalWindow__body-text"
              onChange={event => this.changeBody(event.target.value)}
            />
          </label>
        </div>
        <button className="ModalWindow__btn" onClick={this.createPost}>
          Create!
        </button>
      </div>
    );
  }
}
