import '../index.css';
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

export default class Tabs extends React.Component {
  state = {
    activeIndex: 0
  }

  selectTabIndex(activeIndex) {
    this.setState({ activeIndex })
  }

  renderTabs() {
    const { data, disabled } = this.props
    const { activeIndex } = this.state
   
    return data.map((tab, index) => {
      const isActive = index === activeIndex
      const isDisabled = disabled.includes(index)
      const style = isActive ? styles.activeTab : styles.tab
      return (
        <div
          key={tab.id}
          className= {isDisabled
            ? 'tab disabled' 
            : isActive
                ? 'tab active'
                : 'tab'  
          }
          style={style}
          onClick={isDisabled ? null : () => this.selectTabIndex(index)}
        > {tab.label}</div>
      )
    });
  }  
  
  renderPanel() {
      const {data} = this.props;
      const {activeIndex} = this.state;
      return <div>{data[activeIndex].content}</div>
  }

  render() {
    const {tabsOnBottom} = this.props;

    const tabs = (
        <div className="tabs">
            {this.renderTabs()}
        </div>
    );
    const panels = (
        <div className="panels"  style={styles.panel}>
          {this.renderPanel()}
        </div>
    );

    return (
      <div className="Tabs">
        {tabsOnBottom ? [panels, tabs] : [tabs, panels]}
      </div>
    )
  }
}

