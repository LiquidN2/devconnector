import {
    USER_LOGOUT,
    SET_CURRENT_USER_REQUEST,
    SET_CURRENT_USER_SUCCESS,
    SET_CURRENT_USER_ERRORS
} from './../constants/authActionTypes';

const initialState = {
    isFetching: false,
    user: {}
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER_REQUEST:
            return {
                ...state,
                isFetching: true
            };

        case SET_CURRENT_USER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                user: {...action.user}
            };
        
        case USER_LOGOUT:
        case SET_CURRENT_USER_ERRORS:
            return {
                ...initialState
            };

        default:
            return state;
    }
};

export default userReducer;