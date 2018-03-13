import React from 'react';
import ReactDOM from 'react-dom';
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

const modalRoot = document.getElementById("modal-root");

export default class Modal extends React.Component {
    constructor(props) {
      super(props);
      this.el = document.createElement("div");
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
      // The portal element is inserted in the DOM tree after
      // the Modal's children are mounted, meaning that children
      // will be mounted on a detached DOM node. If a child
      // component requires to be attached to the DOM tree
      // immediately when mounted, for example to measure a
      // DOM node, or uses 'autoFocus' in a descendant, add
      // state to Modal and only render the children when Modal
      // is inserted in the DOM tree.
      document.addEventListener("keyup", this.onKeyUp);
      modalRoot.appendChild(this.el);
    }

    componentWillUnmount() {
      document.removeEventListener("keyup", this.onKeyUp);
      modalRoot.removeChild(this.el);
    }

    componentWillReceiveProps(nextProps) {
      this.setState({
        show: nextProps.show
      })
    }

    render() {
      var modalUI = (
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
      console.log("Modal:render()");
      // Render nothing if the "show" prop is false
      if(!this.props.show) {
        return null;
      }
      return ReactDOM.createPortal (
         modalUI,
         this.el,
      );
    }
  }

  Modal.propTypes ={
    onClose:  PropTypes.func.isRequired
  }
