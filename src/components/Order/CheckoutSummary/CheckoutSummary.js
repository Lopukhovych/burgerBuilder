import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1 className={classes.titleMargin}>We hope it tastes well!</h1>
            <div style={{width: '100%', margin: "auto"}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <div>
                <p>Total price: <span>{props.totalPrice.toFixed(2)}</span></p>
            </div>
            {/*clicked={props.clicked('Danger')}*/}
            <Button btnType={'Danger'} clicked={props.checkoutCancelled}>Cancel</Button>
            <Button btnType={'Success'} clicked={props.checkoutContinued}>Continue</Button>
        </div>
    );
};

export default checkoutSummary;
