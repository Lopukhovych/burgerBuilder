import React, {Component} from 'react';
import {connect} from 'react-redux';
import Input from "../../components/UI/Input/Input";
import {updateObject, checkValidity} from '../../shared/utility';
import Button from "../../components/UI/Button/Button";
import * as actions from '../../store/actions/index';

import styles from './Help.css';

class Help extends Component {
    constructor(props) {
        super(props);
        this.state = {
            helpForm: {
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Enter your email'
                    },
                    value: this.props.email ? this.props.email : '',
                    validation: {
                        required: true,
                        isEmail: true
                    },
                    valid: !!this.props.email,
                    touched: false,
                },
                question: {
                    elementType: 'textarea',
                    elementConfig: {
                        placeholder: 'Enter your question or request.'
                    },
                    value: '',
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false,
                },
            },
            formIsValid: false,
        }
    }

    helpSubmitHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.helpForm) {
            formData[formElementIdentifier] = this.state.helpForm[formElementIdentifier].value;
        }
        this.props.onSendHelp(formData.email, formData.question);
    };

    inputChangedHandler = (event, inputIdentifier) => {
        let validity = checkValidity(event.target.value, this.state.helpForm[inputIdentifier].validation);
        const updatedFormElement = updateObject(this.state.helpForm[inputIdentifier], {
            value: event.target.value,
            valid: validity,
            touched: true
        });
        const updatedHelpForm = updateObject(this.state.helpForm, {
            [inputIdentifier]: updatedFormElement
        });

        let formIsValid = true;
        for (let inputIdentifier in updatedHelpForm) {
            formIsValid = updatedHelpForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({helpForm: updatedHelpForm, formIsValid: formIsValid});
    };

    render() {
        const formElementsArray = [];
        for (let key in this.state.helpForm) {
            formElementsArray.push({
                id: key,
                config: this.state.helpForm[key]
            });
        }
        let form = (
            <form onSubmit={this.helpSubmitHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        label={formElement.config.elementConfig.placeholder}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
                ))}
                <Button btnType={'Success'} type={'submit'} disabled={!this.state.formIsValid}>Send</Button>
            </form>
        );
        return (
            <div className={styles.HelpForm}>
                <h3>Have question? Contact us!</h3>
                <h5>Just write a question and your email to get response</h5>
                {form}
                <p className={styles.WarningSubmit}>If you can't submit, please check all required fields and fix
                    errors.</p>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        email: state.auth.email
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSendHelp: (email, message) => dispatch(actions.helpMessageInit(email, message))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Help);
