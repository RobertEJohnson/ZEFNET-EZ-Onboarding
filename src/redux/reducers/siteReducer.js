const siteReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_SITE':
        return action.payload;
      case 'UNSET_SITE':
        return {};
      default:
        return state;
    }
  };
  
  // site will be on the redux state at:
  // state.site
  export default siteReducer;