import React from 'react';
import {withRouter} from 'react-router-dom';

import classes from './Purchase.css';
import Modal from '../../../components/UI/Modal/Modal';
import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";
import Spinner from "../../UI/Spinner/Spinner";


class Purchase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            purchaseStatus: false,
        };
        this.checkOutHandler = this.checkOutHandler.bind(this);
        this.cancelCheckOutHandler = this.cancelCheckOutHandler.bind(this);
    }

    checkOutHandler = () => {
        this.setState({
            purchaseStatus: true
        });
    };
    submitCheckOutHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push({
            pathname: '/checkout',
        });

    };
    onSignInHandler = () => {
        this.props.onSetAuthRedirectPath('/checkout');
        this.props.history.push({
            pathname: '/auth',
        });
    };
    cancelCheckOutHandler = () => {
        this.setState({
            purchaseStatus: false
        });
    };

    render() {
        let ingredientsList = Object.keys(this.props.ingredients).map(item => {
            return (
                <div key={item} className='d-flex justify-content-around'>
                    <p>{item}</p>
                    <p>{this.props.ingredients[item]}</p>
                </div>
            );
        });
        let orderSummary = <Aux>
            <h3>Submit order:</h3>
            <p>The Burger ingredients: </p>
            {ingredientsList}
            <div
                className={[classes.SubmitPurchase, 'd-flex justify-content-end align-items-center mr-3'].join(' ')}
            >Submit purchase: {this.props.totalPrice}</div>
            <div className='d-flex justify-content-end mt-1'>
                <Button btnType={'Success'} clicked={this.submitCheckOutHandler}>Sumbit order</Button>
                <Button btnType={'Danger'} clicked={this.cancelCheckOutHandler}>Cancel</Button>
            </div>
        </Aux>;

        if (this.props.loading) {
            orderSummary = <Spinner/>
        }
        let sumbitButton;

        if (this.props.userEmail) {
            sumbitButton = (<button onClick={this.checkOutHandler} disabled={!this.props.purchasable}
                                    className="btn btn-primary">Check
                out
            </button>);
        } else {
            sumbitButton = (<button onClick={this.onSignInHandler}
                                    className="btn btn-primary">Sign In</button>);
        }
        return (
            <Aux>
                <Modal loading={this.props.loading} visible={this.state.purchaseStatus}
                       hideModal={this.cancelCheckOutHandler}>
                    {orderSummary}
                </Modal>
                <div className={classes.Purchase}>
                    <div className='d-flex justify-content-end align-items-center'>
                        <p>Total: </p>
                        <p>{this.props.totalPrice}</p>
                        {sumbitButton}
                    </div>
                </div>
            </Aux>

        );
    }
}

export default withRouter(Purchase);
