import React, { Component } from 'react';
import ReactDOM from "react-dom"
import Tabs from './components/Tabs';
import {NewTabs, Tab, TabList, TabPanels, TabPanel} from './components/NewTabs/index';
import {DataTabs} from './components/DataTabs/index';
import Photo from './components/Photo';
import withBorder from './components/HOC/withBorder';
import withDashedBorder from './components/HOC/withDashedBorder';
import withMouse from './components/HOC/withMouse';
import withCat from './components/HOC/withCat';

class AppWithMouse extends React.Component {
  render() {
    var PhotoBorder = withDashedBorder(withBorder(Photo));
    var mouse = this.props.mouse;
    return (
      <div>
        <PhotoBorder/>
        {mouse.x}, {mouse.y}
      </div>
    )
  }
}

export default withMouse(AppWithMouse);