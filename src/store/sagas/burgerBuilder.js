import {put} from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from '../../axios-orders';


export function* loadIngredientsSaga(action) {
    try {
        console.log(911);
        const response = yield axios.get('/ingredients.json');
        yield put(actions.setIngredients(response.data));
    } catch (error) {
        yield put(actions.loadIngredietsFailed(error));
    }
}
