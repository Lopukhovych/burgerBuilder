import React, {Component, Fragment} from 'react';
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
const asyncOrderItem = asyncComponent(() => {
    return import ('./containers/Orders/OrderItem/OrderItem');
});
const asyncHelp = asyncComponent(() => {
    return import ('./containers/Help/Help');
});

const AuthedRoutes = () => {
    return (
        <Fragment>
            <Route path='/orders' exact component={asyncOrders}/>
            <Route path='/orders/:order' component={asyncOrderItem}/>
            <Route path='/logout' exact component={Logout}/>
            <Route path='/checkout' component={asyncCheckout}/>
            <Route path='/profile' exact component={asyncProfile}/>
        </Fragment>)
};
    /*
          Отделить эти роуты в отдельную папку Routes в отдельный файл в ней
     */


class App extends Component {
                /*
                    ^Лучше Юзать PureComponent вместо Component, чтобы не перерендеривался лишний раз
                    UPD: тут можно не юзать, в принципе :)
                */
    componentDidMount() {
        this.props.onCheckAuth();
    }

    render() {
        let router = (
            <Switch>
                <Route path='/' exact component={BurgerBuilder}/>
                <Route path='/auth' exact component={asyncAuth}/>
                <Route path='/help' exact component={asyncHelp}/>
                {this.props.isAuthenticated ? <AuthedRoutes/> : null}
                <Route path="*" component={NotFound}/>
            </Switch>
        );

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
/*
    ^Тут можно ебошить так, будет красивее
    const mapDispatchToProps = {
        onCheckAuth: actions.authCheckState
    };
*/

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
