import React from 'react';

import Aux from '../../hoc/Aux/Aux';
import classes from './Layout.css';
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SiteDrawer from '../../components/Navigation/SiteDrawer/SiteDrawer';
import {connect} from 'react-redux';

class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideDrawer: false
        };
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    };

    render() {
        return (
            <Aux>
                <Toolbar
                    authEmail={this.props.authEmail}
                    showSideDrawer={this.sideDrawerToggleHandler}/>
                <SiteDrawer authEmail={this.props.authEmail}
                            sideDrawerStatus={this.state.showSideDrawer}
                            hideSideDrawer={this.sideDrawerToggleHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>

        );
    }
}

const mapStateToProps = state => {
    return {
        authEmail: state.auth.email
    }
};

export default connect(mapStateToProps)(Layout);
