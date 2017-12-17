import React, { Component } from 'react';
import ReactDOM from "react-dom"

import {NewTabs, Tab, TabList, TabPanels, TabPanel} from '../NewTabs/index';

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

export default class DataTabs extends Component {
  render() {
    const {data} = this.props;
    return (
      <NewTabs>
        <TabList>
          {data.map(tab => (
              <Tab>{tab.label}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {data.map(tab => (
            <TabPanel>{tab.content}</TabPanel>
          ))}
        </TabPanels>

      </NewTabs>

    );
  }
}



