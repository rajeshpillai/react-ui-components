import React, { Component } from 'react';
import ReactDOM from "react-dom"
import Excel from './components/Excel/Excel';
import ExcelOnline from './components/Excel/ExcelOnline';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      headers: [
        {title:"name",index: 0},
        {title:"age",index: 1},
        {title:"qualification",index:2},
        {title:"rating",index:3}
      ],
      data: [
          ["a", 29, "B.Com",3],
          ["b", 49, "B.Tech",2],
          ["c", 33, "B.Sc",4]
        ]
    }

    for(var i = 1; i <= 15; i ++) {
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

