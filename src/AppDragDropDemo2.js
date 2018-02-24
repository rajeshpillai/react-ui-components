import React, { Component } from 'react';
import ReactDOM from "react-dom"

import './App.css';

export default class AppDragDropDemo extends React.Component {
  state = {
    tasks: [
      {name:"Angular",category:"wip", bgcolor: "yellow"},
      {name:"React", category:"wip", bgcolor:"pink"},
      {name:"Vue", category:"complete", bgcolor:"skyblue"}
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

    var tasks = this.state.tasks;

    var tasks = tasks.filter((task) => {
      if (task.name == id) {
        task.category = cat;
      }
      return task;
    });

    this.setState({
      ...this.state ,
      tasks
    });
  }

  render() {
    var tasks={wip: [], complete:[]}
    this.state.tasks.forEach((b) => {
        tasks[b.category].push(
          <div key={b.name} draggable className="draggable"
                style={{backgroundColor: b.bgcolor}}
            onDragStart={(e) => this.onDragStart(e, b.name)}
            >
            {b.name}
          </div>
        );
    });

    console.log(tasks);
    return (
      <div className="container-drag">
        <h2 className="header">Drag Drop Demo</h2>
        <div className="wip" onDrop={(e) =>{this.onDrop(e, "wip")}}
            onDragOver={(e)=>this.onDragover(e)}>
            <span className="task-header">WIP</span>
           {tasks.wip}
        </div>

        <div className="droppable"
            onDrop={(e) =>{this.onDrop(e, "complete")}}
            onDragOver={(e)=>this.onDragover(e)}>
          <span className="task-header">COMPLETED</span>
          {tasks.complete}
        </div>
      </div>
    )
  }
}
