import React from 'react';
import LazyComponent from './LazyComponent';

export default class LazyLoad extends React.Component {
    render() {
        var data = this.props.data.map((d,i) => {
            return <LazyComponent key={i} data={d} />
        });
        return (
            <div>
                 {data}
            </div>
        )
    }
}