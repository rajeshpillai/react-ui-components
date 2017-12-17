import React, { Component } from 'react';
import ReactDOM from "react-dom";

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


export default class Tab extends Component {

  render() {
    const isActive = false;
    const isDisabled = false;
    const style = isActive ? styles.activeTab : styles.tab;
    return (
      <div
        className= {isDisabled
          ? 'tab disabled' 
          : isActive
              ? 'tab active'
              : 'tab'  
        }
        style={style}
        onClick={isDisabled ? null : () => this.selectTabIndex()}
      > {this.props.children}</div>
    )
  }
}