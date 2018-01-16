import React, { Component } from 'react';
import ReactDOM from "react-dom";
import LazyLoad from "./components/LazyLoad";

export default class AppLazyLoad extends React.Component {
  constructor() {
    super();
    this.state = {
      images: [
        {url:"http://lorempixel.com/400/200/sports/",timeout:10000},
        {url:"http://lorempixel.com/400/200/animals/",timeout:5000},
        {url:"http://lorempixel.com/g/400/200/",timeout:20000}
      ]
    }

    var data = [];
    for(var i = 1; i <= 10; i ++) {
      data.push({
        url: "http://lorempixel.com/400/200/animals/",
        timeout: 10000,
      });
    }
    this.state.images = [...this.state.images, ...data]
  }

  render() {
      var i = 0;

      return (
        <div className="App">
           <LazyLoad data={this.state.images} />
        </div>
      );
  }
}

