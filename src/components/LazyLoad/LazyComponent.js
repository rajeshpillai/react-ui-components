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

    
    load(img) {
        console.log("End: ", new Date());
        var image = img;
        image.src = this.props.data.url;
        image.onload = () => {
            this.onImageLoaded();
        }

        image.onerror = () => {
            this.onImageLoadError(this.props.data.url);
        };
    }

    componentDidMount() {
        console.log("REF: ", this.img);
        //var image = new Image();
        console.log(`Loading image after ${this.props.data.timeout} ms...`)
        console.log("Start: ", new Date());
        this.interval = setTimeout(()=>{this.load(this.img)}, this.props.data.timeout);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    onImageLoadError = () => {
        this.setState({
            isError: true
        });
    }

    onImageLoaded = () => {
        console.log("Setting loaded to true...");
        this.setState({
            isLoaded: true
        });
    }
    render() {
        return (
            <div style={style}>
                {this.state.isLoaded ? <h3>Loaded</h3> : <h3>Loading...</h3>}
                {this.state.isError && <h3>Error loading...</h3>}
                <img ref={(img) => this.img = img} /> 
            </div>
        )
    }
}