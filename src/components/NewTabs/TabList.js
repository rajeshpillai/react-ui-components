import React, { Component } from 'react';
import ReactDOM from "react-dom"
export default class TabList extends Component {
    render() {
      return (
        <div className="tabs">
          {this.props.children}
        </div>
      );
    }
  }