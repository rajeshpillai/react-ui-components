import React from 'react';

import withModal from '../HOC/withModal';

const style = {
    position: "relative",
    float: "left",
    margin: "5px",
    padding: "10px",
    border: "1px solid gainsboro",
    width: "400px",
    height: "400px",
    overflow: "hidden"
  };

export default class LazyComponent extends React.Component {
    state = {
        isLoaded: false
    }
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        console.log("REF: ", this.img);
        var image = this.img;
        //var image = new Image();
        var self = this;
        image.src = this.props.data.url;
        image.onload = function () {
            self.onImageLoaded();
        }

        image.onerror = function() {
            self.onImageLoadError(self.props.data.url);
        };
    }

    onImageLoadError = () => {
        this.setState({
            isError: true
        });
    }

    onImageLoaded = () => {
        this.setState({
            isLoaded: true
        });
    }
    render() {
        var compo = this.state.isLoaded ?
                    <img ref={(img) => this.img = img} src={this.props.data.url} /> 
                : this.state.isError ?
                    <h2>Error loading {this.props.data.url}</h2>
                    :
                    <h2>loading {this.props.data.url}...</h2>
        return (
            <div style={style}>
                {this.state.isLoaded || <h3>Loading...</h3>}
                {this.state.isError || <h3>Error loading...</h3>}
                
                <img ref={(img) => this.img = img} /> 
                 {compo}
            </div>
        )
    }
}