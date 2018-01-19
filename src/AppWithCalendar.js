import React, { Component } from 'react';
import ReactDOM from "react-dom";

import Calendar from "./components/Calendar";

export default class AppWithCalendar extends React.Component {
  constructor() {
    super();
    this.state = {
    }
  }

  render() {
      return (
        <div className="App">
           <Calendar  />
        </div>
      );
  }
}

