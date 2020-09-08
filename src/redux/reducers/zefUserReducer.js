const zefUserReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_ZEFUSER':
        return action.payload;
      case 'UNSET_ZEFUSER':
        return {};
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default zefUserReducer;