import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';


class Checkout extends React.Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };



    render() {
        if (!this.props.orderIngredients || this.props.purchased) {
            return <Redirect to='/'/>
        }
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.props.orderIngredients}
                    totalPrice={this.props.totalPrice}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                />
                <Route path={this.props.match.url + '/contact-data'}
                       component={ContactData}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orderIngredients: state.burgerBuilder.orderIngredientsList,
        totalPrice: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
};


export default connect(mapStateToProps) (Checkout);
