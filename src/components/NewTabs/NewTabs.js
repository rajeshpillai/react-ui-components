import React, { Component } from 'react';
import ReactDOM from "react-dom"

const styles = {}

styles.tab = {
  display: "inline-block",
  padding: 10,
  margin: 10,
  borderBottom: "4px solid",
  borderBottomColor: "#ccc",
  cursor: "pointer"
}

styles.activeTab = {
  ...styles.tab,
  borderBottomColor: "#000"
}

styles.panel = {
  padding: 10
}

export default class NewTabs extends Component {
  render() {
    return this.props.children;
  }
}



