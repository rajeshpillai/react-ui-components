import React, { Component } from 'react';
import ReactDOM from "react-dom"
import * as PropTypes from 'prop-types';

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
  state = {
    activeIndex: 0
  }

  static childContextTypes =  {
   activeIndex: PropTypes.number.isRequired,
   onSelectTab: PropTypes.func.isRequired
  }

  getChildContext() {
    return {
      activeIndex: this.state.activeIndex,
      onSelectTab: this.selectTabIndex
    }
  }
  selectTabIndex = (activeIndex) => {
    this.setState({ activeIndex })
  }

  render() {
    return (
    <div className="Tabs">
      {this.props.children}
    </div>
    )
  }
}



