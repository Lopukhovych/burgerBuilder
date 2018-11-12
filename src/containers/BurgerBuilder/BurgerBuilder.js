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
        const ingredientsAmount = updatedIngredients.length;
        return ingredientsAmount > 0;
    }

    render() {

        let burger = <Spinner/>;
        if (this.props.orderIngredients) {
            burger = (<Aux>
                <Burger ingredients={this.props.orderIngredients}/>
                <BuildControls
                    removeIngredient={this.props.onIngredientRemove}
                    addIngredient={this.props.onIngredientAdd}
                    orderIngredients={this.props.orderIngredients}
                    ingredientsList={this.props.ingredientsList}
                />
                <Purchase
                    onInitPurchase={this.props.onInitPurchase}
                    loading={this.state.loading}
                    ingredients={this.props.orderIngredients}
                    purchasable={this.updatePurchaseStatus(this.props.orderIngredients)}
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
        orderIngredients: state.burgerBuilder.orderIngredientsList,
        ingredientsList: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice ? state.burgerBuilder.totalPrice : 4,
        error: state.burgerBuilder.error,
        userEmail: state.auth.email
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onLoadIngredients: () => dispatch(actions.burgerLoadIngredientsInit()),
        onIngredientAdd: (ingName) => dispatch(actions.burgerAddIngredientInit(ingName)),
        onIngredientRemove: (ingName) => dispatch(actions.burgerRemoveIngredientInit(ingName)),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
