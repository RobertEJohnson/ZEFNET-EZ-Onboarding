const newDeviceReducer = (state = {
  site:{},
  breaker:{},
  serial: {},
  type: {},
  name: '',
  date: ''
}, action) => {
    switch (action.type) {
      case 'SET_DEVICE_SITE':
        return {site: action.payload};
      case 'SET_BREAKER':
        return {breaker: action.payload};
      case 'SET_SERIAL':
        return {serial: action.payload};
      case 'SET_TYPE':
        return {type: action.payload};
      case 'SET_NAME':
        return {name: action.payload};
      case 'SET_DATE':
        return {date: action.payload};
      case 'CLEAR_DEVICE':
          return {site:'', breaker:'', serial:'', type:'', name: '', date: ''};
      default:
        return state;
    }
  };
  
  // newDevice will be on the redux state at:
  // state.device
  export default newDeviceReducer;