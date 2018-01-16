import React from 'react';
import withModal from '../HOC/withModal';
import LazyComponent from './LazyComponent';

export default class LazyLoad extends React.Component {
    render() {
        var LazyLoadWithModal = withModal(LazyComponent);
        var data = this.props.data.map((d,i) => {
            return <LazyLoadWithModal key={i} data={d} />;
        });
        return (
            <div>
                 {data}
            </div>
        )
    }
}