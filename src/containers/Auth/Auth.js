import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import Spinner from "../../components/UI/Spinner/Spinner";
import {updateObject, checkValidity} from '../../shared/utility';

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            controls: {
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your email'
                    },
                    value: '',
                    validation: {
                        required: true,
                        isEmail: true
                    },
                    valid: false,
                    errorMessage: 'Email should contain only a-z, A-Z, 0-9, ._, and one "@"',
                    touched: false
                },
                password: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'password',
                        placeholder: 'Your password'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 6,
                    },
                    errorMessage: 'Password is required and should contain 6 or more symbols',
                    valid: false,
                    touched: false
                },
            },
            formIsValid: false
        };
        /*
                Лучше логику с валидацией, єррор меседжем и прочей фигней засунуть в отдельный конфиг файл
         */
    }

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/profile') {
            this.props.onSetAuthRedirectPath();
        }
    }

    inputCheckValidity = (event, controlName) => {
        const updatedControlName = updateObject(this.state.controls[controlName], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
            touched: true

        });
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updatedControlName
        });
        let formIsValid = true;
        for (let inputIdentifier in updatedControls) {
            formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
        }
        this.setState({controls: updatedControls, formIsValid: formIsValid});
    };

    onSignUp = () => {
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, 'signup');
    };
    onSingIn = () => {
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, 'signin');
    };

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        let form = formElementsArray.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    label={formElement.config.elementConfig.placeholder}
                    shouldValidate={formElement.config.validation}
                    errorMessage = {formElement.errorMessage}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputCheckValidity(event, formElement.id)}/>
            )
        );

        let authStatus;

        if (this.props.error) {
            authStatus = (
                <div className={classes.SignedError}>
                    <p>
                        Error: {this.props.error.message}
                    </p>
                </div>
            );
        }
        if (this.props.email) {
            authStatus = (
                <Redirect to={this.props.authRedirectPath}/>
            );
        }
        return (
            <div className={classes.AuthBlock}>
                {this.props.loading ? <Spinner/> :
                    <div>
                        <form>
                            {form}
                            <div className={classes.SignButtons}>
                                <Button type='button' btnType="Warning" clicked={this.onSignUp}
                                        disabled={!this.state.formIsValid}>Sign up</Button>
                                <Button type='button' btnType="Success" clicked={this.onSingIn}
                                        disabled={!this.state.formIsValid}>Sign in</Button>
                            </div>
                        </form>
                        {authStatus}
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        email: state.auth.email,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: actions.onAuthUser,
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/profile'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
