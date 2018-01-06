import React from 'react';

const style = {
    border: "2px dashed red"
}
const withDashedBorder = (WrappedComponent) => {
    return class extends React.Component {
        render () {
            return (
                <div style={style}>
                     <WrappedComponent  />
                </div>
            );
        }
    }
}

export default withDashedBorder;