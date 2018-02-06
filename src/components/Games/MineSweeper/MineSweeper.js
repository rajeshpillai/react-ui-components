
import React from 'react';
import Cell from './Cell';
import {make2DArray} from './utils.js';
import './minesweeper.css';

export default class MineSweeper extends React.Component {
    width = 200;
    height = 200;
    
    state = {
        grid:  []
    }
    

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let grid = make2DArray(10,10);
        for(let x = 0; x < 10; x++) {
            for(let y = 0; y <10; y++) {
                let m = Math.random(1);
                grid[x][y] = {
                    random: m,
                    mine: m < 0.2 ? true: false,
                    position: {
                        x: x,
                        y: y
                    }
                };
            }
        }
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
              this.countMines(grid,x,y);
            }
        }
        this.setState({
            grid
        });
    }

    countMines(grid, x, y) {
        let cell = grid[x][y];
        
        let neighborCount  = 0;

        if (cell.mine) {
            this.neighborCount = -1;
            return;
        }

        for(let x1 = -1; x1 <= 1; x1++) {
            if (x+x1 < 0 ||x+x1 >= grid.length) {
                continue;
            }
               
            for(let y1 = -1; y1 <=1; y1++) {
                if (y+y1 <0 || y1+y1 >= grid.length) {
                    continue;
                }
                let ncell = grid[x+x1][y+y1];
                if (ncell == null) continue;
                if (ncell.mine) {
                    neighborCount ++;
                }
            }
        }
        cell.neighborCount  = neighborCount ;
    }

    floodFill(grid, c, r) {
        let cell = grid[c][r];
        console.log("Flood filling for ", c, r);
        
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
                if (!ncell.revealed) {
                    this.reveal(ncell, c+x, r+y);
                }
            }
        }
    }

    reveal(cell, x, y) {
        let grid = this.state.grid;
        console.log("Revealing: ", cell.position.x, cell.position.y);

        cell.revealed = true;
        grid[x][y]= cell;
        if (cell.neighborCount == 0) {
            this.floodFill(grid, x, y);
        }
        
        this.setState({
            grid: grid
        });
    }

    
    onCellClick(cell) {
        if (cell.mine) {
            alert("You lost..");
        }
        console.log("neighbour: ", cell.neighborCount);
        this.reveal(cell, cell.position.x, cell.position.y);
    }

    render() {
        let grid = this.state.grid;
        var rows = grid.map((item,i) =>{
            var entry = item.map((element,j) => {
             let mine = element.random < 0.5 ? true: false;
              return (
                  <td  key={i+j} >
                    <Cell  
                     onCellClick = {(e)=>{this.onCellClick(e)}}
                     revealed = {element.revealed}
                     mine={element.mine} 
                     position={{y:j, x:i}}
                     neighborCount ={element.neighborCount}
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