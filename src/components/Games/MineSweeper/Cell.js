
import React from 'react';

export default class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.mine = props.mine ? true : false;
        this.position = props.position;
        this.neighborCount  = props.neighborCount;
        this.revealed = props.revealed;
    }

    onCellClick(e) {
        this.props.onCellClick(this);
    }

    render() {
        let index = this.props.index;
        let revealed = this.props.revealed;
        let neighCount = this.props.neighborCount;
        return (
            <div className="cell" 
              onClick={(e)=>{this.onCellClick(e)}}>
              {revealed && neighCount}
              { this.mine &&  <span className="mine">&#x26AB;</span>}
            </div>
        );
    }
}