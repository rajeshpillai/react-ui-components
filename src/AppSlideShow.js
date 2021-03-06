import React, { Component } from 'react';
import ReactDOM from "react-dom"
import Photo from './components/Photo';
import Modal from './components/Modal';
import withModal from './components/HOC/withModal';
import SlideShow from './components/SlideShow';

export default class AppSimple extends React.Component {
  state = {
    images: [
          {id: 1, url: "https://loremflickr.com/300/300/dog"},
          {id: 2, url: "https://loremflickr.com/300/300/cat"},
          {id: 3, url: "https://loremflickr.com/300/300/cat"},
          {id: 4, url: "https://loremflickr.com/300/300?random=1"},
          {id: 5, url: "https://loremflickr.com/300/300?random=2"},
          {id: 6, url: "https://loremflickr.com/300/300?random=1"},
          {id: 7, url: "https://loremflickr.com/300/300?random=1"},
          {id: 8, url: "https://loremflickr.com/300/300?random=1"},
          {id: 9, url: "https://loremflickr.com/300/300?random=1"},
          {id: 10, url: "https://loremflickr.com/300/300?random=1"}
        ]
  }

  render() {
    return (
      <SlideShow slides = {this.state.images}/>
    )
  }
}

