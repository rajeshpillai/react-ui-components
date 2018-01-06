import React, { Component } from 'react';
import ReactDOM from "react-dom"
import Photo from './components/Photo';
import Modal from './components/Modal';
import withModal from './components/HOC/withModal';

export default class AppSimple extends React.Component {
  state = {
    isOpen: true
  }

  toggleModal = () => { 
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    var PhotoModal = withModal(Photo);
    return (
      <div>
        <PhotoModal/>
      </div>
    )
  }
}

