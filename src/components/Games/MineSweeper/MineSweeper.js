
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
        for(let i = 0; i < 10; i++) {
            for(let j = 0; j <10; j++) {
                let m = Math.random(1);
                grid[i][j] = {
                    random: m,
                    mine: m < 0.2 ? true: false,
                    position: {
                        x: i,
                        y: j
                    }
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
        cell.neighborCount  = neighborCount ;
    }

    reveal(cell, x, y) {
        let grid = this.state.grid;
        console.log("Revealing: ", cell.position.x, cell.position.y);

        cell.revealed = true;
        grid[x][y]= cell;
        this.setState({
            grid: grid
        });
        if (cell.neighborCount == 0) {
            this.floodFill(grid, x, y);
        }
    }

    
    onCellClick(cell) {
        if (cell.mine) {
            alert("You lost..");
        }
        console.log("state: ", this, cell);
        let c = this.state.grid[cell.position.x][cell.position.y];
        this.reveal(c, cell.position.x, cell.position.y);
    }

    render() {
        let grid = this.state.grid;
        console.log("grid: ", grid);
        var rows = grid.map((item,i) =>{
            var entry = item.map((element,j) => {
             let mine = element.random < 0.5 ? true: false;
              return (
                <td>
                    <Cell  
                     onCellClick = {(e)=>{this.onCellClick(e)}}
                     revealed = {element.revealed}
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