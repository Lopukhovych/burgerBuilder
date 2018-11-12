import React, {Component} from 'react';
import {connect} from 'react-redux';
import Section from '../../hoc/Section/Section';
import classes from './Profile.css';
import Input from '../../components/UI/Input/Input';
import {checkValidity, updateObject} from "../../shared/utility";
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';


import UserLogo from '../../assets/images/user_logo.svg';


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changeEmailStatus: false,
            changePasswordStatus: false,
            passwordEqualStatus: false,
            passwordsErrorMessage: '',
            editForm: {
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Enter your email'
                    },
                    value: this.props.email,
                    validation: {
                        required: true,
                        isEmail: true
                    },
                    valid: !!this.props.userEmail,
                    errorMessage: 'Email should contain only a-z, A-Z, 0-9, ._, and one "@"',
                    touched: !!this.props.userEmail,
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
                    valid: false,
                    errorMessage: 'Password is required and should contain 6 or more symbols!',
                    touched: false
                },
                confirmPassword: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'password',
                        placeholder: 'Confirm password'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 6,
                    },
                    valid: false,
                    errorMessage: 'Confirm password field should be equal with password!',
                    touched: false
                },

            }
        };
        this.baseState = this.state;
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.token !== this.props.token) {
            this.resetForm();
        }
        return true;
    }

    inputChangedHandler = (event, controlName) => {

        const updatedFormElement = updateObject(this.state.editForm[controlName], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.editForm[controlName].validation),
            touched: true
        });
        const updatedEditForm = updateObject(this.state.editForm, {
            [controlName]: updatedFormElement
        });
        if (['password', 'confirmPassword'].includes(controlName)) {
            this.checkPasswordsEqual(updatedEditForm);
        }
        this.setState({editForm: updatedEditForm});
    };

    onChangeStatus = (itemName) => {
        this.setState({
            [itemName]: !this.state[itemName],
        });
    };
    resetForm = () => {
        this.setState({
            ...this.baseState
        });
    };
    onEditEmail = () => {
        this.props.onChangeEmail(this.state.editForm.email.value);
    };

    onEditPassword = () => {
        // console.log(this.state.editForm.password.value);
        this.props.onChangePassword(this.state.editForm.password.value);
    };

    checkPasswordsEqual = (updatedForm) => {
        let passwordEqual = updatedForm['password'].value.toString() === updatedForm['confirmPassword'].value.toString();
        let passwordsErrorMessage = '';
        passwordEqual = updatedForm['password'].valid
            && updatedForm['confirmPassword'].valid
            && passwordEqual;
        if (!passwordEqual) passwordsErrorMessage = 'Passwords are not equal!';


        this.setState({passwordEqualStatus: passwordEqual, passwordsErrorMessage: passwordsErrorMessage});
    };

    render() {
        let emailField = <span onClick={() => this.onChangeStatus('changeEmailStatus')}
                               className={classes.Item}>{this.props.email}</span>;
        let passwordField = <span onClick={() => this.onChangeStatus('changePasswordStatus')}
                                  className={classes.ChangePasswordArticle}>Change Password</span>;
        if (this.state.changeEmailStatus) {
            emailField = (
                <div>
                    <Input
                        key={'email'}
                        elementType={this.state.editForm.email.elementType}
                        elementConfig={this.state.editForm.email.elementConfig}
                        value={this.state.editForm.email.value}
                        invalid={!this.state.editForm.email.valid}
                        label={this.state.editForm.email.label}
                        errorMessage={this.state.editForm.email.errorMessage}
                        shouldValidate={this.state.editForm.email.validation}
                        touched={this.state.editForm.email.touched}
                        changed={(event) => this.inputChangedHandler(event, 'email')}/>
                    <Button disabled={!this.state.editForm.email.valid} btnType={'Success'}
                            clicked={this.onEditEmail}>Submit</Button>
                    <Button btnType={'Warning'} clicked={() => this.resetForm()}>Cancel</Button>
                </div>
            );
        }
        if (this.state.changePasswordStatus) {
            passwordField = (<div> Password:
                <br/>
                <span className={classes.WarningMessage}>Fill in all form fields</span>
                <Input
                    key={'password'}
                    elementType={this.state.editForm.password.elementType}
                    elementConfig={this.state.editForm.password.elementConfig}
                    value={this.state.editForm.password.value}
                    invalid={!this.state.editForm.password.valid}
                    label={this.state.editForm.password.label}
                    errorMessage={this.state.editForm.password.errorMessage}
                    shouldValidate={this.state.editForm.password.validation}
                    touched={this.state.editForm.password.touched}
                    changed={(event) => this.inputChangedHandler(event, 'password')}/>
                <Input
                    key={'confirmPassword'}
                    elementType={this.state.editForm.confirmPassword.elementType}
                    elementConfig={this.state.editForm.confirmPassword.elementConfig}
                    value={this.state.editForm.confirmPassword.value}
                    invalid={!this.state.editForm.confirmPassword.valid}
                    label={this.state.editForm.confirmPassword.label}
                    errorMessage={this.state.editForm.confirmPassword.errorMessage}
                    shouldValidate={this.state.editForm.confirmPassword.validation}
                    touched={this.state.editForm.confirmPassword.touched}
                    changed={(event) => this.inputChangedHandler(event, 'confirmPassword')}/>

                {this.state.passwordsErrorMessage ?
                    <span className={classes.PasswordsErrorMessage}>{this.state.passwordsErrorMessage}</span> : ''}
                <Button disabled={!this.state.passwordEqualStatus} btnType={'Success'}
                        clicked={this.onEditPassword}>Submit</Button>
                <Button btnType={'Warning'}
                        clicked={() => this.resetForm()}>Cancel</Button>
            </div>)
        }
        return (
            <Section>
                <div className={classes.Profile}>
                    <h1>User Info</h1>
                    <img src={UserLogo} className={classes.UserLogo} alt="BUser Logo"/>
                    <div className={classes.Credentials}>
                        <div>Email: {emailField}</div>
                        <div>{passwordField}</div>
                        {this.props.error ? <p>{this.props.error}</p> : null}
                    </div>
                </div>
            </Section>
        );
    }
}

const mapStateToProps = state => {
    return {
        email: state.auth.email,
        token: state.auth.token,
        error: state.auth.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onChangeEmail: (newEmail) => dispatch(actions.authEditEmailInit(newEmail)),
        onChangePassword: (newPassword) => dispatch(actions.authEditPasswordInit(newPassword)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
