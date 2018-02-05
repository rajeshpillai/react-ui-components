
import React from 'react';

export default class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.mine = props.mine ? true : false;
        this.position = props.position;
        this.neighborCount  = props.neighborCount;
        this.reveal = false;
    }

    onCellClick(e) {
        this.props.onCellClick(this);
    }

    render() {
        let index = this.props.index;
        return (
            <div className="cell" 
              onClick={(e)=>{this.onCellClick(e)}}>
              {this.reveal && this.neighborCount}
              { this.mine &&  <span className="mine">&#x26AB;</span>}
            </div>
        );
    }
}