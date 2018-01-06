import React, { Component } from 'react';
import ReactDOM from "react-dom"
import Photo from './components/Photo';
import withBorder from './components/HOC/withBorder';
import withDashedBorder from './components/HOC/withDashedBorder';
import Mouse from './components/RenderProps/Mouse';

export default class AppWithRenderProps extends React.Component {
  render() {
    var PhotoBorder = Photo;
    return (
      <div>
        <PhotoBorder/>

        <Mouse render={(mouse) => (
          <h3>From mouse {mouse.x},{mouse.y}</h3>
        )} />

        {/* <Mouse>
          {mouse => (
            <h3>From mouse {mouse.x},{mouse.y}</h3>
          )}
        </Mouse> */}

      </div>
    )
  }
}
