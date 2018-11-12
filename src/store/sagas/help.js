import axios from '../../axios-orders';
import {createNotification} from '../../shared/notification';
import history from '../../history';
import {takeEvery} from "redux-saga/effects";
import * as actionTypes from "../actions/actionTypes";

export function* helpMessageInitSaga(action) {
    let messageData = JSON.stringify({email: action.email, message: action.message});
    try {
        yield axios.post('/helpMessages.json', messageData);
        yield createNotification('success', 'Message was successfully sent!');
        yield history.push('/');
    } catch (error) {
        yield createNotification('error', 'Error', 'Error with sending message!');
    }
}


export function* watchHelp() {
    yield takeEvery(actionTypes.HELP_MESSAGE_INIT, helpMessageInitSaga);
}
