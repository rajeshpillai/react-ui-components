import React from 'react';

export default class SelectList extends React.Component {
    onClick = (e, data) => {
        this.props.onListChange(data);
    }
    render() {
        var popup = this.props.data.map((m) => {
            return (
                <div key={m}>
                    <a
                        onClick={(e) => { this.onClick(e, m) }}
                        href="#"
                    >
                        {m}
                    </a>
                </div>
            );
        });
        const position = {
            position: "absolute",
            top: this.props.mouse.y + 30,
            left: this.props.mouse.x
        }
        return (
            <div className="month-popup">
                {popup}
            </div>
        );
    }
}
