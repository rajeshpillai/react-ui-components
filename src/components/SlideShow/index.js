import React from 'react';
import Slide from './Slide'
import './slideshow.css';

export default class SlideShow extends React.Component {
    render () {
        let slides = this.props.slides.map((slide) => {
            return <Slide  key = {slide.id} data = {slide} />
        })
        
        return (
            <div className="slide-container">
                {slides}
            </div>
        )
    }
}