import React, { Component } from 'react';
import ReactDOM from "react-dom";
import specialGreeting from './SpecialGreeting';

class Greeting extends Component {
    render() {
        return (
            <div>
                <h1>{this.props.data}</h1>
            </div>
        );
    }
}

export default specialGreeting(Greeting);