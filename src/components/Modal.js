
import React from 'react';

export default class Modal extends React.Component {
    componentWillReceiveProps(nextProps) {
      console.log("Modal: cwRP:", nextProps);
      this.setState({
        show: nextProps.show
      })
    }

    shouldComponentUpdate(nextProps, nextState) {
      console.log("Modal: scu:", nextProps, nextState);
      return true;
  }
    
    render() {
      console.log("Modal:render()");
      // Render nothing if the "show" prop is false
      if(!this.props.show) {
        return null;
      }
  
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
      
     
      return (
        <div className="backdrop" style={backdropStyle}>
          <div className="modal" style={modalStyle}>
            {this.props.children}
  
            <div style={footerStyle}>
              <button data-action="modal-close" onClick={(e)=>{this.props.onClose(e)}}>
                Close
              </button>
            </div>
          </div>
        </div>
      );
    }
  }