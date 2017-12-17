import React, { Component } from 'react';
import ReactDOM from "react-dom"
import Tabs from './components/Tabs';
import {NewTabs, Tab, TabList, TabPanels, TabPanel} from './components/NewTabs/index';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Countries</h1>
        <Tabs data={this.props.countries}  
            tabsOnBottom={true}
            disabled={[1]}
        />

        <hr/>

        <NewTabs>
          <TabList>
            <Tab>Tab 1</Tab>
            <Tab>Tab 2</Tab>
            <Tab>Tab 3</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>Content 1</TabPanel>
            <TabPanel>Content 3</TabPanel>
            <TabPanel>Content 3</TabPanel>
          </TabPanels>
        </NewTabs>

      </div>
    )
  }
}

