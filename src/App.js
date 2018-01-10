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
          {name:"a", age:29, qualification:"B.Com",rating:3},
          {name:"b", age:35, qualification:"B.Sc",rating:2},
          {name:"c", age:42, qualification:"B.E",rating:3},
        ]
    }

    for(var i = 1; i <= 15; i ++) {
      this.state.data.push({
        name: "name " + i,
        age: i + 18,
        qualification: "Graduate",
        rating: (i%2 ? 3 : 4)
      })
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

