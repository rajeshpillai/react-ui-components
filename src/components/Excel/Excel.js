import React from 'react';

export default class extends React.Component {
    constructor(props) {
        console.log(props);
        super(props);
    }

    state = {
        headers: this.props.model.headers,
        data: this.props.model.data
    }

    _sort=(e) => {
        var data = this.state.data;
        var column = e.target.cellIndex;
        data.sort((a,b) => {
            return a[column] > b[column];
        });

        this.setState({
            data: data
        });
    }
    render() {
        var {headers,data} = this.state;
        var headerView = headers.map((header) => {
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