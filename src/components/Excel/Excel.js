import React from 'react';

export default class extends React.Component {
    constructor(props) {
        console.log(props);
        super(props);
    }

    state = {
        model: this.props.model
    }

    render() {
        var {headers,data} = this.state.model;
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
                <thead>
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