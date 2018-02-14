import React, { Component } from 'react';
import ReactDOM from "react-dom"
import Excel from './components/Excel/Excel';
import If from './components/Core/If';
import InputTag from './components/InputTag';

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

    var data = [];
    for(var i = 1; i <= 10; i ++) {
      data.push({
        name: "name " + i,
        age: i + 18,
        qualification: "Graduate",
        rating: (i%2 ? 3 : 4)
      })
    }
    this.state.data = [...this.state.data, ...data]
  }

  render() {
      var i = 0;

      return (
        <div className="App">
          <h3>Excel online</h3>
          <InputTag placeholder="please enter tag separated by space" />

          <If condition={1 == 1}>
            {"Hello world"}
         </If>

         <If condition={1 == 2}>
           {"This is not outputted"}
         </If>

          <Excel model={this.state} />

        </div>
      );
  }
}

