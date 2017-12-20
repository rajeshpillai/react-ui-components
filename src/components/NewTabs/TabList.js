import React, { Component } from 'react';
import ReactDOM from "react-dom"
import * as PropTypes from 'prop-types';
export default class TabList extends Component {
  static contextTypes = {
    activeIndex: PropTypes.number.isRequired,
    onSelectTab: PropTypes.func.isRequired
  }  
  render() {
      const {activeIndex} = this.context;
      const children = React.Children.map(this.props.children, (child, index) => {
        return React.cloneElement(child, {
          isActive: index === activeIndex,
          onSelect: () => {this.context.onSelectTab(index)}
        });
      })
      return (
        <div className="tabs">
          {children}
        </div>
      );
    }
  }