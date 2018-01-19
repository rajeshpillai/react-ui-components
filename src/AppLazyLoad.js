import React, { Component } from 'react';
import ReactDOM from "react-dom";
import LazyLoad from "./components/LazyLoad";
import './App.css';

import InputTag from "./components/InputTag";

export default class AppLazyLoad extends React.Component {
  constructor() {
    super();
    this.state = {
      images: [
        {url:"./img/img1.jpg",timeout:5000},
        {url:"./img/img2.jpg",timeout:5000},
        {url:"http://lorempixel.com/400/200/sports/",timeout:5000},
        {url:"http://lorempixel.com/400/200/animals/",timeout:5000},
        {url:"http://lorempixel.com/g/400/200/",timeout:5000}
      ]
    }

    var data = [];
    // for(var i = 1; i <= 10; i ++) {
    //   data.push({
    //     url: "http://lorempixel.com/400/200/animals/",
    //     timeout: 10000,
    //   });
    // }
    this.state.images = [...this.state.images, ...data]
  }

  render() {
      var i = 0;

      return (
        <div className="App">
           <InputTag placeholder="press space to create tags" />
           <h2>Images are lazy loaded using custom react component. Click on the 
             image to open in a modal.  This uses the withModal HOC that we built.
           </h2>
           <LazyLoad data={this.state.images} />
        </div>
      );
  }
}

