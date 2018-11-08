import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';


import Layout from './containers/Layout/Layout';
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import NotFound from './components/UI/NotFound/NotFound';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import {NotificationContainer} from 'react-notifications';



const asyncCheckout = asyncComponent(() => {
    return import ('./containers/Checkout/Checkout');
});
const asyncOrders = asyncComponent(() => {
    return import ('./containers/Orders/Orders');
});
const asyncAuth = asyncComponent(() => {
    return import ('./containers/Auth/Auth');
});
const asyncProfile = asyncComponent(() => {
    return import ('./containers/Profile/Profile');
});

class App extends Component {
    componentDidMount() {
        // this.props.onCheckAuth();
    }

    render() {
        let router = (
            <Switch>
                <Route path='/auth' exact component={asyncAuth}/>
                <Route path='/' exact component={BurgerBuilder}/>
                <Route path="*" component={NotFound}/>
            </Switch>
        );
        if (this.props.isAuthenticated) {
            router = (
                <Switch>
                    <Route path='/' exact component={BurgerBuilder}/>
                    <Route path='/checkout' component={asyncCheckout}/>
                    <Route path='/orders' exact component={asyncOrders}/>
                    <Route path='/profile' exact component={asyncProfile}/>
                    <Route path='/logout' exact component={Logout}/>
                    <Route path='/auth' exact component={asyncAuth}/>
                    <Route path="*" component={NotFound}/>
                </Switch>
            );
        }
        return (
            <div>
                <Layout>
                    {router}
                </Layout>
                <NotificationContainer/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onCheckAuth: () => dispatch(actions.authCheckState())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
