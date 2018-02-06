
import React from 'react';

export default class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.mine = props.mine ? true : false;
        this.position = props.position;
        this.neighborCount  = props.neighborCount;
    }

    onCellClick(e) {
        this.props.onCellClick(this);
    }

    render() {
        let index = this.props.index;
        let mine = this.props.mine;
        let revealed = this.props.revealed;
        let neighCount = this.props.neighborCount;
        return (
            <div className="cell {revealed ? 'revealed': ''}" 
              onClick={(e)=>{this.onCellClick(e)}}>
              {revealed && neighCount}
              { (mine && revealed )&&  <span className="mine">&#x26AB;</span>}
            </div>
        );
    }
}