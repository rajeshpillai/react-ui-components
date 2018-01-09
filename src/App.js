import React, { Component } from 'react';
import ReactDOM from "react-dom"
import Excel from './components/Excel/Excel';

export default class App extends React.Component {
  render() {
    var data = {
      headers: [
        "name",
        "age",
        "qualification"
      ],
      data: [
          ["a", "29", "B.Com"],
          ["b", "49", "B.Tech"],
          ["c", "33", "B.Sc"]
        ]
    }
    return (
      <div>
        <h3>Excel online</h3>
       <Excel model={data} />
      </div>
    );
  }
}

