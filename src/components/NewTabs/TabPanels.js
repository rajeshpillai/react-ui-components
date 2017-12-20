import React, { Component } from 'react';
import ReactDOM from "react-dom";
import * as PropTypes from 'prop-types';

const styles = {}


styles.activeTab = {
  ...styles.tab,
  borderBottomColor: "#000"
}

styles.panel = {
  padding: 10
}

export default class TabPanels extends Component {
  static contextTypes = {
    activeIndex: PropTypes.number.isRequired
  }
  render() {
      const activeIndex = this.context.activeIndex;
      return (
        <div className="panels"  style={styles.panel}>
          {this.props.children[activeIndex]}
        </div>
      );
    }
  }
  