import { combineReducers } from 'redux';
import * as actionTypes from '../actions/constants';

const initialUserState = {
    currentUser: null,

}

const user_Reducer = (state = initialUserState, action ) => {
    switch(action.type){
        case actionTypes.SET_USER:
            return {
                currentUser: action.payload.currentUser,
            }
        case actionTypes.CLEAR_USER:
            return{
                ...state,
            }
        default:
            return state;
    }

}

const rootReducer= combineReducers({
    user: user_Reducer
});

export default rootReducer;