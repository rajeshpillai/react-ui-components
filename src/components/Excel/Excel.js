import React from 'react';

export default class extends React.Component {
    constructor(props) {
        console.log(props);
        super(props);
    }

    state = {
        headers: this.props.model.headers,
        data: this.props.model.data,
        sortby: null,
        descending: false,
        edit: null, // {row: index, cell: index}
        search: false
    }

    _preSearchData = null

    sort=(e) => {
        var data = this.state.data.slice();
        var column = e.target.cellIndex;
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

        console.log("SORTED: BY:", column, data);
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

    search = (e) => {
        var needle = e.target.value.toLowerCase();
        if (!needle) {
            this.logSetState({
                data: this._preSearchData
            })
            return;
        }
        var idx = e.target.dataset.idx;
        var searchdata = this._preSearchData.filter((row) => {
            return row[idx].toString().toLowerCase().indexOf(needle) > -1;
        });
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

    _log = []

    logSetState = (newState) => {
        // remember the old state in a clone
        if (this._log.length === 0) {
            this._log.push(JSON.parse(JSON.stringify(this.state)));
        }
        this._log.push(JSON.parse(JSON.stringify(newState)));
        this.setState(newState);
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

    download = (e, format) => {
        var contents = format === 'json'?
            JSON.stringify(this.state.data)
            : this.state.data.reduce((result, row) => {
                return result
                    + row.reduce((rowresult, cell, idx) => {
                        return rowresult 
                            + '"'
                            + cell.replace(/"/g, '""')
                            + '"'
                            + (idx < row.length - 1 ? ',' : '');
                    }, '')
                    + "\n";
                },'');
        var URL = window.URL || window.webkitURL;
        var blob = new Blob([contents], {type: 'text/' + format});
        e.target.href = URL.createObjectURL(blob);
        e.target.download = 'data.' + format;
    }

    renderToolbar = () =>{
        return (
            <div className="toolbar">
                <button 
                    onClick={this.toggleSearch}>search</button>
                <a onClick={(e) => {this.download(e,'json')}}
                    href="data.json">Export JSON</a>
                <a onClick={(e) => {this.download(e,'csv')}}
                    href="data.json">Export CSV</a>
            </div>
        );
    }

    renderTable = () => {
        var {headers,data} = this.state;
        var headerView = headers.map((header, index) => {
            if (this.state.sortby === index) {
                header += this.state.descending ? '\u2191': '\u2193'
            }
            return (
                <th key={index}>
                    {header}
                </th>
            )
        });

        var contentView = data.map((row, rowIdx) => {
            var edit = this.state.edit;
            return <tr key={rowIdx}>
                {row.map((col, idx) => {
                    let content = col;
                    if (edit && edit.row === rowIdx && edit.cell===idx) {
                        content = <form onSubmit={this.save}>
                            <input type="text" defaultValue={content} />
                        </form>
                    }
                    return <td key={idx} 
                        data-row={rowIdx}>{content}</td>
                })}
            </tr>
        });
        return (
            <table className="data-table" border="1">
                <thead onClick={this.sort}>
                    <tr>
                        {headerView}
                    </tr>
                </thead>
                <tbody onDoubleClick={this.showEditor}>
                    {this.renderSearch()}
                    {contentView}
                </tbody>
            </table>
        );
    }

    
    componentDidMount() {
        document.onkeydown = (e) => {
            if (e.altKey && e.shiftKey && e.which === 82) { // ALT+SHIFT+R(eplay)
             this.replay();
            }
        }
    }
    render() {
        return (
            <div>
             {this.renderToolbar()}
             {this.renderTable()}
            </div>
        )
    }
}