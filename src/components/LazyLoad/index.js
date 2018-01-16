import React from 'react';
import LazyComponent from './LazyComponent';

export default class LazyLoad extends React.Component {
    render() {
        var data = this.props.data.map((d) => {
            return <LazyComponent data={d} />
        });
        return (
            <div>
                 {data}
            </div>
        )
    }
}