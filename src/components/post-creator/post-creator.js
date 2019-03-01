import React, { Component } from "react";
import ModalWindow from "../modal-window/modal-window";
import "./post-creator.scss";

export default class PostCreator extends Component {
  state = {
    modalWindowIsOpen: false
  };

  togglerModalWindow = () => {
    this.setState(({ modalWindowIsOpen }) => {
      modalWindowIsOpen = !this.state.modalWindowIsOpen;

      return {
        modalWindowIsOpen
      };
    });
  };

  closeModalWindow = () => [
    this.setState(({ modalWindowIsOpen }) => {
      modalWindowIsOpen = false;

      return {
        modalWindowIsOpen
      };
    })
  ];

  render() {
    return (
      <>
        <div className="PostCreator" onClick={this.togglerModalWindow}>
          <div className="PostCreator__create-icons" />
          <div className="PostCreator__title">CREATE NEW POST</div>
        </div>
        <ModalWindow
          addPost={this.props.addPost}
          modalWindowIsOpen={this.state.modalWindowIsOpen}
          closeModalWindow={this.closeModalWindow}
        />
      </>
    );
  }
}
