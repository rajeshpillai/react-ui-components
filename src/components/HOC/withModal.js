import React from 'react';
import Modal from '../Modal';

const withModal = (WrappedComponent) => {
    class _WithModal extends React.Component {
        state = {
            isOpen: false
        }
        toggleModal = () => { 
            this.setState({
                isOpen: !this.state.isOpen,
            });
        }
        onClick = (e) => {
            this.toggleModal();  
        }
        render () {
            return (
                <div onClick={(e)=> { this.onClick(e) }}>
                     <WrappedComponent {...this.props} />
                     <Modal show={this.state.isOpen}>
                            <WrappedComponent {...this.props} />
                    </Modal>
                </div>
            );
        }
    }
    _WithModal.displayName = "WithBorder";
    return _WithModal
}

export default withModal;