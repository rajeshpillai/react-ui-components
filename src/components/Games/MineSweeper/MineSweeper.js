
import React from 'react';
import Cell from './Cell';
import './minesweeper.css';

export default class MineSweeper extends React.Component {
    width = 200;
    height = 200;
    
    state = {
        grid:  []
    }
    

    constructor(props) {
        super(props);
        let cellWidth = 50;
    }

    componentDidMount() {
        let grid = this.make2DArray(10,10);
        for(let i = 0; i < 10; i++) {
            for(let j = 0; j <10; j++) {
                let m = Math.random(1);
                grid[i][j] = {
                    random: m,
                    mine: m < 0.5 ? true: false
                };
                
              
            }
        }

        
        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < 10; j++) {
              this.countMines(grid,i,j);
            }
        }
        this.setState({
            grid
        });
    }

    countMines(grid, c, r) {
        let cell = grid[c][r];
        
        let neighborCount  = 0;

        if (cell.mine) {
            this.neighborCount = -1;
            return;
        }

        for(let x = -1; x <= 1; x++) {
            if (c+x < 0 ||c+x >= grid.length) {
                continue;
            }
               
            for(let y = -1; y <=1; y++) {
                if (r+y <0 || r+y >= grid.length) {
                    continue;
                }
                let ncell = grid[c+x][r+y];
                if (ncell.mine) {
                    neighborCount ++;
                }
            }
        }
        cell.neighborCount  = neighborCount ;
    }

    make2DArray(cols, rows) {
        let arr = new Array(cols);
        for(let i = 0; i < arr.length; i++) {
            arr[i] = new Array(rows);
        }
        return arr;
    }

    onCellClick(cell) {
        if (cell.mine) {
            alert("You lost..");
        } else {
            alert("Well done so far.."+ JSON.stringify(cell.position));
        }
    }

    render() {
        let grid = this.state.grid;
        var rows = grid.map((item,i) =>{
            var entry = item.map((element,j) => {
             let mine = element.random < 0.5 ? true: false;
              return (
                <td>
                    <Cell  
                     onCellClick = {this.onCellClick}
                     mine={element.mine} 
                     position={{y:i, x:j}}
                     neighborCount ={element.neighborCount}
                     key={i+j} 
                     index={j}/>
                </td>);
            });
            return (
                <tr key={i}>{entry}</tr>
             );
        });

        return (
            <table>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
}