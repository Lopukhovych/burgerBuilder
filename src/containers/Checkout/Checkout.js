import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import CheckoutSummary from './CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import classes from "./Checkout.css";


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
            <div className={classes.Checkout}>
                <h1 className={classes.titleMargin}>We hope it tastes well!</h1>
                <CheckoutSummary
                    ingredients={this.props.orderIngredients}
                    totalPrice={this.props.totalPrice}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                />
                <Route path={this.props.match.url + '/contact-data'}
                       render={routeProps =>
                           <ContactData {...routeProps}
                                        ingredients={this.props.orderIngredients}
                                        totalPrice={this.props.totalPrice}
                           />}
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
