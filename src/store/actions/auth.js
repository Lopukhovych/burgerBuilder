import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    }
};
export const authSuccess = (userData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: userData
    }
};
export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error.response.data.error
    }
};

export const authLogout = () => {
    return {type: actionTypes.AUTH_INITIATE_LOGOUT}
};

export const authLogoutSucceed = () => {
    return {type: actionTypes.AUTH_LOGOUT}
};

export const checkAuthTimeout = (expireTime) => {
    return {type: actionTypes.AUTH_CHECK_TIMEOUT, expireTime: expireTime}
};

export const onAuthUser = (email, password, authType) => {
    return {
        type: actionTypes.AUTH_USER,
        email: email,
        password: password,
        authType: authType
    }
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};


export const authCheckState = () => {
    return {
        type: actionTypes.AUTH_CHECK_INITIAL_STATE
    }
};

export const authEditEmailInit = (email) => {
    return {
        type: actionTypes.AUTH_EDIT_EMAIL_INIT,
        email: email
    }
};
export const authEditEmail = (userData) => {
    return {
        type: actionTypes.AUTH_EDIT_EMAIL,
        authData: userData
    }
};

export const authEditEmailFail = (error) => {
    console.log("authEditEmailFail actions error: ", error);
    return {
        type: actionTypes.AUTH_EDIT_EMAIL_FAIL,
        error: error
    }
};

export const authEditPasswordInit = (password) => {
    return {
        type: actionTypes.AUTH_EDIT_PASSWORD_INIT,
        password: password
    }
};
export const authEditPassword = (userData) => {
    return {
        type: actionTypes.AUTH_EDIT_PASSWORD,
        authData: userData
    }
};

export const authEditPasswordFail = (error) => {
    return {
        type: actionTypes.AUTH_EDIT_PASSWORD_FAIL,
        error: error
    }
};








