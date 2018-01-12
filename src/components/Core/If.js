import React from 'react';

const If = (props) => {
    console.log(props.children);
    if (props.condition) {
        return props.children;
    }
    return null;
}

export default If;