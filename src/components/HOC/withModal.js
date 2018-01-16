import React from 'react';
import Modal from '../Modal';

const withModal = (WrappedComponent) => {
    class _WithModal extends React.Component {
        state = {
            isOpen: false
        }

        onShow = (e) => { 
            console.log("withModal: onShow clicked : ",e.target.dataset.action);
            
            // Since "onClick" is assigned to parent div, we have to check
            // if the target is modal-close, then do not setstate.
            if (e.target.dataset.action === "modal-close") return;
            this.setState({
                isOpen: true,
            });
        }

        onToggle = () => { 
            console.log("withModal: onToggle() clicked..");
            this.setState({
                isOpen: !this.state.isOpen
            });
        }

        onClose = (e) => {
            console.log("withModal: onClose clicked : ", e, e.target);
            this.setState((prevState) => {
                console.log("prevState: ", prevState);
                return {isOpen: false};
            }, () => {console.log("After Modal update: ", this.state)});
        }

        shouldComponentUpdate(nextProps, nextState) {
            console.log("withModal: scu:", nextProps, nextState);
            return true;
        }
        render () {
            console.log("withMdal:render");
            return (
                <div  onClick={(e)=> { this.onShow(e) }}>
                     <WrappedComponent {...this.props} />
                     <Modal show={this.state.isOpen} onClose={this.onClose}>
                            <WrappedComponent {...this.props} />
                    </Modal>
                </div>
            );
        }
    }
    _WithModal.displayName = "WithModal";
    return _WithModal
}

export default withModal;