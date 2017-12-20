import React, { Component } from 'react';
import ReactDOM from "react-dom"
import Tabs from './components/Tabs';
import {NewTabs, Tab, TabList, TabPanels, TabPanel} from './components/NewTabs/index';
import {DataTabs} from './components/DataTabs/index';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h2>Old Tabs</h2>
        <Tabs data={this.props.countries}  
            tabsOnBottom={true}
            disabled={[1]}
        />

        <hr/>

        <h2>New Tabs</h2>
        <NewTabs>
          <div>
            <TabList>
              <Tab>Tab 1</Tab>
              <Tab isDisabled>Disabled Tab 2</Tab>
              <Tab>Tab 3</Tab>
            </TabList>
          </div>
          <div>
            <TabPanels>
              <TabPanel>Content 1</TabPanel>
              <TabPanel>Content 2</TabPanel>
              <TabPanel>Content 3</TabPanel>
            </TabPanels>
          </div>
        </NewTabs>

        <hr/>
        <h2>Data Tabs </h2>
        <DataTabs data={this.props.countries} />
      </div>
    )
  }
}

