const newDeviceReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_DEVICE_SITE':
        return {site:action.payload};
       case 'SET_BREAKER':
        return {site:action.payload};
      default:
        return state;
    }
  };
  
  // newDevice will be on the redux state at:
  // state.device
  export default newDeviceReducer;