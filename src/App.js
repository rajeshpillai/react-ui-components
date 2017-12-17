import React, { Component } from 'react';
import ReactDOM from "react-dom"
import Tabs from './components/Tabs';
export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Countries</h1>
        <Tabs data={this.props.countries} />
      </div>
    )
  }
}

