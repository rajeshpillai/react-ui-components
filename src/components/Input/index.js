import React from 'react';
import PropTypes from 'prop-types';
import {required,email} from '../../Validators';

export default class Input extends React.Component {
    constructor(props) {
        super(props);
        this.name = this.props.name;

        this.state = {
            [this.name] : "",
            validations: []
        }
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: this.input.value
        })
    }

    onBlur = (e) => {
        let validations = this.props.validations;

        let messages = [];
        validations.forEach((v) => {
            let result = v(this.state[this.name]);
            messages.push(result);
        });
        this.setState({
            validations: [...messages]
        })
    }

    render() {
        return (
            <div>
                <input  
                    name={this.props.name}
                    ref={(input) => this.input = input} 
                    onChange={(e) => this.onChange(e)} 
                    onBlur={(e) => this.onBlur(e)}
                    type="text" 
                    placeholder={this.props.placeholder} />
                <span>{this.state.validations}</span>
            </div>
        )
    }
}
