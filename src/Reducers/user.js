// Create user reducer
const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_USER':
      return {
        ...state,
        ...action.user,
      };
    case 'DELETE_USER':
      return {};
    default:
      return state;
  }
};

export default userReducer;
