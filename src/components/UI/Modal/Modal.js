import React from 'react';
import classes from './Modal.css';
import Backdrop from "../Backdrop/Backdrop";
import Aux from "../../../hoc/Aux/Aux";

class Modal extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.visible !== this.props.visible || nextProps.loading !== this.props.loading;
    }

    render() {
        return (
            <Aux>
                <Backdrop show={this.props.visible} hideHandler={this.props.hideModal}/>
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.visible ? 'translateY(0)': 'translateY(-100vh)',
                        opacity: this.props.visible ? '1': '0',
                    }}
                >
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}

export default Modal;
