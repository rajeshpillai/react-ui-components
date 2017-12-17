import React, { Component } from 'react';
import ReactDOM from "react-dom"
export default class TabList extends Component {
    render() {
      const {activeIndex} = this.props;
      const children = React.Children.map(this.props.children, (child, index) => {
        return React.cloneElement(child, {
          isActive: index === activeIndex,
          onSelect: () => {this.props.onSelectTab(index)}
        });
      })
      return (
        <div className="tabs">
          {children}
        </div>
      );
    }
  }