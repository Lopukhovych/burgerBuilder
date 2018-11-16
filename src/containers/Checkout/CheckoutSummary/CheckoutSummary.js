import React from 'react';
import Burger from '../../../components/Burger/Burger';
import Button from '../../../components/UI/Button/Button'
import classes from './CheckoutSummary.css';

class checkoutSummary extends React.PureComponent {
    render() {
        return (
            <div className={classes.CheckoutSummary}>
                <div style={{width: '100%', margin: "auto"}}>
                    <Burger ingredients={this.props.ingredients}/>
                </div>
                <div>
                    <p>Total price: <span>{this.props.totalPrice.toFixed(2)}</span></p>
                </div>
                {/*clicked={props.clicked('Danger')}*/}
                <Button btnType={'Danger'} clicked={this.props.checkoutCancelled}>Cancel</Button>
                <Button btnType={'Success'} clicked={this.props.checkoutContinued}>Continue</Button>
            </div>
        );
    }
};

export default checkoutSummary;
