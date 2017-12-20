import React, { Component } from 'react';
import ReactDOM from "react-dom";


var newData = {
    data: 'Special greeting from HOC'
}
var SpecialGreeting = WrappedComponent => class extends React.Component {
    componentDidMount() {
        this.setState({
            data: newData.data
        })
    }

    render() {
        return (
            <WrappedComponent {...this.props} {...this.state} />
        )
    }
}

export default SpecialGreeting;