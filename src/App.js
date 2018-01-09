import React, { Component } from 'react';
import ReactDOM from "react-dom"
import Excel from './components/Excel/Excel';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      headers: [
        "name",
        "age",
        "qualification",
        "rating"
      ],
      data: [
          ["a", "29", "B.Com",3],
          ["b", "49", "B.Tech",2],
          ["c", "33", "B.Sc",4]
        ]
    }

    for(var i = 1; i <= 20; i ++) {
      this.state.data.push([
        "name " + i,
        i + 18,
        "Graduate",
        (i%2 ? 3 : 4)
      ])
    }
  }

  render() {
      return (
        <div className="App">
          <h3>Excel online</h3>
        <Excel model={this.state} />
        </div>
      );
  }
}

