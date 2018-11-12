import React, {Component} from 'react';
import {connect} from 'react-redux';


import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import classes from "./Orders.css";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Aux from '../../hoc/Aux/Aux';

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders(this.props.userId);
    }

    render() {
        let orders = <Spinner/>;

        if (!this.props.loading && this.props.orders && this.props.orders.length === 0) {
            orders = <div className={classes.Empty}>
                <h3>Orders is empty</h3>
            </div>;
        }
        if (!this.props.loading) {
            orders = (
                <Aux>
                    <h3>My orders: </h3>
                    {this.props.orders.map((order, index) => (
                        <Order
                            key={order.id}
                            index={index}
                            ingredients={order.ingredients}
                            price={+order.price}
                        />

                    ))}
                </Aux>
            );
            if (this.props.orders.length === 0) {
                orders = <div className={classes.Empty}>
                    <h3>Orders is empty </h3>
                </div>;
            }
        }

        return (
            <div className={['container', 'pt-2', classes.Orders].join(' ')}>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        error: state.order.error,
        loading: state.order.loading,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: (userId) => dispatch(actions.fetchOrders(userId)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
