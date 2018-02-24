import React, { Component } from 'react';
import ReactDOM from "react-dom"
import Photo from './components/Photo';
import Modal from './components/Modal';
import withModal from './components/HOC/withModal';
import SlideShow from './components/SlideShow';

export default class AppSimple extends React.Component {
  state = {
    images: [
      {id: 1, url: "http://lorempixel.com/400/200/sports/", timeout:10000},
      {id: 2, url: "http://lorempixel.com/400/200/animals/",timeout:0},
      {id: 3, url: "http://lorempixel.com/400/200/business/",timeout:10000},
      {id: 4, url: "http://lorempixel.com/400/200/cats/",timeout:0},
      {id: 5, url: "http://lorempixel.com/400/200/abstrat/",timeout:0},
      {id: 6, url: "http://lorempixel.com/400/200/city/",timeout:0},
      {id: 7, url: "http://lorempixel.com/400/200/nature/",timeout:0},
      {id: 8, url: "http://lorempixel.com/400/200/transport/"},
      {id: 9, url: "http://lorempixel.com/400/200/fashion/"},
    ]
  }

  render() {
    return (
      <SlideShow slides = {this.state.images}/>
    )
  }
}

