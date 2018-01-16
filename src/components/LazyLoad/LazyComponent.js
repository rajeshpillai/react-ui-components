import React from 'react';

import withModal from '../HOC/withModal';

export default class LazyComponent extends React.Component {
    state = {
        isLoaded: false
    }
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        var image = new Image();
        var self = this;
        image.src = this.props.data.url;
        image.onload = function () {
            self.onImageLoaded();
        }
    }

    onImageLoaded = () => {
        this.setState({
            isLoaded: true
        });
    }
    render() {
        var compo = this.state.isLoaded ?
                    <img src={this.props.data.url} /> :
                    <h2>loading {this.props.data.url}...</h2>
        return (
            <div className="box">
                 {compo}
            </div>
        )
    }
}