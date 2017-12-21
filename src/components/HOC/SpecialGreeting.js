import React, { Component } from 'react';
import ReactDOM from "react-dom";


var newData = {
    data: 'Special greeting from HOC'
}
var specialGreeting = WrappedComponent => class extends React.Component {
    omponentDidMount() {
        this.setState({
            data: newData.data
        })
    }

    render() {
        return (
            <div>
            <h2>Special Greeting</h2>
             <WrappedComponent {...this.props} {...this.state} />
            </div>
        )
    }
}

export default specialGreeting;