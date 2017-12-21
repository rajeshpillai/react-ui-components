import React, { Component } from 'react';
import ReactDOM from "react-dom";

const withCat = (Component) => {
    return class extends Component {
        state = {x: 'Hacked', y: 0}

        handleMouseMove = (event) => {
            this.setState({
                x: 'Hacked',
                y: event.clientY
            })
        }

        render (){
            return (
                <div onMouseMove={this.handleMouseMove}>
                    <Component {...this.props} mouse={this.state} />
                </div>
            )
        }
    }
}

export default withCat;