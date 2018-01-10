import React from 'react';

// Refer Excel.js for full code (This was for live demo)
export default class ExcelOnline extends React.Component {
    state = {
        headers: this.props.model.headers,
        data: this.props.model.data,
        sortby: null,
        descending: false
    }

    _preSearchData = null

    _log = []

    logSetState = (newState) => {
        // remember the old state in a clone
        if (this._log.length === 0) {
            this._log.push(JSON.parse(JSON.stringify(this.state)));
        }
        this._log.push(JSON.parse(JSON.stringify(newState)));
        this.setState(newState);

    }

    constructor(props) {
        super(props);
    }

    header = (headers) => {
        return headers.map((header, idx) => {
            if (this.state.sortby === idx) {
                header += this.state.descending ? '\u2191': '\u2193'
            }
            return <th>{header}</th>
        });
    }

    save = (e) => {
        e.preventDefault();
        var input = e.target.firstChild;

        // Clone the data
        var data = this.state.data.slice();

        // Update the data
        data[this.state.edit.row][this.state.edit.cell] = input.value;

        // Update state
        this.logSetState({
            edit: null, // done editing
            data: data
        });

    }


    search = (e) => {
        var needle = e.target.value.toLowerCase();
        console.log(`searching for ${needle}...`, this._preSearchData);
        if (!needle) {
            this.logSetState({
                data: this._preSearchData
            })
            return;
        }
        var idx = e.target.dataset.idx;
        console.log("Search index: ", idx);
        var searchdata = this._preSearchData.filter((row) => {
            return row[idx].toString().toLowerCase().indexOf(needle) > -1;
        });

        console.log("found results: ", searchdata);
        this.logSetState({
            data: searchdata
        });
    }


    renderSearch = () => {
        if (!this.state.search) {
            return null;
        }
        return (
            <tr onChange={this.search}>
                {this.state.headers.map((_ignore, idx) => {
                    return (<td key={idx}>
                            <input type="text" data-idx={idx} />
                        </td>
                    );
                })}
            </tr>
        );
    }

    toggleSearch = () => {
        if (this.state.search) {
            this.logSetState({
                data: this._preSearchData,
                search: false
            });
            this._preSearchData = null;
        } else {
            this._preSearchData = this.state.data;
            this.logSetState({
                search: true
            });
        }
    }


    renderToolbar = () =>{
        return (
            <div className="toolbar">
                <button 
                    onClick={this.toggleSearch}>search</button>
                <a onClick={(e) => {this._download(e,'json')}}
                    href="data.json">Export JSON</a>
                <a onClick={(e) => {this._download(e,'csv')}}
                    href="data.json">Export CSV</a>
            </div>
        );
    }


    tableBody = (data) => {
        var edit = this.state.edit;
        return data.map((row, rowIdx) => {
            return <tr key={rowIdx}>
                 {row.map((col, colIdx) => {
                    let content = col;
                    if (edit && edit.row === rowIdx && edit.cell===colIdx) {
                        content = <form onSubmit={this.save}>
                            <input type="text" defaultValue={content} />
                        </form>
                    }
                    return (
                        <td data-row={rowIdx} key={colIdx}>{content}</td>
                    );
                })}
            </tr>
        })
    }

    sort = (e) => {
        var data = this.state.data.slice();
        var column = e.target.cellIndex;

        console.log(this.state.sortby, this.state.descending, column);
        var descending = this.state.sortby === column && !this.state.descending;
        data.sort((a,b) => {
            var sortVal = 0;
            if (a[column] < b[column]) {
                sortVal = -1;
            } else if (a[column] > b[column]){
                sortVal = 1;
            }
            if (descending) {sortVal = sortVal * -1;}
            return sortVal;
        });

        this.logSetState({
            data: data,
            sortby: column,
            descending
        });
    }

    showEditor = (e) => {
        this.logSetState({ 
            edit: {
                row: parseInt(e.target.dataset.row, 10),
                cell: e.target.cellIndex
            }
        });
    }

    replay = () => {
        console.log("replaying...", this._log);
        if (this._log.length === 0) {
            console.warn("No state to replay yet");
            return;
        }
        var idx = -1;
        var interval = setInterval (() => {
            idx++;
            if (idx === this._log.length -1) {
                clearInterval(interval);
            }
            this.setState(this._log[idx]);
        }, 1000);
    }


    componentDidMount() {
        document.onkeydown = (e) => {
            if (e.altKey && e.shiftKey && e.which === 82) { // ALT+SHIFT+R(eplay)
             this.replay();
            }
        }
    }

    render() {
        var {headers, data} = this.state;
        console.log(headers);
        return (
            <div>
            <h2>Excel Online</h2>
                {this.renderToolbar()}
                <table className="data-table" border="1">
                    <thead onClick={this.sort}>
                        <tr>
                            {this.header(headers)}
                        </tr>
                    </thead>
                    <tbody onDoubleClick={this.showEditor}>
                        {this.renderSearch()}
                        {this.tableBody(data)}
                    </tbody>
                </table>
            </div>
        );
    }
}