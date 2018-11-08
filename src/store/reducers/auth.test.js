import reducer, {initialState} from './auth';
import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

describe('auth reducer', () => {
    it('should return initialState', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should show loading when passing authentication', () => {
        const state = updateObject(initialState, {error: 'not null', loading: false});
        expect(reducer(state, {type: actionTypes.AUTH_START})['error']).toEqual(null);
        expect(reducer(state, {type: actionTypes.AUTH_START})['loading']).toEqual(true);
    });
    it('should store token upon login', () => {
        const state = updateObject(initialState, {
            error: 'not null',
            loading: true,
            token: null,
            userId: null,
            email: null,
        });
        const authData= {
          token: 'some-toke',
          id: 'some-id',
          email: 'email@email.com'
        };
        const expectedResult = {
            error: null,
            loading: false,
            token: 'some-toke',
            userId: 'some-id',
            email: 'email@email.com',
            authRedirectPath: '/',
        };
        expect(reducer(state, {type: actionTypes.AUTH_SUCCESS, authData: authData})).toEqual(expectedResult);
    });
});
