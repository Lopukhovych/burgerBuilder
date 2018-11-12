import React from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import CheckoutSummary from "../../Checkout/CheckoutSummary/CheckoutSummary";
import classes from "./OrderItem.css";
import ContactData from "../../Checkout/ContactData/ContactData";
import {Redirect} from 'react-router-dom';


const OrderItem = (props) => {
    let order = props.ordersList[props.match.params.order];

    const checkoutCancelledHandler = () => {
        props.history.goBack();
    };

    const checkoutContinuedHandler = () => {
        props.history.replace(`${props.location.pathname}/contact-data`);
    };
    if (!order) {
        return <Redirect to="/not-found"/>
    }
    return (
        <div className={classes.OrderItem}>
            <h1 className={classes.titleMargin}>It is one of your orders!</h1>
            <CheckoutSummary
                ingredients={order.ingredients}
                totalPrice={order.price}
                checkoutCancelled={checkoutCancelledHandler}
                checkoutContinued={checkoutContinuedHandler}
            />
            <Route path={props.match.url + '/contact-data'}
                   render={routeProps =>
                       <ContactData {...routeProps}
                                    ingredients={order.ingredients}
                                    totalPrice={order.price}
                       />}
            />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        ordersList: state.order.orders
    }
};

export default withRouter(connect(mapStateToProps)(OrderItem));
