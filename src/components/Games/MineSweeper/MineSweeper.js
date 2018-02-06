
import React from 'react';
import Cell from './Cell';
import {make2DArray} from './utils.js';
import './minesweeper.css';

export default class MineSweeper extends React.Component {
    width = 200;
    height = 200;
    cols = 10;
    rows = 10;
    target = 0;
    
    state = {
        grid:  [],
        won: false,
        target: 0        
    }
    

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.initGame();
    }

    initGame() {
        let grid = make2DArray(10,10);
        this.target = 0;

        this.setState({
            loading: true
        });
        
        for(let x = 0; x < this.cols; x++) {
            for(let y = 0; y < this.rows; y++) {
                let m = Math.random(1);
                let isMine = m < 0.95 ? true: false; // 20% of blocks has mines
                grid[x][y] = {
                    random: m,
                    mine: isMine,  
                    position: {
                        x: x,
                        y: y
                    }
                };

                if (!isMine) {
                    this.target++;
                }
            }
        }
        for (let x = 0; x < this.cols; x++) {
            for (let y = 0; y < this.rows; y++) {
              this.countMines(grid,x,y);
            }
        }
        this.setState({
            grid,
            won: true
        }, ()=> {
            this.setState({
                loading: false,
                target: this.target
            })
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
        let grid = [...this.state.grid];
        console.log("Revealing: ", cell.position.x, cell.position.y);

        cell.revealed = true;
        
        this.target--;

        if (this.target == 0) {
            // won
            this.gameOver(true);
            return;
        }

        grid[x][y]= cell;
        if (cell.neighborCount == 0) {
            this.floodFill(grid, x, y);
        }
        
        this.setState({
            grid: grid,
            target: this.target,
            won: this.target <= 0
        });
    }

    gameOver(won) {
        let grid = [...this.state.grid];

        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
              grid[x][y].revealed = true;
              grid[x][y].won = this.target <= 0;
            }
        }
        this.setState({
            grid,
            won: this.target <= 0
        });
    }
    
    onCellClick(cell) {
        if (cell.mine) {
            this.gameOver(false);
            alert("You lost..");
            return;
        }
        this.setState({
            target: this.state.target -1
        });
        console.log("neighbour: ", cell.neighborCount);
        this.reveal(cell, cell.position.x, cell.position.y);
    }

    onReset() {
        this.initGame();
    }

    render() {
        let grid = this.state.grid;
        let won = this.state.won;
        let loading = this.state.loading;
        let target = this.state.target;
        let smiley = won ? "🙂" : "🙁";

        var rows = grid.map((item,i) =>{
            var entry = item.map((element,j) => {
             let mine = element.random < 0.5 ? true: false;
             let flag = element.won;
              return (
                  <td  key={i+j} >
                    <Cell  
                     onCellClick = {(e)=>{this.onCellClick(e)}}
                     revealed = {element.revealed}
                     mine={element.mine} 
                     position={{y:j, x:i}}
                     won={flag}
                     neighborCount ={element.neighborCount}
                     index={j}/>
                </td>);
            });
            return (
                <tr key={i}>{entry}</tr>
             );
        });

        let gameUI =  (
            <div>
                {target} -> {this.target == 0 && <span>You won!</span>}
                <header className="header">Minesweepr classic 
                        <span className="reset" 
                            onClick={(e)=>{this.onReset(e)}}>{smiley}
                        </span>
                </header>
                <table>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        );

        let gameView = loading ? "<h2>loading...</h2>" : gameUI;

        return (
            gameView
        );
    }
}