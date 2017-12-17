import React, { Component } from 'react';
import ReactDOM from "react-dom";

const styles = {}


styles.activeTab = {
  ...styles.tab,
  borderBottomColor: "#000"
}

styles.panel = {
  padding: 10
}

export default class TabPanels extends Component {
    render() {
      const activeIndex = this.props.activeIndex;
      return (
        <div className="panels"  style={styles.panel}>
          {this.props.children[activeIndex]}
        </div>
      );
    }
  }
  