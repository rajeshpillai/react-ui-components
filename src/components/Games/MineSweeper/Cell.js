
import React from 'react';
import If from '../../Core/If';

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
        let showMine = (mine && revealed);
        let won = this.props.won;
        let isDebug = this.props.debug;
        return (
            <div className={"cell " + (revealed ? "revealed": "")} 
              onClick={(e)=>{this.onCellClick(e)}}>
              {revealed && neighCount}
              <If condition = {showMine && won}>
                 <span className="mine">&#x26F3;</span>
              </If>
              <If condition = {showMine && !won}>
                  <span className="mine">&#x26C7;</span>
                  
              </If>   
              { isDebug && <span>{mine.toString()}</span> }
            </div>
        );
    }
}