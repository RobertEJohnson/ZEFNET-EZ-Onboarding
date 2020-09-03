import {combineReducers} from 'redux';

const selectedBreakerReducer = (state = [], action) => {
    switch(action.type){
        case 'SET_BREAKER':
            return action.payload;
        case 'CLEAR_BREAKER':
            return [];
        default:
            return state;
    }
}

const siteBreakerReducer = (state=[], action) => {
    switch(action.type){
        case 'SET_SITE_BREAKERS':
            return action.payload;
        case 'CLEAR_SITE_BREAKERS':
            return [];
        default:
            return state;
    }
}


// breaker will be on the redux state at:
// state.breaker
export default combineReducers({
    selectedBreakerReducer,
    siteBreakerReducer
})