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
        descending: false
    }

    _sort=(e) => {
        var data = this.state.data;
        var column = e.target.cellIndex;
        var descending = this.state.sortby === column && !this.state.descending;
        data.sort((a,b) => {
            return descending
                ? a[column] < b[column]
                :a[column] > b[column];
        });

        this.setState({
            data: data,
            sortby: column,
            descending
        });
    }
    render() {
        var {headers,data} = this.state;
        var headerView = headers.map((header, index) => {
            if (this.state.sortby === index) {
                header += this.state.descending ? '\u2191': '\u2193'
            }
            return (
                <th>
                    {header}
                </th>
            )
        });

        var contentView = data.map((row) => {
            return <tr>
                {row.map((col) => {
                    return <td>{col}</td>
                })}
            </tr>
        });
        return (
            <table border="1">
                <thead onClick={this._sort}>
                    <tr>
                        {headerView}
                    </tr>
                </thead>
                <tbody>
                    
                    {contentView}
                </tbody>
            </table>
        );
    }
}