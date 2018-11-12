import {HELP_MESSAGE_INIT} from "./actionTypes";

export const helpMessageInit = (email, message) => {
    return {
        type: HELP_MESSAGE_INIT,
        email: email,
        message: message
    }
};
