const allDeviceReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_ALL_DEVICE':
        return action.payload;
      case 'UNSET_ALL_DEVICE':
        return [];
      default:
        return state;
    }
  };
  
  // all devices associated with an org will be on the redux state at:
  // state.allDevice
  export default allDeviceReducer;