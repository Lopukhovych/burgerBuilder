import React from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Purchase from '../../components/Burger/Purchase/Purchase';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner.js';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';


export class BurgerBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            loading: false,
            error: null
        }
    }

    componentDidMount() {
        this.props.onLoadIngredients();
    }


    updatePurchaseStatus(updatedIngredients) {
        const ingredientsAmount = Object.keys({...updatedIngredients}).reduce((acc, item) => {
            return acc + updatedIngredients[item];
        }, 0);
        return ingredientsAmount > 0;
    }

    render() {
        const disabledInfo = {
            ...this.props.ing
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] < 1
        }
        // if (this.props.)

        let burger = <Spinner/>;
        if (this.props.ing) {
            burger = (<Aux>
                <Burger ingredients={this.props.ing}/>
                <BuildControls
                    removeIngredient={this.props.onIngredientRemove}
                    addIngredient={this.props.onIngredientAdd}
                    ingredients={this.props.ing}
                    disabled={disabledInfo}
                />
                <Purchase
                    onInitPurchase={this.props.onInitPurchase}
                    loading={this.state.loading}
                    ingredients={this.props.ing}
                    purchasable={this.updatePurchaseStatus(this.props.ing)}
                    totalPrice={this.props.totalPrice.toFixed(2)}
                    userEmail={this.props.userEmail}
                    onSetAuthRedirectPath={this.props.onSetAuthRedirectPath}
                />
            </Aux>);
        } else if (this.props.error) {
            burger = (<div className='d-flex flex-column align-items-center mt-3'>
                <p className='mt-3' style={{fontSize: '20px', textAlign: 'center'}}>
                    Error with loading page
                    <br/>
                    Try to reload or load page later
                </p>
                <a href='/' className="ml-0 btn btn-large btn-warning">Reload page</a>
            </div>)
        }

        return (
            <Aux>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ing: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        userEmail: state.auth.email
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onLoadIngredients: () => dispatch(actions.loadIngredients()),
        onIngredientAdd: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemove: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
