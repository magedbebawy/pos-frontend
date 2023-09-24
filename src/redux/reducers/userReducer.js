import {
    ADMIN_SIGNIN,
    ADMIN_SIGNOUT
} from '../actions/userActions';

const initialState = {
    signedIn: false
};

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADMIN_SIGNIN:
            return {
                ...state,
                signedIn: true
            }
        case ADMIN_SIGNOUT:
            return {
                ...state,
                signedIn: false
            }
        default:
            return state
    }
};


export default userReducer;
