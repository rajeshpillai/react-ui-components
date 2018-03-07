import React, { Component } from 'react';
import ReactDOM from "react-dom";

import Calendar from "./components/Calendar";

const style = {
  position: "relative",
  margin: "50px auto",
}
export default class AppWithCalendar extends React.Component {
  constructor() {
    super();
    this.state = {
    }
  }

  onDayClick = (e, day) => {
    alert(day);
  }
  render() {
    return (
      <div className="App">
        <Calendar style={style} width="152px" onDayClick={(e, day) => this.onDayClick(e,day)}/>
      </div>
    );
  }
}

