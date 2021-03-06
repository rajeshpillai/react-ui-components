import React, { Component } from 'react';
import ReactDOM from "react-dom"
import DataTable from './components/DataTable/DataTable';
import If from './components/Core/If';
import InputTag from './components/InputTag';
import Calendar from './components/Calendar';
import Modal from './components/Modal';
import Input from './components/Input';
import MineSweeper  from './components/Games/MineSweeper/MineSweeper';
import {required,email,noDuplicate} from './Validators';
import './App.css';

import {increment} from './actions/counter';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.store = props.store;
    console.log("ctor: ", props);
    this.state = {
      headers: [
        {title:"Name",accessor: "name", width: 300, index: 0},
        {title:"Age",accessor: "age",index: 1},
        {title:"Qualification",accessor: "qualification",index:2},
        {title:"Rating",accessor: "rating",index:3, cell: row => (
          <div style={{
              backgroundColor: "yellow",
              width: row * 10 + "px"
          }}>
            {row}
          </div>
        )},
        {title:"Profile",accessor:"profile", width: 200, index:4,cell:{
          type: "image",
          style: {
            "width": "50px",
          }
        }}
      ],
      data: [
          {name:"a", age:29, qualification:"B.Com",rating:3,profile: "./img/img1.jpg"},
          {name:"b", age:35, qualification:"B.Sc",rating:2,profile:"./img/img2.jpg"},
          {name:"c", age:42, qualification:"B.E",rating:3,profile:"./img/img3.jpeg"},
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

  showModal = () => {
    this.setState({
      ...this.state,
      show: !this.state.show
    })
  }

  onClick = (e) => {
    //this.store.dispatch({ type: 'INCREMENT' });
    this.store.dispatch(increment());
    console.log("store: ", this.store.getState());
  }

  render() {
      var i = 0;

      return (
        <div className="App">

         <input type="button" value= "click me"
            onClick={(e) => this.onClick(e)} />

          <h3>Tags:</h3>
          <InputTag placeholder="please enter tag separated by space" />

          <input type="button"
            onClick={this.showModal}
            value="Show Modal"/>

          <Modal show={this.state.show} onClose={this.showModal}>
              Hello Modal!
          </Modal>

          <br/>

          <div>
            <label for="username">Username</label>
            <Input
              name="username"
              placeholder="enter username"
              validations={[required]}/>
          </div>

          <div>
            <label for="email">Email</label>
            <Input
              name="email"
              placeholder="enter some text"
              validations={[required, email,noDuplicate]}/>
          </div>

          {/* <If condition={1 == 1}>
            {"Hello world"}
         </If>

         <If condition={1 == 2}>
           {"This is not outputted"}
         </If>
        */}
          <h3>Excel online</h3>
          <DataTable headers={this.state.headers} data={this.state.data} noData="No records!" />
        </div>
      );
  }
}
