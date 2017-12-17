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
  state = {
    activeIndex: 0
  }

  selectTabIndex = (activeIndex) => {
    this.setState({ activeIndex })
  }

  render() {
    const children = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        activeIndex: this.state.activeIndex,
        onSelectTab: this.selectTabIndex
      });
    })
    return (
    <div className="Tabs">
      {children}
    </div>
    )
  }
}



