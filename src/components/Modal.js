import React from 'react';
import PropTypes from 'prop-types';

 // The gray background
const backdropStyle = {
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: 'rgba(0,0,0,0.3)',
  padding: 50
};

// The modal "window"
const modalStyle = {
  backgroundColor: '#fff',
  borderRadius: 5,
  maxWidth: 500,
  minHeight: 300,
  margin: '0 auto',
  padding: 30,
  position: "relative"
};

const footerStyle ={
  position: "absolute",
  bottom:20
};

export default class Modal extends React.Component {
    componentWillReceiveProps(nextProps) {
      this.setState({
        show: nextProps.show
      })
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //   return true;
    // }

    onClose = (e) => {
      this.props.onClose && this.props.onClose(e);
    }

    onKeyUp = (e) => {
      if (e.which === 27 && this.props.show) {
        this.onClose(e);
      }
    }

    componentDidMount() {
      document.addEventListener("keyup", this.onKeyUp);
    }

    componentWillUnmount() {
      document.removeEventListener("keyup", this.onKeyUp);
    }

    render() {
      console.log("Modal:render()");
      // Render nothing if the "show" prop is false
      if(!this.props.show) {
        return null;
      }
      return (
        <div className="backdrop" style={backdropStyle} >
          <div className="modal" style={modalStyle}>
            {this.props.children}

            <div style={footerStyle}>
              <button data-action="modal-close" onClick={(e)=>{this.onClose(e)}}>
                Close
              </button>
            </div>
          </div>
        </div>
      );
    }
  }

  Modal.propTypes ={
    onClose:  PropTypes.func.isRequired
  }
