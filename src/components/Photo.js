import React from 'react';

export default class Photo extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
       
        return (
            <div className="photo">
                <img src="./img/img1.jpg" />
            </div>
        );
    }
}