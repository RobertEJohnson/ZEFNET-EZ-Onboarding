const organizationReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ORGANIZATION':
      return action.payload;
    case 'UNSET_ORGANIZATION':
      return {};
    default:
      return state;
  }
};

// organization will be on the redux state at:
// state.organization
export default organizationReducer;