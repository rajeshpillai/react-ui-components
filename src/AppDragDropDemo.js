import React, { Component } from 'react';
import ReactDOM from "react-dom"

import './App.css';

export default class AppDragDropDemo extends React.Component {
  state = {
    boxes: [
      {name:"yellow",category:"wip"}, 
      {name:"red", category:"wip"},
      {name:"green", category:"complete"}
    ]
  }

  onDragStart = (ev, id) => {
    console.log('dragstart:',id);
    ev.dataTransfer.setData("id", id);
  }

  onDrag = (ev, id) => {
    console.log('drag:',id);
  }

  onDragover = (ev) => {
    ev.preventDefault();
  }


  onDrop = (ev, cat) => {
    ev.preventDefault();
    var id = ev.dataTransfer.getData("id");
    console.log(`DROPPED task ${id} at ${cat}`);
   
    var boxes = this.state.boxes;

    var boxes = boxes.filter((task) => {
      if (task.name == id) {
        task.category = cat;
      }
      return task;
    });

    this.setState({     
      ...this.state ,
      boxes
    });
  }

  render() {
    var boxes={wip: [], complete:[]}
    this.state.boxes.forEach((b) => {
        boxes[b.category].push(
          <div key={b.name} draggable className="draggable"
                style={{backgroundColor: b.name}}
            onDragStart={(e) => this.onDragStart(e, b.name)}
            >
          </div>
        );
    });

    console.log(boxes);
    return (
      <div>
        <h2>Drag Drop Demo</h2>
        <div className="wip" onDrop={(e) =>{this.onDrop(e, "wip")}}
            onDragOver={(e)=>this.onDragover(e)}>
           {boxes.wip}
        </div>

        <div className="droppable" 
            onDrop={(e) =>{this.onDrop(e, "complete")}}
            onDragOver={(e)=>this.onDragover(e)}>
        drop here
          {boxes.complete}
        </div>
      </div>
    )
  }
}