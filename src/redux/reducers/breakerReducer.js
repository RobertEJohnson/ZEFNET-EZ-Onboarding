const breakerReducer = (state = {}, action) => {
    switch(action.type){
        case 'SET_BREAKER':
            return action.payload;
        case 'CLEAR_BREAKER':
            return {};
        default:
            return state;
    }
}

// breaker will be on the redux state at:
// state.breaker
export default breakerReducer;