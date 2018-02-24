import React from 'react';

export default class Slide extends React.Component {
    state = {
        isLoaded: false
    }
    constructor(props) {
        super(props);
    }
    componentDidMount () {
        //this.load(this.img);
        this.interval = setTimeout(()=>{this.load(this.img)}, this.props.data.timeout || 0);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    load(img) {
        var image = img;
        image.src = this.props.data.url;
        image.onload = () => {
            this.onImageLoaded();
        }
        image.onerror = () => {
            this.onImageLoadError(this.props.data.url);
        };
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
        let url = this.props.url;
        return (
            <div className="slide">
                {!this.state.isLoaded && <h3>Loading...</h3>}
                <img ref={(img) => this.img = img} />
            </div>
        );
    }
}